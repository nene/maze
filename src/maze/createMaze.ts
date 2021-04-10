import seedrandom from "seedrandom";
import { Coord, Dir, Maze } from "./Maze";
import { availableDirs, cellAt, cellPlusDir, cellPlusMarker, emptyMaze, isDeadEndCell, oppositeDir, setCellAt } from "./maze-utils";

const WIDTH = 40;
const HEIGHT = 40;

const rand = seedrandom("gentelmen");

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

const connectCells = (p1: Coord, p2: Coord, dir: Dir, maze: Maze): Maze => {
  maze = setCellAt(p1, cellPlusDir(cellAt(p1, maze), dir), maze);
  maze = setCellAt(p2, cellPlusDir(cellAt(p2, maze), oppositeDir(dir)), maze);
  return maze;
}

const drawPath = (p: Coord, maze: Maze): Maze => {
  const {coord: p2, dir} = nextCell(p, maze) || {};

  if (!p2 || !dir) {
    if (isDeadEndCell(cellAt(p, maze))) {
      maze = setCellAt(p, cellPlusMarker(cellAt(p, maze), true), maze);
    }
    return maze;
  }

  maze = connectCells(p, p2, dir, maze);
  maze = drawPath(p2, maze);

  // Look for alternative paths if available
  maze = drawPath(p, maze);

  return maze;
}

export function createMaze(): Maze {
  let maze = emptyMaze(WIDTH, HEIGHT);

  let p: Coord = {x: 20, y: 20};

  // mark first cell
  maze = setCellAt(p, cellPlusMarker(cellAt(p, maze), true), maze);
  // draw line
  maze = drawPath(p, maze);

  return maze;
}
