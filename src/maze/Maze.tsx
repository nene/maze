import React from "react";

type MazeCell = number;

const data: MazeCell[][] = [
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
];

const Cell: React.FC<{cell: MazeCell}> = ({cell}) => {
  return <span>{cell}</span>
}

export const Maze: React.FC<{}> = () => {
  return (
    <div>
      { data.map(row => <div>{ row.map(cell => <Cell cell={cell} />) }</div>) }
    </div>
  );
}