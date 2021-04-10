import { createMaze } from './maze/createMaze';
import { Maze } from './maze/Maze';

export function App() {
  return (
    <>
      <h1>Little mazer</h1>
      <Maze data={createMaze()} />
    </>
  );
}
