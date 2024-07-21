import { useEffect, useState } from 'react';
import './App.css';
import GameCanvas from './components/GameCanvas';
import GameUI from './components/userInterface/GameUI';
import GameManager from './library/GameManager';

const App: React.FC = () => {
  const [gameActive, setGameActive] = useState(false);
  const [frankieFound, setFrankieFound] = useState(false);
  const [level, setLevel] = useState({ currentLevel: 0, lastLevel: 0 });
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
      setLevel(event.detail);
    };

    const handleFrankieFound = (event: CustomEvent) => {
      setFrankieFound(event.detail);
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
    gameManager?.setCurrentLevel(0);
    gameManager?.setGameActive(true);
  };

  const advanceToNextLevel = () => {
    gameManager?.setCurrentLevel(level.currentLevel + 1);
    gameManager?.setFrankieFound(false);
    gameManager?.setGameActive(true);
  };

  const resetGame = () => {
    gameManager?.setDifficulty('Default');
    gameManager?.setCurrentLevel(0);
    gameManager?.setFrankieFound(false);
    gameManager?.setGameActive(false);
  };

  return (
    <>
      <GameCanvas gameActive={gameActive} />
      <GameUI
        gameActive={gameActive}
        frankieFound={frankieFound}
        level={level}
        startGame={startGame}
        resetGame={resetGame}
        advanceToNextLevel={advanceToNextLevel}
      />
    </>
  );
};

export default App;
