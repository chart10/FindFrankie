import TitleCard from './TitleCard';
import './GameUI.css';
import Tutorial from './Tutorial';
import GameStart from './GameStart';
import { FC } from 'react';
import Instructions from './Instructions/Instructions';

interface props {
  gameActive: boolean;
  startGame(difficulty: string): void;
}

const GameUI: FC<props> = ({ gameActive, startGame }) => {
  return gameActive ? (
    <Instructions />
  ) : (
    <div className='ui-container'>
      <TitleCard />
      <div className='options-container'>
        <GameStart startGame={startGame} />
        <Tutorial />
      </div>
    </div>
  );
};
export default GameUI;
