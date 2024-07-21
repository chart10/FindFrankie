import { useEffect, useState } from 'react';
import './App.css';
import GameCanvas from './components/GameCanvas';
import GameUI from './components/userInterface/GameUI';
import GameManager from './library/GameManager';

const App: React.FC = () => {
  const [gameActive, setGameActive] = useState(false);
  const [frankieFound, setFrankieFound] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameManager, setGameManager] = useState<GameManager | null>(null);

  useEffect(() => {
    const canvas = document.getElementById('threeJsCanvas');
    if (!canvas) return;
    const manager = new GameManager(canvas);
    manager.initialize();
    manager.animate();

    const handleGameActive = (event: CustomEvent) => {
      setGameActive(event.detail);
    };

    const handleUpdateLevel = (event: CustomEvent) => {
      setCurrentLevel(event.detail);
    };

    const handleFrankieFound = (event: CustomEvent) => {
      setFrankieFound(event.detail);
      console.log('Frankie Found Frontend');
    };

    manager?.addEventListener('gameActive', handleGameActive as EventListener);
    manager?.addEventListener(
      'currentLevel',
      handleUpdateLevel as EventListener
    );
    manager?.addEventListener(
      'frankieFound',
      handleFrankieFound as EventListener
    );
    setGameManager(manager);

    // Clean up event listeners on unmount
    return () => {
      manager?.removeEventListener(
        'gameActive',
        handleGameActive as EventListener
      );
      manager?.removeEventListener(
        'frankieFound',
        handleFrankieFound as EventListener
      );
      setGameManager(manager);
    };
  }, []);

  const startGame = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    gameManager?.setDifficulty(difficulty);
    setGameActive(true);
  };

  const advanceToNextLevel = () => {
    gameManager?.setCurrentLevel(currentLevel + 1);
    gameManager?.setFrankieFound(false);
    gameManager?.setGameActive(true);
  };

  return (
    <>
      <GameCanvas gameActive={gameActive} />
      <GameUI
        gameActive={gameActive}
        frankieFound={frankieFound}
        currentLevel={currentLevel}
        startGame={startGame}
        advanceToNextLevel={advanceToNextLevel}
      />
    </>
  );
};

export default App;
