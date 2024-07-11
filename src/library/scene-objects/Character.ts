import * as THREE from 'three';
// import { SimplexNoise } from 'three/examples/jsm/Addons.js';
import { sceneBoundary } from '../GameUtilities';

export class Character {
  mesh: THREE.Mesh;
  loader: THREE.TextureLoader;
  movementCounter: number;
  simplexSpeed: number;
  simplexOffset: number;
  positiveXVelocity: boolean;
  positiveZVelocity: boolean;
  test: string;

  constructor(
    characterSprites: string[],
    simplexSpeed: number = 0.005,
    simplexOffset: number = 0
  ) {
    this.movementCounter = 0;
    this.simplexSpeed = simplexSpeed;
    this.simplexOffset = simplexOffset;
    this.positiveXVelocity = Math.random() > 0.5;
    this.positiveZVelocity = true;
    this.loader = new THREE.TextureLoader();
    this.mesh = this.buildCharacterMesh(characterSprites);
    this.test = 'regular civilian';
  }

  buildCharacterMesh(characterSprites: string[]) {
    const sprite =
      characterSprites[Math.floor(Math.random() * characterSprites.length)];
    const texture = this.loader.load(sprite);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.NearestFilter;
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      alphaTest: 0.5,
    });
    const geometry = new THREE.PlaneGeometry(2, 4);
    this.mesh = new THREE.Mesh(geometry, material);
    return this.mesh;
  }

  setPosition(x: number, y: number, z: number) {
    this.mesh.position.set(x, y, z);
  }

  setRandomPosition() {
    const x =
      Math.random() * sceneBoundary * (Math.round(Math.random()) ? 1 : -1);
    const y = 2;
    const z =
      Math.random() * sceneBoundary * (Math.round(Math.random()) ? 1 : -1);
    this.mesh.position.set(x, y, z);
  }

  animateCharacter(cameraPosition: THREE.Vector3) {
    this.mesh.lookAt(cameraPosition);
  }

  getTest() {
    console.log(this.test);
  }
}
