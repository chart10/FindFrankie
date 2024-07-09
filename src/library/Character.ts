import * as THREE from 'three';
// import { SimplexNoise } from 'ts-perlin-simplex';

export default class Character {
  // private static perlinNoise: SimplexNoise = new SimplexNoise();
  // posX: number;
  // posZ: number;
  // noiseOffset: number;
  material: THREE.MeshPhongMaterial;
  geometry: THREE.PlaneGeometry;
  characterMesh: THREE.Mesh;
  camera: THREE.Camera;
  scene: THREE.Scene;

  constructor(scene: THREE.Scene, camera: THREE.Camera, color: number) {
    this.scene = scene;
    this.camera = camera;
    this.geometry = new THREE.PlaneGeometry(2, 4);
    this.material = new THREE.MeshPhongMaterial({
      color: color,
      side: THREE.DoubleSide,
    });
    this.characterMesh = new THREE.Mesh(this.geometry, this.material);
    this.characterMesh.position.set(
      this.randomPosition(),
      2,
      this.randomPosition()
    );
    this.characterMesh.lookAt(camera.position);
    scene.add(this.characterMesh);
  }

  animateCharacter() {}
  randomPosition() {
    let value = Math.random() * 19;
    return (value *= Math.round(Math.random()) ? 1 : -1);
  }
  lookAt(cameraPosition: THREE.Vector3) {
    this.characterMesh.lookAt(cameraPosition);
  }
}
