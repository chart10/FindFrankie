import * as THREE from 'three';
export default class Raycaster {
  raycaster: THREE.Raycaster;
  scene: THREE.Scene;
  camera: THREE.Camera;
  loader: THREE.TextureLoader;

  constructor(scene: THREE.Scene, camera: THREE.Camera) {
    this.scene = scene;
    this.camera = camera;
    this.raycaster = new THREE.Raycaster();
    this.loader = new THREE.TextureLoader();
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

    if (selectedObject.name === 'Frankie') {
      {
        const foundFrankieTexture = this.loader.load(
          'ff-polka_green-cheer2.png'
        );
        foundFrankieTexture.colorSpace = THREE.SRGBColorSpace;
        foundFrankieTexture.magFilter = THREE.NearestFilter;
        selectedObject.material.map = foundFrankieTexture;
      }
      selectedObject.scale.set(2, 2, 2);
      selectedObject.position.y = 4;
    } else {
      selectedObject.material.color.set(0xf72585);
      setTimeout(() => {
        selectedObject.material.color.set(0xffffff);
      }, 1000);
    }

    // }
  }
}
