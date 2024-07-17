import { FC } from 'react';
import GameManager from '../../library/GameManager';

interface props {
  currentGame: GameManager;
  setGameActive: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentGame: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameStart: FC<props> = ({
  currentGame,
  setGameActive,
  setCurrentGame,
}) => {
  return (
    <div
      className='ui-title-card'
      onClick={() => {
        setGameActive(true);
        currentGame.startGame();
      }}
    >
      Start Game!
    </div>
  );
};
export default GameStart;
