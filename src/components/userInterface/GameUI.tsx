import TitleCard from './TitleCard';
import './GameUI.css';
import Tutorial from './Tutorial';
import GameStart from './GameStart';
import { FC } from 'react';
import Instructions from './Instructions/Instructions';
import WinCard from './WinCard';

interface props {
  gameActive: boolean;
  frankieFound: boolean;
  startGame(difficulty: string): void;
}

const GameUI: FC<props> = ({ gameActive, frankieFound, startGame }) => {
  return (
    <div className='ui-container'>
      {gameActive && <Instructions />}
      {!gameActive && (
        <>
          <TitleCard />
          <div className='options-container'>
            <GameStart startGame={startGame} />
            <Tutorial />
          </div>
        </>
      )}
      {frankieFound && <WinCard />}
    </div>
  );
};
export default GameUI;
