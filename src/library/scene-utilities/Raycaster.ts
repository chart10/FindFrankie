import * as THREE from 'three';
import GameManager from '../GameManager';

export default class Raycaster {
  raycaster: THREE.Raycaster;
  loader: THREE.TextureLoader;
  gameManager: GameManager;

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
    this.raycaster = new THREE.Raycaster();
    this.loader = new THREE.TextureLoader();
  }

  onClickGame(event: MouseEvent) {
    if (!this.gameManager.isGameActive() || this.gameManager.isFrankieFound()) {
      return;
    }
    const mouseCoordinates = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    this.raycaster.setFromCamera(mouseCoordinates, this.gameManager.camera);

    const intersections = this.raycaster.intersectObjects(
      this.gameManager.scene.children,
      true
    );
    if (intersections.length > 0) {
      const selectedObject = intersections[0].object;

      if (
        selectedObject.name === 'Frankie' &&
        !this.gameManager.isFrankieFound()
      ) {
        this.gameManager.setFrankieFound(true);
        this.gameManager.setGameActive(false);
        {
          const frankieSprite =
            this.gameManager.stage[this.gameManager.currentLevel]
              .frankieSprites[1];
          const cheerTexture = this.loader.load(frankieSprite);
          cheerTexture.colorSpace = THREE.SRGBColorSpace;
          cheerTexture.magFilter = THREE.NearestFilter;
          // @ts-expect-error (selectObject.materials exists)
          selectedObject.material.map = cheerTexture;
        }
      } else if (selectedObject.name.startsWith('Civilian')) {
        // @ts-expect-error (selectObject.materials exists)
        selectedObject.material.color.set(0xf72585);
        setTimeout(() => {
          // @ts-expect-error (selectObject.materials exists)
          selectedObject.material.color.set(0xffffff);
        }, 1000);
      }
    }
  }
}
