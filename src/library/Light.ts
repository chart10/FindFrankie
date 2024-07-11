import * as THREE from 'three';

export default class Light {
  light: THREE.DirectionalLight | THREE.AmbientLight;
  constructor(
    lightType: 'directionalLight' | 'ambientLight',
    color: number,
    intensity: number
  ) {
    switch (lightType) {
      case 'directionalLight':
        this.light = new THREE.DirectionalLight(color, intensity);
        break;
      case 'ambientLight':
        this.light = new THREE.AmbientLight(color, intensity);
        break;
    }
    this.light.castShadow = true;
  }

  setPosition(x: number, y: number, z: number) {
    this.light.position.set(x, y, z);
  }
}
