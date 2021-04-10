import seedrandom from "seedrandom";
import { Coord, Dir, FullMaze, MaybeMaze, MazeCell } from "./Maze";
import { cellAt, cellPlusDir, cellPlusMarker, coordPlusDir, emptyCell, emptyMaze, fillEmptySlots, mazeSize, oppositeDir } from "./maze-utils";

const WIDTH = 40;
const HEIGHT = 40;

const rand = seedrandom("gentelmen are so solid people in our world of freaks");

function randomFrom<T>(arr: T[]): T {
  const index = Math.floor(rand() * arr.length);
  return arr[index];
}

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
  // mark first cell
  let cell: MazeCell | undefined = cellPlusMarker(cellAt(p, maze) || emptyCell(), true);

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

  // mark last cell
  maze[p.y][p.x] = cellPlusMarker(cell || emptyCell(), true);

  return fillEmptySlots(maze);
}
