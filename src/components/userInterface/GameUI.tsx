import TitleCard from './TitleCard';
import './GameUI.css';
import Tutorial from './Tutorial';
import GameStart from './GameStart';
import { FC } from 'react';
import Instructions from './Instructions/Instructions';

interface props {
  gameActive?: boolean;
  setGameActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameUI: FC<props> = ({ gameActive, setGameActive }) => {
  return gameActive ? (
    <Instructions />
  ) : (
    <div className='ui-container'>
      <TitleCard />
      <div>
        <GameStart gameActive={gameActive} setGameActive={setGameActive} />
        <Tutorial />
      </div>
    </div>
  );
};
export default GameUI;
