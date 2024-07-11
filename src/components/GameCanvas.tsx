import { useEffect } from 'react';
// import SceneInit from '../library/SceneInit';
import GameManager from '../library/GameManager';

const GameCanvas = () => {
  useEffect(() => {
    // const test = new SceneInit('threeJsCanvas');
    // test.initialize();
    // test.animate();
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
