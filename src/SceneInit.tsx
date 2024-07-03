import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { useEffect } from 'react';

function SceneInit() {
  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 96;

    const canvas = document.getElementById('gameCanvas')!;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);
    const spotLight = new THREE.AmbientLight('#ffffff', 0.5);
    spotLight.castShadow = true;
    scene.add(spotLight);

    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(boxMesh);

    const controls = new OrbitControls(camera, renderer.domElement);

    const stats = new Stats();
    document.body.appendChild(stats.dom);

    function render(time: number) {
      time *= 0.001;

      boxMesh.rotation.x = time;
      boxMesh.rotation.y = time;
      stats.update();
      controls.update();

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }, []);

  return (
    <>
      {/* <h1>Find Frankie!</h1> */}
      <canvas id='gameCanvas'></canvas>
    </>
  );
}

export default SceneInit;
