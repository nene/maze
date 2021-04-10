import React from "react";
import styled from "styled-components";
import { range } from "ramda";

type MazeCell = {
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

const data: MazeCell[][] = range(0, height).map(
  () => range(0, width).map(() => ({
    top: randomFrom([true, false]),
    right: randomFrom([true, false]),
    bottom: randomFrom([true, false]),
    left: randomFrom([true, false]),
  }))
);

const RowWrap = styled.div`
  display: flex;
`;

const CellWrap = styled.span`
  display: block;
  position: relative;
  width: 16px;
  height: 16px;
  border: 1px solid #d0edf7;
`;

const Line = styled.span`
  position: absolute;
  background-color: #0a0422;
`;

const Top = styled(Line)`
  top: 0;
  left: 7px;
  width: 2px;
  height: 8px;
`;

const Bottom = styled(Line)`
  bottom: 0;
  left: 7px;
  width: 2px;
  height: 8px;
`;

const Left = styled(Line)`
  top: 7px;
  left: 0;
  width: 8px;
  height: 2px;
`;

const Right = styled(Line)`
  top: 7px;
  right: 0;
  width: 8px;
  height: 2px;
`;

const Cell: React.FC<MazeCell> = ({top, right, bottom, left}) => {
  return (
    <CellWrap>
      {top ? <Top/> : undefined}
      {bottom ? <Bottom/> : undefined}
      {left ? <Left/> : undefined}
      {right ? <Right/> : undefined}
    </CellWrap>
  );
}

export const Maze: React.FC<{}> = () => {
  return (
    <div>
      { data.map((row, i) =>
          <RowWrap key={i}>
            { row.map((cell, j) => <Cell key={i*1000+j} {...cell} />) }
          </RowWrap>
      ) }
    </div>
  );
};
