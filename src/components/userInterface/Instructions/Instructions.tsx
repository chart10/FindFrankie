import './Instructions.css';

interface props {
  level: { currentLevel: number; lastLevel: number };
  gameConstants: {
    name: string;
    sceneBoundary: number;
    characterCount: number;
    groundSprite: string;
    characterSprites: string[];
    frankieSprites: string[];
  }[];
  resetGame(): void;
}

const Instructions: React.FC<props> = ({ level, gameConstants, resetGame }) => {
  return (
    <>
      <div className='ui-card ui-sub-card' id='level-counter'>
        <p>LV {level.currentLevel + 1}</p>
      </div>
      <div className='instructions-container'>
        <div id='instructions' className='ui-title-card instructions-main'>
          <div className='instructions-text'>
            <p>Click on Frankie in the crowd below!</p>
            <p>Frankie's sweater looks like this:</p>
          </div>
          <img
            className='frankie-preview'
            src={gameConstants[level.currentLevel].frankieSprites[2]}
            height={'50px'}
            alt='frankie'
          />
        </div>
      </div>
      <div className='ui-card ui-sub-card' id='back-button' onClick={resetGame}>
        <p>Back</p>
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
