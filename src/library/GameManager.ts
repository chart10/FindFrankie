import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import PerspectiveCamera from './PerspectiveCamera';
import CameraControls from './CameraControls';
import Light from './Light';
import Ground from './Ground';

export default class GameManager {
  // Scene Elements
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  stats: Stats;
  mainCamera: PerspectiveCamera;
  cameraControls: CameraControls;
  directionalLight: Light;
  ambientLight: Light;

  constructor(canvas: HTMLElement) {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    this.stats = new Stats();
    this.mainCamera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      200
    );
    this.cameraControls = new CameraControls(
      this.mainCamera.camera,
      this.renderer
    );
    this.directionalLight = new Light('directionalLight', 0xfffff, 5);

    this.ambientLight = new Light('ambientLight', 0xfffff, 1);
  }

  initialize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    document.body.appendChild(this.stats.dom);
    window.addEventListener('resize', () => this.onWindowResize(), false);

    this.scene.background = new THREE.Color(0xfee440);
    this.directionalLight.setPosition(20, 100, 20);
    this.ambientLight.setPosition(5, 10, 5);

    const ground = new Ground(40);
    this.scene.add(ground.mesh);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.stats?.update();
    this.cameraControls.controls.update();
  }

  render() {
    this.renderer.render(this.scene, this.mainCamera.camera);
  }

  onWindowResize() {
    this.mainCamera.camera.aspect = window.innerWidth / window.innerHeight;
    this.mainCamera.camera.updateProjectionMatrix();
    this.renderer?.setSize(window.innerWidth, window.innerHeight);
  }
}
