import React from "react";
import styled from "styled-components";
import { MazeCell } from "./createMaze";

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

export const Maze: React.FC<{data: MazeCell[][]}> = ({data}) => {
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
