import { assoc } from "ramda";
import seedrandom from "seedrandom";
import { markPath } from "./markPath";
import { Coord, Dir, Marker, Maze } from "./Maze";
import { availableDirs, emptyMaze, oppositeDir, updateMazeAt } from "./maze-utils";

const WIDTH = 50;
const HEIGHT = 50;
const START: Coord = {x: Math.floor(WIDTH / 2), y: 0};
const END: Coord = {x: Math.floor(WIDTH / 2), y: HEIGHT-1};

const rand = seedrandom("cyber alco maniac");

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
  maze = drawPath({x: Math.floor(WIDTH / 2), y: Math.floor(HEIGHT / 2)}, maze);
  // highlight path
  maze = markPath(START, END, maze);
  // Mark START/END
  maze = updateMazeAt(START, assoc('marker', Marker.start), maze);
  maze = updateMazeAt(END, assoc('marker', Marker.end), maze);

  return maze;
}
