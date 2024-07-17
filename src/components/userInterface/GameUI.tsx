import TitleCard from './TitleCard';
import './GameUI.css';
import Tutorial from './Tutorial';
import GameStart from './GameStart';
import { FC } from 'react';

interface props {
  gameActive?: boolean;
  setGameActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameUI: FC<props> = ({ gameActive, setGameActive }) => {
  return (
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
