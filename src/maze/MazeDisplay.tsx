import React from "react";
import styled from "styled-components";
import { Marker, Maze, MazeCell } from "./Maze";

const RowWrap = styled.div`
  display: flex;
`;

const CellWrap = styled.span<{fill: boolean}>`
  display: block;
  position: relative;
  width: 16px;
  height: 16px;
  background: ${({fill}) => fill ? '#6ba380' : 'none'};
`;

const Line = styled.span`
  position: absolute;
  background-color: #0a0422;
`;

const Top = styled(Line)`
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
`;

const Bottom = styled(Line)`
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
`;

const Left = styled(Line)`
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
`;

const Right = styled(Line)`
  right: 0;
  top: 0;
  bottom: 0;
  width: 1px;
`;

const StartMarker = styled.span`
  position: absolute;
  background-color: #196d0e;
  width: 6px;
  height: 6px;
  top: 5px;
  left: 5px;
  border-radius: 100%;
`;

const EndMarker = styled(StartMarker)`
  background-color: #dd4310;
`;

const Cell: React.FC<MazeCell> = ({top, right, bottom, left, marker}) => {
  return (
    <CellWrap fill={!!marker}>
      {!top ? <Top/> : undefined}
      {!bottom ? <Bottom/> : undefined}
      {!left ? <Left/> : undefined}
      {!right ? <Right/> : undefined}
      {marker === Marker.start ? <StartMarker/> : undefined}
      {marker === Marker.end ? <EndMarker/> : undefined}
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
