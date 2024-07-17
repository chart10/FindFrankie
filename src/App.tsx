import { useEffect, useState } from 'react';
import './App.css';
import GameCanvas from './components/GameCanvas';
import GameUI from './components/userInterface/GameUI';
import GameManager from './library/GameManager';

function App() {
  const [gameActive, setGameActive] = useState(false);
  const [currentGame, setCurrentGame] = useState({});

  console.log(currentGame);

  useEffect(() => {
    const gameManager = new GameManager(
      document.getElementById('threeJsCanvas')!
    );
    gameManager.initialize();
    gameManager.animate();
    setCurrentGame(gameManager);
  }, []);
  return (
    <>
      <GameCanvas gameActive={gameActive} />
      <GameUI gameActive={gameActive} setGameActive={setGameActive} />
    </>
  );
}

export default App;
