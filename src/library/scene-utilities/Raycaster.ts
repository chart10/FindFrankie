import * as THREE from 'three';
export default class Raycaster {
  raycaster: THREE.Raycaster;
  scene: THREE.Scene;
  camera: THREE.Camera;
  loader: THREE.TextureLoader;
  // frankieFound: boolean;
  gameStates: { frankieFound: boolean };

  constructor(
    scene: THREE.Scene,
    camera: THREE.Camera,
    gameStates: { frankieFound: boolean }
  ) {
    this.scene = scene;
    this.camera = camera;
    this.raycaster = new THREE.Raycaster();
    this.loader = new THREE.TextureLoader();
    this.gameStates = gameStates;
  }

  onClickGame(event: MouseEvent) {
    const mouseCoordinates = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    this.raycaster.setFromCamera(mouseCoordinates, this.camera);

    const intersections = this.raycaster.intersectObjects(
      this.scene.children,
      true
    );
    const selectedObject = intersections[0].object;
    console.log(selectedObject.name);

    if (selectedObject.name === 'Frankie' && !this.gameStates.frankieFound) {
      this.gameStates.frankieFound = true;
      {
        const foundFrankieTexture = this.loader.load(
          'characterSprites/ff-polka_green-cheer2.png'
        );
        foundFrankieTexture.colorSpace = THREE.SRGBColorSpace;
        foundFrankieTexture.magFilter = THREE.NearestFilter;
        selectedObject.material.map = foundFrankieTexture;
      }
    } else if (selectedObject.name.startsWith('Civilian')) {
      selectedObject.material.color.set(0xf72585);
      setTimeout(() => {
        selectedObject.material.color.set(0xffffff);
      }, 1000);
    }
  }
}
