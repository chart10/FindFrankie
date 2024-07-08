import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

export default class SceneInit {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  fov: number;
  nearPlane: number;
  farPlane: number;
  canvasId: string;
  clock: object;
  stats: Stats;
  controls: OrbitControls;
  ambientLight: THREE.AmbientLight;
  directionalLight: THREE.DirectionalLight;
  testLight: THREE.PointLight;
  loader: THREE.TextureLoader;
  characterCount: number;
  characters: THREE.Mesh[];

  constructor(canvasId: string) {
    this.fov = 45;
    this.nearPlane = 0.1;
    this.farPlane = 100;
    this.canvasId = canvasId;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    const canvas = document.getElementById(this.canvasId)!;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.loader = new THREE.TextureLoader();

    // Extra tools
    this.clock = new THREE.Clock();
    this.stats = new Stats();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Lighting
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    this.testLight = new THREE.PointLight(0xffffff, 100);

    // Character Sprites
    this.characterCount = 100;
    this.characters = [];
  }

  initialize() {
    this.camera.position.set(0, 20, 40);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer?.domElement);

    document.body.appendChild(this.stats.dom);
    this.ambientLight.castShadow = true;
    // this.directionalLight.castShadow = true;
    this.directionalLight.position.set(5, 10, 5);
    this.scene.add(this.directionalLight);
    this.scene.add(this.testLight);

    this.scene.background = new THREE.Color('#22223b');

    // Plane
    {
      const planeSize = 40;
      const loader = new THREE.TextureLoader();
      const texture = loader.load(
        'https://threejs.org/manual/examples/resources/images/checker.png'
      );
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.NearestFilter;
      texture.colorSpace = THREE.SRGBColorSpace;
      const repeats = planeSize / 4;
      texture.repeat.set(repeats, repeats);
      const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
      const planeMat = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(planeGeo, planeMat);
      mesh.rotation.x = Math.PI * -0.5;
      this.scene.add(mesh);
    }

    // Create Civilian Characters
    const civilianMat = new THREE.MeshPhongMaterial({
      color: 0x9b5de5,
      side: THREE.DoubleSide,
    });
    for (let i = 0; i < this.characterCount; i++) {
      this.createCharacterSprite(civilianMat);
    }

    // Create Frankie Sprite
    {
      const frankieMat = new THREE.MeshPhongMaterial({
        color: 0xff006e,
        side: THREE.DoubleSide,
      });
      this.createCharacterSprite(frankieMat);
    }

    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  createCharacterSprite(characterMat: THREE.MeshPhongMaterial) {
    const planeGeo = new THREE.PlaneGeometry(2, 4);
    const planeMat = characterMat;
    const characterMesh = new THREE.Mesh(planeGeo, planeMat);
    const xPosition = this.randomPosition();
    const zPosition = this.randomPosition();
    characterMesh.position.set(xPosition, 2, zPosition);
    characterMesh.lookAt(this.camera.position);
    this.scene.add(characterMesh);
    this.characters.push(characterMesh);
  }

  randomPosition() {
    let value = Math.random() * 20;
    return (value *= Math.round(Math.random()) ? 1 : -1);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.stats?.update();
    this.controls?.update();
    this.characters.map((sprite) => {
      sprite.lookAt(this.camera.position);
    });
  }

  render() {
    if (this.scene && this.camera)
      this.renderer?.render(this.scene, this.camera);
  }

  onWindowResize() {
    if (this.camera) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }
    this.renderer?.setSize(window.innerWidth, window.innerHeight);
  }
}
