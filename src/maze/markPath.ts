import { assoc, equals } from "ramda";
import { Coord, Dir, Marker, Maze } from "./Maze";
import { cellAt, coordPlusDir, mazeSize, updateMazeAt } from "./maze-utils";

export const markPath = (p1: Coord, p2: Coord, maze: Maze): Maze => {
  const mazeWithPath = findPath(p1, p1, p2, maze);
  if (mazeWithPath) {
    return updateMazeAt(p1, assoc('marker', Marker.start), mazeWithPath);
  }
  return maze;
}

const findPath = (p0: Coord, p1: Coord, p2: Coord, maze: Maze): Maze | undefined => {
  if (equals(p1, p2)) {
    return updateMazeAt(p1, assoc('marker', Marker.end), maze);
  }

  for (const p of branches(p1, maze).filter(p => !equals(p, p0))) {
    const mazeWithPath = findPath(p1, p, p2, maze);
    if (mazeWithPath) {
      return updateMazeAt(p1, assoc('marker', Marker.path), mazeWithPath);
    }
  }

  return undefined;
}

const branches = (p: Coord, maze: Maze): Coord[] => {
  const cell = cellAt(p, maze);
  return (['left', 'right', 'top', 'bottom'] as Dir[])
    .filter(dir => cell[dir])
    .map(dir => coordPlusDir(p, mazeSize(maze), dir))
    .filter(isDefined);
}

const isDefined = <T>(obj: T | undefined): obj is T =>
  obj !== undefined;
