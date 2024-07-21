import './Instructions.css';
import { frankieSprites } from '../../../library/GameConstants';

interface props {
  level: { currentLevel: number; lastLevel: number };
}

const Instructions: React.FC<props> = ({ level }) => {
  return (
    <>
      <div className='instructions-container'>
        <div className='ui-card ui-sub-card' id='level-counter'>
          <p>LV {level.currentLevel + 1}</p>
        </div>
        <div id='instructions' className='ui-title-card instructions-main'>
          <div className='instructions-text'>
            <p>Click on Frankie in the crowd below!</p>
            <p>Frankie's sweater looks like this:</p>
          </div>
          <img
            className='frankie-preview'
            src={frankieSprites[2]}
            height={'50px'}
            alt='frankie'
          />
        </div>
        <div className='ui-card ui-sub-card' id='back-button'>
          <p>Back</p>
        </div>
      </div>
      <div className='controls-container'>
        <div className='ui-card ui-sub-card controls-card'>
          <p>Click and drag to rock their world!</p>
        </div>
        <div className='ui-card ui-sub-card controls-card'>
          <p>Scroll to zoom in and out!</p>
        </div>
      </div>
    </>
  );
};
export default Instructions;
