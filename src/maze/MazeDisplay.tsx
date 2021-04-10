import React from "react";
import styled from "styled-components";
import { Maze, MazeCell } from "./Maze";

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

const Marker = styled.span`
  position: absolute;
  background-color: #cf4d25;
  width: 10px;
  height: 10px;
  top: 3px;
  left: 3px;
  border-radius: 100%;
`;

const Cell: React.FC<MazeCell> = ({top, right, bottom, left, marker}) => {
  return (
    <CellWrap>
      {top ? <Top/> : undefined}
      {bottom ? <Bottom/> : undefined}
      {left ? <Left/> : undefined}
      {right ? <Right/> : undefined}
      {marker ? <Marker/> : undefined}
    </CellWrap>
  );
}

export const MazeDisplay: React.FC<{data: Maze}> = ({data}) => {
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
