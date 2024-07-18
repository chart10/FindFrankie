import * as THREE from 'three';
import { SimplexNoise } from 'three/examples/jsm/Addons.js';
import { sceneBoundary } from '../GameConstants';

export class Character {
  mesh: THREE.Mesh;
  loader: THREE.TextureLoader;
  simplexNoise: SimplexNoise = new SimplexNoise();
  movementCounter: number;
  simplexSpeed: number;
  simplexOffset: number;
  positiveXVelocity: boolean;
  positiveZVelocity: boolean;
  gameStates: { frankieFound: boolean };

  constructor(
    name: string,
    characterSprites: string[],
    gameStates: { frankieFound: boolean },
    simplexSpeed: number = 0.005,
    simplexOffset: number = 0
  ) {
    this.movementCounter = 0;
    this.simplexSpeed = simplexSpeed;
    this.simplexOffset = simplexOffset;
    this.positiveXVelocity = Math.random() > 0.5;
    this.positiveZVelocity = true;
    this.loader = new THREE.TextureLoader();
    this.mesh = this.buildCharacterMesh(name, characterSprites);
    this.gameStates = gameStates;
  }

  buildCharacterMesh(name: string, characterSprites: string[]) {
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
    this.mesh.name = name;
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
    if (this.gameStates.frankieFound && this.mesh.name === 'Frankie') {
      this.animateFrankieOnWin(2);
    } else {
      if (
        this.mesh.position.z > sceneBoundary ||
        this.mesh.position.z < -sceneBoundary
      )
        this.positiveZVelocity = !this.positiveZVelocity;
      if (
        this.mesh.position.x > sceneBoundary ||
        this.mesh.position.x < -sceneBoundary
      )
        this.positiveXVelocity = !this.positiveXVelocity;

      this.mesh.position.z = this.calculatePerlinNoise(
        this.mesh.position.z,
        this.positiveZVelocity
      );
      this.positiveXVelocity
        ? (this.mesh.position.x += 0.02)
        : (this.mesh.position.x -= 0.02);

      this.movementCounter += this.simplexSpeed;
    }
    this.mesh.lookAt(cameraPosition);
  }

  animateFrankieOnWin(fullScale: number) {
    const scaleIncrement = 0.05;
    if (this.mesh.scale.x < fullScale) {
      this.mesh.scale.x += scaleIncrement;
      this.mesh.scale.y += scaleIncrement;
      this.mesh.scale.z += scaleIncrement;
      this.mesh.position.y += scaleIncrement * 2;
    }
  }

  calculatePerlinNoise(value: number, posVelocity: boolean) {
    if (posVelocity) {
      value +=
        this.simplexNoise.noise(
          this.movementCounter + this.simplexOffset,
          this.movementCounter + this.simplexOffset
        ) * 0.05;
    } else {
      value -=
        this.simplexNoise.noise(
          this.movementCounter + this.simplexOffset,
          this.movementCounter + this.simplexOffset
        ) * 0.05;
    }
    return value;
  }
}
