import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export default class CameraControls {
  controls: OrbitControls;

  constructor(camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.enablePan = false;
    this.controls.enableDamping = true;
    this.controls.enableRotate = true;
    this.controls.minDistance = 30;
    this.controls.maxDistance = 100;
    this.controls.minPolarAngle = 0.2 * Math.PI;
    this.controls.maxPolarAngle = 0.5 * Math.PI;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 1;
  }
}
