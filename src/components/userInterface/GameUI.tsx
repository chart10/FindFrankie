import TitleCard from './TitleCard';
import './GameUI.css';
import Tutorial from './Tutorial';
import GameStart from './GameStart';
import { FC } from 'react';
import Instructions from './Instructions/Instructions';
import GameManager from '../../library/GameManager';

interface props {
  gameActive: boolean;
  currentGame: GameManager | object;
  setCurrentGame: React.Dispatch<React.SetStateAction<boolean>>;
  setGameActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameUI: FC<props> = ({
  gameActive,
  currentGame,
  setGameActive,
  setCurrentGame,
}) => {
  return gameActive ? (
    <Instructions />
  ) : (
    <div className='ui-container'>
      <TitleCard />
      <div>
        <GameStart
          currentGame={currentGame}
          setGameActive={setGameActive}
          setCurrentGame={setCurrentGame}
        />
        <Tutorial />
      </div>
    </div>
  );
};
export default GameUI;
