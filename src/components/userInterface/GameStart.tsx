import { FC } from 'react';

interface props {
  gameActive?: boolean;
  setGameActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameStart: FC<props> = ({ setGameActive }) => {
  return (
    <div
      className='ui-title-card'
      onClick={() => {
        setGameActive(true);
      }}
    >
      Start Game!
    </div>
  );
};
export default GameStart;
