import { range } from "ramda";

export type MazeCell = {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
};

const width = 10
const height = 10

function randomFrom<T>(arr: T[]): T {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

export function createMaze(): MazeCell[][] {
  return range(0, height).map(
    () => range(0, width).map(() => ({
      top: randomFrom([true, false]),
      right: randomFrom([true, false]),
      bottom: randomFrom([true, false]),
      left: randomFrom([true, false]),
    }))
  );
}