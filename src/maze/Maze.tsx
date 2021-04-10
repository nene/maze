import React from "react";
import styled from "styled-components";
import { range } from "ramda";

type MazeCell = number;

const width = 10
const height = 10

const data: MazeCell[][] = range(0, height).map(
  () => range(0, width)
);

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
