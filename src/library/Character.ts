import * as THREE from 'three';
import { SimplexNoise } from 'three/examples/jsm/Addons.js';
import { sceneBoundary } from './GameUtilities';

export default class Character {
  simplex: SimplexNoise = new SimplexNoise();
  simplexSpeed: number;
  noiseOffset: number;
  counter: number;
  posXVelocity: boolean;
  posZVelocity: boolean;
  material: THREE.MeshPhongMaterial;
  geometry: THREE.PlaneGeometry;
  characterMesh: THREE.Mesh;
  camera: THREE.Camera;
  scene: THREE.Scene;

  constructor(
    scene: THREE.Scene,
    camera: THREE.Camera,
    color: number,
    noiseOffset: number = 0,
    simplexSpeed: number = 0.005
  ) {
    this.counter = 0;
    this.simplexSpeed = simplexSpeed;
    this.posXVelocity = Math.random() > 0.5;
    this.posZVelocity = true;
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
    this.noiseOffset = noiseOffset;
  }

  animateCharacter() {
    if (
      this.characterMesh.position.z > sceneBoundary ||
      this.characterMesh.position.z < -sceneBoundary
    )
      this.posZVelocity = !this.posZVelocity;
    if (
      this.characterMesh.position.x > sceneBoundary ||
      this.characterMesh.position.x < -sceneBoundary
    )
      this.posXVelocity = !this.posXVelocity;

    this.characterMesh.position.z = this.calculatePerlinNoise(
      this.characterMesh.position.z,
      this.posZVelocity
    );
    this.posXVelocity
      ? (this.characterMesh.position.x += 0.01)
      : (this.characterMesh.position.x -= 0.01);

    // this.characterMesh.position.x = this.calculatePerlinNoise(
    //   this.characterMesh.position.x, this.posXVelocity
    // );
    this.counter += this.simplexSpeed;
  }

  calculatePerlinNoise(value: number, posVelocity: boolean) {
    if (posVelocity) {
      value +=
        this.simplex.noise(
          this.counter + this.noiseOffset,
          this.counter + this.noiseOffset
        ) * 0.05;
    } else {
      value -=
        this.simplex.noise(
          this.counter + this.noiseOffset,
          this.counter + this.noiseOffset
        ) * 0.05;
    }
    return value;
  }

  randomPosition() {
    let value = Math.random() * 19;
    return (value *= Math.round(Math.random()) ? 1 : -1);
  }
  lookAt(cameraPosition: THREE.Vector3) {
    this.characterMesh.lookAt(cameraPosition);
  }
}
