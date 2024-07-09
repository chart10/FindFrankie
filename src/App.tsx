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
        <h1>
          <span className='letter'>F</span>
          <span className='letter'>i</span>
          <span className='letter'>n</span>
          <span className='letter'>d</span>
          &nbsp;
          <span className='letter'>F</span>
          <span className='letter'>r</span>
          <span className='letter'>a</span>
          <span className='letter'>n</span>
          <span className='letter'>k</span>
          <span className='letter'>i</span>
          <span className='letter'>e</span>
        </h1>
      </div>
    </>
  );
}

export default App;
