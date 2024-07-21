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
  currentLevel: number;
  startGame(difficulty: string): void;
  advanceToNextLevel(): void;
}

const GameUI: FC<props> = ({
  gameActive,
  frankieFound,
  currentLevel,
  startGame,
  advanceToNextLevel,
}) => {
  return (
    <div className='ui-container'>
      {gameActive && <Instructions currentLevel={currentLevel} />}
      {!gameActive && (
        <>
          <TitleCard />
          <div className='options-container'>
            <GameStart startGame={startGame} />
            <Tutorial />
          </div>
        </>
      )}
      {frankieFound && <WinCard advanceToNextLevel={advanceToNextLevel} />}
    </div>
  );
};
export default GameUI;
