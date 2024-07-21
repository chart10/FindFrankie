import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import CameraControls from './scene-utilities/CameraControls';
import Light from './scene-utilities/Light';
import Ground from './scene-objects/Ground';
import { Character } from './scene-objects/Character';
import { titleScene, easy, medium, hard } from './GameConstants';
import Raycaster from './scene-utilities/Raycaster';

export default class GameManager extends EventTarget {
  // Scene Utilities
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  stats: Stats;
  camera: THREE.PerspectiveCamera;
  cameraControls: CameraControls;
  raycaster: Raycaster;
  directionalLight: Light;
  ambientLight: Light;

  // Character Objects
  characterCrowdObject: THREE.Object3D;
  characterCrowd: Character[];

  // UI Variables
  gameStates: {
    gameActive: boolean;
    frankieFound: boolean;
    difficulty: string;
  };
  stage: {
    sceneBoundary: number;
    characterCount: number;
    groundSprite: string;
    characterSprites: string[];
    frankieSprites: string[];
  }[];
  currentLevel: number;

  constructor(canvas: HTMLElement) {
    super();
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    this.stats = new Stats();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      200
    );
    this.cameraControls = new CameraControls(this.camera, this.renderer);
    this.raycaster = new Raycaster(this);
    this.directionalLight = new Light('directionalLight', 0xfffff, 5);
    this.ambientLight = new Light('ambientLight', 0xfffff, 1);

    this.characterCrowd = [];
    this.characterCrowdObject = new THREE.Object3D();
    this.scene.add(this.characterCrowdObject);

    this.gameStates = {
      gameActive: false,
      frankieFound: false,
      difficulty: 'none',
    };
    this.stage = titleScene;
    this.currentLevel = 0;
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

    this.camera.position.set(0, 20, 40);
    this.directionalLight.setPosition(20, 100, 20);
    this.ambientLight.setPosition(5, 10, 5);

    const ground = new Ground(40, this.stage[this.currentLevel].groundSprite);
    this.scene.add(ground.mesh);

    this.removeAllCharacters();

    for (let i = 0; i < this.stage[this.currentLevel].characterCount; i++) {
      const characterName = 'Civilian ' + i;
      this.initializeCharacter(
        characterName,
        this.stage[this.currentLevel].characterSprites,
        this.characterCrowdObject
      );
    }
    this.initializeCharacter(
      'Frankie',
      this.stage[this.currentLevel].frankieSprites,
      this.characterCrowdObject
    );
  }

  initializeCharacter(
    name: string,
    characterSprites: string[],
    sceneObject: THREE.Object3D
  ) {
    const character = new Character(
      name,
      characterSprites,
      this.gameStates,
      this.stage[this.currentLevel].sceneBoundary
    );
    character.setRandomPosition();
    this.characterCrowd.push(character);
    sceneObject.add(character.mesh);
    return character;
  }

  removeAllCharacters() {
    while (this.characterCrowdObject.children.length > 0) {
      const character = this.characterCrowdObject.children[0];
      this.characterCrowdObject.remove(character);
      // @ts-expect-error (character.materials exists)
      character.geometry.dispose();
      // @ts-expect-error (character.materials exists)
      character.material.dispose();
    }
    this.characterCrowd = [];
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.stats?.update();
    this.cameraControls.controls.update();

    this.characterCrowd.map((character) => {
      character.animateCharacter(this.camera.position);
    });
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer?.setSize(window.innerWidth, window.innerHeight);
  }

  setDifficulty(difficulty: 'Easy' | 'Medium' | 'Hard' | 'Default') {
    this.gameStates.difficulty = difficulty;
    switch (difficulty) {
      case 'Easy':
        this.stage = easy;
        break;
      case 'Medium':
        this.stage = medium;
        break;
      case 'Hard':
        this.stage = hard;
        break;
      case 'Default':
        this.stage = titleScene;
        break;
    }
    this.dispatchEvent(
      new CustomEvent('setGameConstants', { detail: this.stage })
    );
  }

  setGameActive(state: boolean) {
    this.gameStates.gameActive = state;
    this.initialize();
    this.dispatchEvent(new CustomEvent('gameActive', { detail: state }));
  }

  setCurrentLevel(level: number) {
    if (level >= this.stage.length) return;
    this.currentLevel = level;
    this.dispatchEvent(
      new CustomEvent('currentLevel', {
        detail: { currentLevel: level, lastLevel: this.stage.length - 1 },
      })
    );
  }

  setFrankieFound(state: boolean) {
    this.gameStates.frankieFound = state;
    this.dispatchEvent(new CustomEvent('frankieFound', { detail: state }));
    console.log('Frankie Found!!!');
  }

  isGameActive() {
    return this.gameStates.gameActive;
  }

  isFrankieFound() {
    return this.gameStates.frankieFound;
  }

  isLastLevel() {
    return this.currentLevel === this.stage.length - 1;
  }
}
