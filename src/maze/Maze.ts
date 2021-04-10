export enum Marker { start = 1, end = 2, path = 3 }

export type MazeCell = {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
  marker?: Marker;
};

export type Maze = MazeCell[][];

export type Dir = 'top' | 'right' | 'bottom' | 'left';

export type Coord = { x: number, y: number };
