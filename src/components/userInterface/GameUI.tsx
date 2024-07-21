import TitleCard from './TitleCard';
import './GameUI.css';
import Tutorial from './Tutorial';
import GameStart from './GameStart';
import { FC } from 'react';
import Instructions from './Instructions/Instructions';
import WinCard from './WinCard/WinCard';

interface props {
  gameActive: boolean;
  frankieFound: boolean;
  level: { currentLevel: number; lastLevel: number };
  startGame(difficulty: string): void;
  advanceToNextLevel(): void;
  resetGame(): void;
}

const GameUI: FC<props> = ({
  gameActive,
  frankieFound,
  level,
  startGame,
  advanceToNextLevel,
  resetGame,
}) => {
  return (
    <div className='ui-container'>
      {gameActive && <Instructions level={level} />}
      {!gameActive && (
        <>
          <TitleCard />
          <div className='options-container'>
            <GameStart startGame={startGame} />
            <Tutorial />
          </div>
        </>
      )}
      {frankieFound && (
        <WinCard
          level={level}
          advanceToNextLevel={advanceToNextLevel}
          resetGame={resetGame}
        />
      )}
    </div>
  );
};
export default GameUI;
