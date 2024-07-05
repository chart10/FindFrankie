import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { useEffect } from 'react';

function HelloCube() {
  useEffect(() => {
    const scene = new THREE.Scene();
    console.log(typeof scene);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 96;
    camera.position.y = 32;

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

    const planeSize = 100;
    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      'https://threejs.org/manual/examples/resources/images/checker.png'
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    scene.add(mesh);

    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.y = 8;
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

export default HelloCube;
