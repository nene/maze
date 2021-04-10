import { assoc, identity, range, update } from "ramda";
import { Coord, Dir, Marker, Maze, MazeCell } from "./Maze";

export const coordPlusDir = ({x, y}: Coord, size: Coord, dir: Dir): Coord | undefined => {
  switch (dir) {
    case 'left': return x > 0 ? { x: x - 1, y } : undefined;
    case 'right': return x < size.x - 1 ? { x: x + 1, y } : undefined;
    case 'top': return y > 0 ? { x, y: y - 1 } : undefined;
    case 'bottom': return y < size.y - 1 ? { x, y: y + 1 } : undefined;
  }
}

export const oppositeDir = (dir: Dir): Dir => {
  switch (dir) {
    case 'left': return 'right';
    case 'right': return 'left';
    case 'top': return 'bottom';
    case 'bottom': return 'top';
  }
}

const hasCoord = (obj: {coord?: Coord, dir: Dir}): obj is {coord: Coord, dir: Dir} =>
  !!obj.coord;

export const availableDirs = (p: Coord, maze: Maze): {coord: Coord, dir: Dir}[] =>
  (['left', 'right', 'top', 'bottom'] as Dir[])
    .map(dir => ({dir, coord: coordPlusDir(p, mazeSize(maze), dir)}))
    .filter(hasCoord)
    .filter(({coord}) => isCellEmpty(cellAt(coord, maze)));

export const cellAt = (p: Coord, maze: Maze): MazeCell => maze[p.y][p.x];

export const setCellAt = (p: Coord, cell: MazeCell, maze: Maze): Maze =>
  update(p.y, update(p.x, cell, maze[p.y]), maze);

export const cellPlusDir = (cell: MazeCell, dir: Dir): MazeCell =>
  assoc(dir, true, cell);

export const cellPlusMarker = (cell: MazeCell, marker: Marker): MazeCell =>
  assoc('marker', marker, cell);

export const mazeSize = <T>(maze: T[][]): Coord => ({
  y: maze.length,
  x: maze[0].length,
});

export const emptyMaze = (width: number, height: number): Maze =>
  range(0, height).map(
    () => range(0, width).map(() => emptyCell())
  );

export const emptyCell = (): MazeCell =>
  ({ top: false, bottom: false, left: false, right: false });

export const isCellEmpty = (cell: MazeCell): boolean =>
  !cell.bottom && !cell.top && !cell.left && !cell.right;

export const isDeadEndCell = (cell: MazeCell): boolean =>
  [cell.bottom, cell.top, cell.left, cell.right].filter(identity).length === 1;

export const updateMazeAt = (p: Coord, f: (c: MazeCell) => MazeCell, maze: Maze): Maze =>
  setCellAt(p, f(cellAt(p, maze)), maze);
