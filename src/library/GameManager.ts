import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import PerspectiveCamera from './scene-utilities/PerspectiveCamera';
import CameraControls from './scene-utilities/CameraControls';
import Light from './scene-utilities/Light';
import Ground from './scene-objects/Ground';
import { Character } from './scene-objects/Character';
import { characterSprites, frankieSprite } from './GameUtilities';
import Raycaster from './scene-utilities/Raycaster';

export default class GameManager {
  // Scene Elements
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  stats: Stats;
  mainCamera: PerspectiveCamera;
  cameraControls: CameraControls;
  directionalLight: Light;
  ambientLight: Light;
  raycaster: Raycaster;
  gameStates: { frankieFound: boolean };
  // frankieFound: boolean;

  // Character Objects
  characterCount: number;
  characterCrowdObject: THREE.Object3D;
  frankieObject: THREE.Object3D;
  characterCrowd: Character[];

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
    this.gameStates = { frankieFound: false };

    this.raycaster = new Raycaster(
      this.scene,
      this.mainCamera.camera,
      this.gameStates
    );

    this.directionalLight = new Light('directionalLight', 0xfffff, 5);
    this.ambientLight = new Light('ambientLight', 0xfffff, 1);

    this.characterCount = 50;
    this.characterCrowd = [];
    this.characterCrowdObject = new THREE.Object3D();
    this.frankieObject = new THREE.Object3D();
    this.scene.add(this.characterCrowdObject);
    this.scene.add(this.frankieObject);
  }

  initialize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    document.body.appendChild(this.stats.dom);
    document.addEventListener(
      'mousedown',
      this.raycaster.onClickGame.bind(this.raycaster),
      false
    );
    window.addEventListener('resize', () => this.onWindowResize(), false);

    this.scene.background = new THREE.Color(0xfee440);
    this.mainCamera.setPosition(0, 20, 40);
    this.directionalLight.setPosition(20, 100, 20);
    this.ambientLight.setPosition(5, 10, 5);

    const ground = new Ground(40);
    this.scene.add(ground.mesh);

    for (let i = 0; i < this.characterCount; i++) {
      const characterName = 'Civilian ' + i;
      this.initializeCharacter(
        characterName,
        characterSprites,
        this.characterCrowdObject
      );
    }
    this.initializeCharacter('Frankie', frankieSprite, this.frankieObject);
  }

  initializeCharacter(
    name: string,
    characterSprites: string[],
    sceneObject: THREE.Object3D
  ) {
    const character = new Character(name, characterSprites, this.gameStates);
    character.setRandomPosition();
    this.characterCrowd.push(character);
    sceneObject.add(character.mesh);
    return character;
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.stats?.update();
    this.cameraControls.controls.update();

    this.characterCrowd.map((character) => {
      character.animateCharacter(this.mainCamera.camera.position);
    });
    // console.log(this.gameStates.frankieFound);
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
