import { clone, range } from "ramda";
import seedrandom from "seedrandom";

export type MazeCell = {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
};

type FullMaze = MazeCell[][];
type MaybeMaze = (MazeCell | undefined)[][];

type Dir = keyof MazeCell;

type Coord = { x: number, y: number };

const WIDTH = 40;
const HEIGHT = 40;

const rand = seedrandom("gentelmen are so solid people in our world of freaks");

function randomFrom<T>(arr: T[]): T {
  const index = Math.floor(rand() * arr.length);
  return arr[index];
}

const emptyMaze = (width: number, height: number): undefined[][] => {
  return range(0, height).map(
    () => range(0, width).map(() => undefined)
  );
}

const emptyCell = (): MazeCell => ({ top: false, bottom: false, left: false, right: false });

const fillEmptySlots = (maze: MaybeMaze): FullMaze => {
  return maze.map(row => row.map(c => c || emptyCell()));
}

const coordPlusDir = ({x, y}: Coord, size: Coord, dir: Dir): Coord | undefined => {
  switch (dir) {
    case 'left': return x > 0 ? { x: x - 1, y } : undefined;
    case 'right': return x < size.x - 1 ? { x: x + 1, y } : undefined;
    case 'top': return y > 0 ? { x, y: y - 1 } : undefined;
    case 'bottom': return y < size.y - 1 ? { x, y: y + 1 } : undefined;
  }
}

const oppositeDir = (dir: Dir): Dir => {
  switch (dir) {
    case 'left': return 'right';
    case 'right': return 'left';
    case 'top': return 'bottom';
    case 'bottom': return 'top';
  }
}

const cellAt = (p: Coord, maze: MaybeMaze): MazeCell | undefined => maze[p.y][p.x];

const cellPlusDir = (cell: MazeCell, dir: Dir): MazeCell => {
  const c = clone(cell);
  c[dir] = true;
  return c;
}

const mazeSize = <T>(maze: T[][]): Coord => ({
  y: maze.length,
  x: maze[0].length,
});

const nextCell = (p: Coord, maze: MaybeMaze): {p2: Coord, dir: Dir} | undefined => {
  let directions: Dir[] = ['left', 'right', 'top', 'bottom'];
  while (directions.length > 0) {
    const dir = randomFrom(directions);
    const p2 = coordPlusDir(p, mazeSize(maze), dir);
    if (p2 && !cellAt(p2, maze)) {
      return {p2, dir};
    }
    directions = directions.filter(d => d !== dir);
  }
  return undefined;
}

export function createMaze(): FullMaze {
  const maze: MaybeMaze = emptyMaze(WIDTH, HEIGHT);

  let p: Coord = {x: 20, y: 20};
  let cell = cellAt(p, maze);
  while (p) {
    const {p2, dir} = nextCell(p, maze) || {};
    if (!p2 || !dir) {
      break;
    }

    maze[p.y][p.x] = cellPlusDir(cell || emptyCell(), dir);
    maze[p2.y][p2.x] = cellPlusDir(emptyCell(), oppositeDir(dir));
    p = p2;
    cell = cellAt(p2, maze);
  }

  return fillEmptySlots(maze);
}
