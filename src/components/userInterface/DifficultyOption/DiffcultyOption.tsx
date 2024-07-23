import { FC } from 'react';
import { difficultyColors } from '../../../library/GameConstants';

interface props {
  difficulty: string;
  startGame(difficulty: string): void;
}

const DiffcultyOption: FC<props> = ({ difficulty, startGame }) => {
  let color;
  switch (difficulty) {
    case 'Easy':
      color = difficultyColors.easy;
      break;
    case 'Medium':
      color = difficultyColors.medium;
      break;
    case 'Hard':
      color = difficultyColors.hard;
      break;
  }
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
