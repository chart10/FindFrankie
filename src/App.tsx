import { useEffect } from 'react';
// import * as THREE from 'three';
import './App.css';
import SceneInit from './library/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('threeJsCanvas');
    test.initialize();
    test.animate();
  }, []);

  return (
    <>
      <canvas id='threeJsCanvas'></canvas>
      <div className='game-title'>
        <h1>Find Frankie</h1>
      </div>
    </>
  );
}

export default App;
