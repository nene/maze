import { createMaze } from './maze/createMaze';
import { MazeDisplay } from './maze/MazeDisplay';

export function App() {
  return (
    <>
      <h1>Little mazer</h1>
      <MazeDisplay data={createMaze()} />
    </>
  );
}
