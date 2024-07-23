import { FC } from 'react';

interface props {
  startGame(difficulty: string): void;
  showDifficultyOptions: boolean;
  setShowDifficultyOptions: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameStart: FC<props> = ({ setShowDifficultyOptions }) => {
  return (
    <div className='game-start-container'>
      <div
        className='ui-title-card'
        onClick={() => {
          // setGameActive(true);
          // currentGame.setGameActive(true);
          setShowDifficultyOptions(true);
        }}
      >
        Start Game!
      </div>
    </div>
  );
};
export default GameStart;
