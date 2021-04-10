import seedrandom from "seedrandom";
import { Coord, Dir, Maze, MazeCell } from "./Maze";
import { cellAt, cellPlusDir, cellPlusMarker, coordPlusDir, emptyCell, emptyMaze, isCellEmpty, mazeSize, oppositeDir, setCellAt } from "./maze-utils";

const WIDTH = 40;
const HEIGHT = 40;

const rand = seedrandom("gentelmen are so solid people in our world of freaks");

function randomFrom<T>(arr: T[]): T {
  const index = Math.floor(rand() * arr.length);
  return arr[index];
}

const nextCell = (p: Coord, maze: Maze): {p2: Coord, dir: Dir} | undefined => {
  let directions: Dir[] = ['left', 'right', 'top', 'bottom'];
  while (directions.length > 0) {
    const dir = randomFrom(directions);
    const p2 = coordPlusDir(p, mazeSize(maze), dir);
    if (p2 && isCellEmpty(cellAt(p2, maze))) {
      return {p2, dir};
    }
    directions = directions.filter(d => d !== dir);
  }
  return undefined;
}

export function createMaze(): Maze {
  let maze = emptyMaze(WIDTH, HEIGHT);

  let p: Coord = {x: 20, y: 20};
  // mark first cell
  let cell: MazeCell | undefined = cellPlusMarker(cellAt(p, maze) || emptyCell(), true);

  while (p) {
    const {p2, dir} = nextCell(p, maze) || {};
    if (!p2 || !dir) {
      break;
    }

    maze = setCellAt(p, cellPlusDir(cell || emptyCell(), dir), maze);
    maze = setCellAt(p2, cellPlusDir(emptyCell(), oppositeDir(dir)), maze);
    p = p2;
    cell = cellAt(p2, maze);
  }

  // mark last cell
  maze = setCellAt(p, cellPlusMarker(cell || emptyCell(), true), maze);

  return maze;
}
