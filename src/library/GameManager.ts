import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import PerspectiveCamera from './PerspectiveCamera';
import CameraControls from './CameraControls';
import Light from './Light';

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
}
