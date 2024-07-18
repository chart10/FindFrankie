import './Instructions.css';
import { frankieSprites } from '../../../library/GameConstants';

const Instructions = () => {
  return (
    <div className='instructions-container'>
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
      {/* <div className='ui-card ui-sub-card instructions-sub'>
        <p>Click and drag to rock their world!</p>
        <p>Scoll to zoom in and out!</p>
      </div> */}
    </div>
  );
};
export default Instructions;
