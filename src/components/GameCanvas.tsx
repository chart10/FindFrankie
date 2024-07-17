import { FC, useEffect } from 'react';
import GameManager from '../library/GameManager';

interface props {
  gameActive: boolean;
}

const GameCanvas: FC<props> = ({ gameActive }) => {
  useEffect(() => {
    const gameManager = new GameManager(
      document.getElementById('threeJsCanvas')!
    );
    gameManager.initialize();
    gameManager.animate();
  }, []);

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
