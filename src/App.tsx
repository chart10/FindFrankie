import { useEffect } from 'react';
import * as THREE from 'three';
import './App.css';
import SceneInit from './library/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('threeJsCanvas');
    test.initialize();
    test.animate();

    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

    test.scene?.add(boxMesh);
  }, []);

  return (
    <>
      <canvas id='threeJsCanvas'></canvas>
    </>
  );
}

export default App;
