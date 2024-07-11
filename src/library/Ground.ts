import * as THREE from 'three';

export default class Ground {
  mesh: THREE.Mesh;

  constructor(size: number) {
    const loader = new THREE.TextureLoader();
    const groundTexture = loader.load(
      'https://threejs.org/manual/examples/resources/images/checker.png'
    );
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.magFilter = THREE.NearestFilter;
    groundTexture.colorSpace = THREE.SRGBColorSpace;
    const repeats = size / 4;
    groundTexture.repeat.set(repeats, repeats);
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = new THREE.MeshPhongMaterial({
      map: groundTexture,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.rotation.x = Math.PI * -0.5;
  }
}
