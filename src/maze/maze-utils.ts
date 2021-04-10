import { clone, range } from "ramda";
import { Coord, Dir, FullMaze, MaybeMaze, MazeCell } from "./Maze";

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

export const cellAt = (p: Coord, maze: MaybeMaze): MazeCell | undefined => maze[p.y][p.x];

export const cellPlusDir = (cell: MazeCell, dir: Dir): MazeCell => {
  const c = clone(cell);
  c[dir] = true;
  return c;
}

export const cellPlusMarker = (cell: MazeCell, marker: boolean): MazeCell => {
  const c = clone(cell);
  c.marker = true;
  return c;
}

export const mazeSize = <T>(maze: T[][]): Coord => ({
  y: maze.length,
  x: maze[0].length,
});

export const emptyMaze = (width: number, height: number): undefined[][] => {
  return range(0, height).map(
    () => range(0, width).map(() => undefined)
  );
}

export const emptyCell = (): MazeCell => ({ top: false, bottom: false, left: false, right: false, marker: false });

export const fillEmptySlots = (maze: MaybeMaze): FullMaze => {
  return maze.map(row => row.map(c => c || emptyCell()));
}
