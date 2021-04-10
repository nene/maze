export type MazeCell = {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
  marker: boolean;
};

export type FullMaze = MazeCell[][];

export type Dir = 'top' | 'right' | 'bottom' | 'left';

export type Coord = { x: number, y: number };
