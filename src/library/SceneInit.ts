import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

export default class SceneInit {
  scene: THREE.Scene;
  clock: THREE.Clock;
  controls: OrbitControls;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  canvasId: string;
  stats: Stats;
  ambientLight: THREE.AmbientLight;
  directionalLight: THREE.DirectionalLight;
  loader: THREE.TextureLoader;
  characterCount: number;
  characters: THREE.Mesh[];
  raycaster: THREE.Raycaster;
  pointer: THREE.Vector2;

  constructor(canvasId: string) {
    this.canvasId = canvasId;
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.stats = new Stats();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      200
    );
    const canvas = document.getElementById(this.canvasId)!;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    this.loader = new THREE.TextureLoader();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    this.characterCount = 100;
    this.characters = [];
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    document.addEventListener('click', (event) => {
      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      console.log(this.pointer);

      this.raycaster.setFromCamera(this.pointer, this.camera);
      console.log(this.raycaster.ray.direction);
      const intersects = this.raycaster.intersectObjects(this.scene.children);
      console.log(intersects);
      intersects[0].object.material.color.set(0xffffff);
    });
  }

  initialize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer?.domElement);
    document.body.appendChild(this.stats.dom);

    // Camera
    this.camera.position.set(0, 20, 40);

    // Controls
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 1;
    this.controls.minDistance = 30;
    this.controls.maxDistance = 100;
    this.controls.enableRotate = false;

    // console.log(this.camera);
    // console.log(this.controls);
    this.raycaster.setFromCamera(this.pointer, this.camera);

    // console.log(this.scene.children);
    // console.log(this.raycaster);

    // Lighting
    {
      this.ambientLight.castShadow = true;
      // this.directionalLight.castShadow = true;
      this.ambientLight.position.set(5, 10, 5);
      this.directionalLight.position.set(20, 100, 20);
      this.scene.add(this.ambientLight);
      this.scene.add(this.directionalLight);
    }

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

    // Create Civilian Sprites
    // const civilianMat = ;
    for (let i = 0; i < this.characterCount; i++) {
      this.createCharacterSprite(
        new THREE.MeshPhongMaterial({
          color: 0x9b5de5,
          side: THREE.DoubleSide,
        })
      );
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
    let value = Math.random() * 19;
    return (value *= Math.round(Math.random()) ? 1 : -1);
  }

  onPointerMove(event: MouseEvent) {
    console.log(this.pointer);
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
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
    this.raycaster.setFromCamera(this.pointer, this.camera);
    // console.log(this.raycaster);

    // const intersects = this.raycaster.intersectObjects(this.scene.children);
    // for (let i = 0; i < intersects.length; i++) {
    //   // console.log(intersects[i].object.material);
    //   // intersects[i].object.material.color.set(0xffffff);
    // }
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    if (this.camera) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }
    this.renderer?.setSize(window.innerWidth, window.innerHeight);
  }
}
