import TitleCard from './TitleCard';
import './GameUI.css';
import Tutorial from './Tutorial';
import GameStart from './GameStart';
import { FC, useState } from 'react';
import Instructions from './Instructions/Instructions';
import WinCard from './WinCard/WinCard';
import DiffcultyOption from './DifficultyOption/DiffcultyOption';

interface props {
  gameActive: boolean;
  frankieFound: boolean;
  level: { currentLevel: number; lastLevel: number };
  gameConstants: {
    sceneBoundary: number;
    characterCount: number;
    groundSprite: string;
    characterSprites: string[];
    frankieSprites: string[];
    cheerSprite: string;
  }[];
  startGame(difficulty: string): void;
  resetGame(): void;
  advanceToNextLevel(): void;
}

const GameUI: FC<props> = ({
  gameActive,
  frankieFound,
  level,
  gameConstants,
  startGame,
  resetGame,
  advanceToNextLevel,
}) => {
  const [showDifficultyOptions, setShowDifficultyOptions] = useState(false);

  return (
    <div className='ui-container'>
      {gameActive && (
        <Instructions level={level} gameConstants={gameConstants} />
      )}
      {!gameActive && (
        <>
          <TitleCard />
          <div className='options-container'>
            <GameStart
              startGame={startGame}
              showDifficultyOptions={showDifficultyOptions}
              setShowDifficultyOptions={setShowDifficultyOptions}
            />
            <Tutorial />
          </div>
          {showDifficultyOptions && (
            <div className='difficulty-options-container'>
              <DiffcultyOption difficulty='Easy' startGame={startGame} />
              <DiffcultyOption difficulty='Medium' startGame={startGame} />
              <DiffcultyOption difficulty='Hard' startGame={startGame} />
            </div>
          )}
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
