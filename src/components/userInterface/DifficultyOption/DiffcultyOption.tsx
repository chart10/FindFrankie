import { FC } from 'react';
import { difficultyColors } from '../../../library/GameConstants';

interface props {
  difficulty: string;
  startGame(difficulty: string): void;
}

const DiffcultyOption: FC<props> = ({ difficulty, startGame }) => {
  const color =
    {
      Easy: difficultyColors.easy,
      Medium: difficultyColors.medium,
      Hard: difficultyColors.hard,
    }[difficulty] || difficultyColors.easy;
  return (
    <div
      className='ui-card ui-sub-card'
      onClick={() => {
        startGame(difficulty);
      }}
      style={{ background: `${color}` }}
    >
      {difficulty}
    </div>
  );
};
export default DiffcultyOption;
