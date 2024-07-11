import * as THREE from 'three';

export default class PerspectiveCamera {
  camera: THREE.PerspectiveCamera;

  constructor(fov: number, aspect: number, near: number, far: number) {
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  }

  setPosition(x: number, y: number, z: number) {
    this.camera.position.set(x, y, z);
  }
}
