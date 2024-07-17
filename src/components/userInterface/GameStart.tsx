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
      GameStart
    </div>
  );
};
export default GameStart;
