import { FC, useState } from 'react';
import DiffcultyOption from './DifficultyOption/DiffcultyOption';

interface props {
  startGame(difficulty: string): void;
}

const GameStart: FC<props> = ({ startGame }) => {
  const [showDifficultyOptions, setShowDifficultyOptions] = useState(false);
  return (
    <div className='game-start-container'>
      <div
        className='ui-title-card'
        onClick={() => {
          // setGameActive(true);
          // currentGame.setGameActive(true);
          setShowDifficultyOptions(!showDifficultyOptions);
        }}
      >
        Start Game!
      </div>
      {showDifficultyOptions && (
        <div>
          <DiffcultyOption difficulty='Easy' startGame={startGame} />
        </div>
      )}
    </div>
  );
};
export default GameStart;
