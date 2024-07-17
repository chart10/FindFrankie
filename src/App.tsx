import { useState } from 'react';
import './App.css';
import GameCanvas from './components/GameCanvas';
import GameUI from './components/userInterface/GameUI';

function App() {
  const [gameActive, setGameActive] = useState(false);

  return (
    <>
      <GameCanvas gameActive={gameActive} />
      <GameUI gameActive={gameActive} setGameActive={setGameActive} />
    </>
  );
}

export default App;
