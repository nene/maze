import { assoc } from "ramda";
import seedrandom from "seedrandom";
import { markPath } from "./markPath";
import { Coord, Dir, Maze } from "./Maze";
import { availableDirs, emptyMaze, oppositeDir, updateMazeAt } from "./maze-utils";

const WIDTH = 40;
const HEIGHT = 40;
const START: Coord = {x: 20, y: 0};
const END: Coord = {x: 20, y: 39};

const rand = seedrandom("abcde");

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
  maze = updateMazeAt(p1, assoc(dir, true), maze);
  maze = updateMazeAt(p2, assoc(oppositeDir(dir), true), maze);
  return maze;
}

const drawPath = (p: Coord, maze: Maze): Maze => {
  const {coord: p2, dir} = nextCell(p, maze) || {};

  if (!p2 || !dir) {
    return maze;
  }

  maze = connectCells(p, p2, dir, maze);
  maze = drawPath(p2, maze);

  // Look for alternative paths if available
  return drawPath(p, maze);
}

export function createMaze(): Maze {
  let maze = emptyMaze(WIDTH, HEIGHT);

  // draw lines
  maze = drawPath({x: 20, y: 20}, maze);

  // mark first cell
  maze = markPath(START, END, maze);

  return maze;
}
