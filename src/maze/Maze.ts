export enum Marker { start, end }

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
