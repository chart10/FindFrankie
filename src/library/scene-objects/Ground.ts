import * as THREE from 'three';

export default class Ground {
  mesh: THREE.Mesh;
  loader: THREE.TextureLoader;

  constructor(size: number, groundSprite: string) {
    this.loader = new THREE.TextureLoader();
    const groundTexture = this.loader.load(
      // 'https://threejs.org/manual/examples/resources/images/checker.png'
      // 'ground.png'
      groundSprite
    );
    // groundTexture.wrapS = THREE.RepeatWrapping;
    // groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.magFilter = THREE.NearestFilter;
    groundTexture.colorSpace = THREE.SRGBColorSpace;
    // const repeats = size / 4;
    // groundTexture.repeat.set(repeats, repeats);
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = new THREE.MeshBasicMaterial({
      map: groundTexture,
      alphaTest: 0.5,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.rotation.x = Math.PI * -0.5;
  }
}
