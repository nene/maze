import React from "react";
import styled from "styled-components";

type MazeCell = number;

const data: MazeCell[][] = [
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
];

const C = styled.span`
  display: inline-block;
  width: 25px;
  height: 25px;
  border: 1px solid #3e7485;
`;

const Cell: React.FC<{cell: MazeCell}> = ({cell}) => {
  return <C>{cell}</C>
}

export const Maze: React.FC<{}> = () => {
  return (
    <div>
      { data.map(row => <div>{ row.map(cell => <Cell cell={cell} />) }</div>) }
    </div>
  );
};
