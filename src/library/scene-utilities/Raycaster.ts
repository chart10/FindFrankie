import * as THREE from 'three';

export default class Raycaster {
  raycaster: THREE.Raycaster;
  pointer: THREE.Vector2;
  scene: THREE.Scene;

  constructor(scene: THREE.Scene, camera: THREE.Camera) {
    this.scene = scene;
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.raycaster.setFromCamera(this.pointer, camera);
  }

  onClickGame(event: MouseEvent) {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    console.log(this.pointer);

    // this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(
      this.scene.children,
      false
    );
    // const frankieMesh = this.frankie.material;
    // frankieMesh.map.needsUpdate = true;
    // const intersectedMesh = intersects[0].object;
    // if (intersectedMesh == this.frankie.characterMesh) {
    //   this.frankieFound = true;
    //   const texture = this.loader.load(frankieSprite);
    //   texture.colorSpace = THREE.SRGBColorSpace;
    //   texture.magFilter = THREE.NearestFilter;
    //   intersects[0].object.material.map = texture;
    // } else {
    intersects[0].object.material.color.set(0xf72585);
    setTimeout(() => {
      intersects[0].object.material.color.set(0xffffff);
    }, 1000);
    // }
  }
}
