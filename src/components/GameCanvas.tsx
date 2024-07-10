import { useEffect } from 'react';
import SceneInit from '../library/SceneInit';

const GameCanvas = () => {
  useEffect(() => {
    const test = new SceneInit('threeJsCanvas');
    test.initialize();
    test.animate();
  }, []);

  return (
    <>
      <canvas id='threeJsCanvas'></canvas>
    </>
  );
};
export default GameCanvas;
