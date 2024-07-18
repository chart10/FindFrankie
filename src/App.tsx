import { useEffect, useState } from 'react';
import './App.css';
import GameCanvas from './components/GameCanvas';
import GameUI from './components/userInterface/GameUI';
import GameManager from './library/GameManager';

function App() {
  const [gameActive, setGameActive] = useState(false);
  const [gameManager, setGameManager] = useState<GameManager | null>(null);

  useEffect(() => {
    const canvas = document.getElementById('threeJsCanvas');
    if (!canvas) return;
    const manager = new GameManager(canvas);
    manager.initialize();
    manager.animate();
    setGameManager(manager);
  }, []);

  const startGame = (difficulty: string) => {
    if (gameManager) {
      gameManager.setGameActive(true);
      setGameActive(true);
      console.log(gameManager.setGameActive);
      console.log(difficulty);
    }
  };
  return (
    <>
      <GameCanvas gameActive={gameActive} />
      <GameUI gameActive={gameActive} startGame={startGame} />
    </>
  );
}

export default App;
