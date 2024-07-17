import { useEffect } from 'react';
import GameManager from '../library/GameManager';

const GameCanvas = () => {
  useEffect(() => {
    const gameManager = new GameManager(
      document.getElementById('threeJsCanvas')!
    );
    gameManager.initialize();
    gameManager.animate();
  }, []);

  return (
    <>
      <canvas id='threeJsCanvas'></canvas>
    </>
  );
};
export default GameCanvas;
