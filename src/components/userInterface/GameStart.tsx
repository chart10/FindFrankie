import { FC } from 'react';

interface props {
  gameActive?: boolean;
  setGameActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameStart: FC<props> = ({ gameActive, setGameActive }) => {
  return (
    <div
      className='ui-title-card'
      onClick={() => {
        setGameActive(true);
        console.log('Game set to play: ' + gameActive);
      }}
    >
      GameStart
    </div>
  );
};
export default GameStart;
