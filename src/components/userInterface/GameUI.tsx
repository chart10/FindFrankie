import TitleCard from './TitleCard';
import './GameUI.css';
import Tutorial from './Tutorial';
import GameStart from './GameStart';

const GameUI = () => {
  return (
    <div className='ui-container'>
      <TitleCard />
      <div>
        <GameStart />
        <Tutorial />
      </div>
    </div>
  );
};
export default GameUI;
