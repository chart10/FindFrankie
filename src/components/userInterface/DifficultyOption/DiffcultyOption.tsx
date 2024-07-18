import { FC } from 'react';

interface props {
  difficulty: string;
  startGame(difficulty: string): void;
}

const DiffcultyOption: FC<props> = ({ difficulty, startGame }) => {
  return (
    <div
      className='ui-card ui-sub-card'
      onClick={() => {
        startGame(difficulty);
      }}
    >
      {difficulty}
    </div>
  );
};
export default DiffcultyOption;
