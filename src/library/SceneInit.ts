import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import Character from './Character';
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
  characters: Character[];
  raycaster: THREE.Raycaster;
  pointer: THREE.Vector2;
  frankie: Character;
  frankieFound: boolean;

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
    this.characterCount = 25;
    this.characters = [];

    this.frankieFound = false;
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    document.addEventListener('click', (event) => {
      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.pointer, this.camera);
      const intersects = this.raycaster.intersectObjects(
        this.scene.children,
        false
      );
      let frankieMesh = this.frankie.material;
      frankieMesh.map.needsUpdate = true;
      const intersectedMesh = intersects[0].object.material;
      if (intersectedMesh == frankieMesh) {
        this.frankieFound = true;
        const texture = this.loader.load('ff-polka_green-cheer2.png');
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.NearestFilter;
        intersects[0].object.material.map = texture;
      } else {
        intersects[0].object.material.color.set(0xf72585);
        setTimeout(() => {
          intersects[0].object.material.color.set(0xffffff);
        }, 1000);
      }

      console.log('Did you click Frankie? ' + this.frankieFound);
    });
  }

  // clickOnMesh(event: MouseEvent) {
  //   this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  //   this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  //   this.raycaster.setFromCamera(this.pointer, this.camera);
  //   const intersects = this.raycaster.intersectObjects(
  //     this.scene.children,
  //     false
  //   );
  //   const frankieMesh = this.frankie.material;
  //   const intersectedMesh = intersects[0].object.material;
  //   if (intersectedMesh == frankieMesh) this.frankieFound = true;
  //   intersects[0].object.material.color.set(0xf72585);
  //   setTimeout(() => {
  //     intersects[0].object.material.color.set(0xffffff);
  //   }, 1000);
  //   console.log(this.frankieFound);
  // }

  initialize() {
    this.scene.background = new THREE.Color(0xfee440);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer?.domElement);
    document.body.appendChild(this.stats.dom);

    // Camera
    this.camera.position.set(0, 20, 40);

    // Controls
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 1;
    // this.controls.minDistance = 30;
    // this.controls.maxDistance = 100;
    this.controls.enableRotate = true;

    this.raycaster.setFromCamera(this.pointer, this.camera);

    // Lighting
    {
      this.ambientLight.castShadow = true;
      this.directionalLight.castShadow = true;
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

    // Create Characters
    this.frankie = new Character(
      this.scene,
      this.camera,
      true,
      Math.random() / 2,
      Math.random() * 0.01
    );
    this.characters.push(this.frankie);
    for (let i = 0; i < this.characterCount; i++) {
      const civilian = new Character(this.scene, this.camera, false);
      this.characters.push(civilian);
    }

    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  onPointerMove(event: MouseEvent) {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.stats?.update();
    this.controls?.update();
    if (this.frankieFound) {
      this.frankie.characterMesh.position.y = 7;
    }
    this.characters.map((character) => {
      character.animateCharacter();
      character.lookAt(this.camera.position);
    });
  }

  render() {
    this.raycaster.setFromCamera(this.pointer, this.camera);
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
