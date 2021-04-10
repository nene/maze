import seedrandom from "seedrandom";
import { Coord, Dir, Maze, MazeCell } from "./Maze";
import { availableDirs, cellAt, cellPlusDir, cellPlusMarker, coordPlusDir, emptyCell, emptyMaze, isCellEmpty, mazeSize, oppositeDir, setCellAt } from "./maze-utils";

const WIDTH = 40;
const HEIGHT = 40;

const rand = seedrandom("gentelmen solid people in our world");

function randomFrom<T>(arr: T[]): T {
  const index = Math.floor(rand() * arr.length);
  return arr[index];
}

const nextCell = (p: Coord, maze: Maze): {coord: Coord, dir: Dir} | undefined => {
  let directions = availableDirs(p, maze);
  if (directions.length === 0) {
    return undefined;
  }
  return randomFrom(directions);
}

export function createMaze(): Maze {
  let maze = emptyMaze(WIDTH, HEIGHT);

  let p: Coord = {x: 20, y: 20};
  // mark first cell
  let cell: MazeCell | undefined = cellPlusMarker(cellAt(p, maze) || emptyCell(), true);

  while (p) {
    const {coord: p2, dir} = nextCell(p, maze) || {};
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
