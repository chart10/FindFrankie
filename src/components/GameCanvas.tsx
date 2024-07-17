import { FC } from 'react';

interface props {
  gameActive: boolean;
}

const GameCanvas: FC<props> = ({ gameActive }) => {
  return (
    <>
      <canvas
        id='threeJsCanvas'
        className={gameActive ? '' : 'canvas-dormant'}
      ></canvas>
    </>
  );
};
export default GameCanvas;
