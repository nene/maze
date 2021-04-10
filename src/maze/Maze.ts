export type MazeCell = {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
  marker: boolean;
};

export type Maze = MazeCell[][];

export type Dir = 'top' | 'right' | 'bottom' | 'left';

export type Coord = { x: number, y: number };
