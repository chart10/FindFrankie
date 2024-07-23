import TitleCard from './TitleCard';
import './GameUI.css';
import Tutorial from './Tutorial/Tutorial';
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
    name: string;
    sceneBoundary: number;
    characterCount: number;
    groundSprite: string;
    characterSprites: string[];
    frankieSprites: string[];
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
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <div className='ui-container'>
      {gameActive && (
        <Instructions
          level={level}
          gameConstants={gameConstants}
          resetGame={resetGame}
        />
      )}
      {!gameActive && (
        <>
          <TitleCard />
          <div className='options-container'>
            {!showTutorial && (
              <>
                <GameStart
                  startGame={startGame}
                  showDifficultyOptions={showDifficultyOptions}
                  setShowDifficultyOptions={setShowDifficultyOptions}
                />
                <div
                  className='ui-title-card'
                  onClick={() => {
                    setShowTutorial(true);
                    setShowDifficultyOptions(false);
                  }}
                >
                  Tutorial
                </div>
              </>
            )}
          </div>
          <Tutorial
            showTutorial={showTutorial}
            setShowTutorial={setShowTutorial}
            setShowDifficultyOptions={setShowDifficultyOptions}
          />
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
          gameConstants={gameConstants}
          advanceToNextLevel={advanceToNextLevel}
          resetGame={resetGame}
        />
      )}
    </div>
  );
};
export default GameUI;
