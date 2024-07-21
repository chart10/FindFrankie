import './WinCard.css';

interface props {
  level: { currentLevel: number; lastLevel: number };
  advanceToNextLevel(): void;
  resetGame(): void;
}

const WinCard: React.FC<props> = ({ level, advanceToNextLevel, resetGame }) => {
  console.log(level.currentLevel);
  console.log(level.lastLevel);

  return (
    <div className='win-container'>
      <div className='ui-title-card game-title'>
        <h1>
          <span className='letter'>Y</span>
          <span className='letter'>o</span>
          <span className='letter'>u</span>
          &nbsp;
          <span className='letter'>F</span>
          <span className='letter'>o</span>
          <span className='letter'>u</span>
          <span className='letter'>n</span>
          <span className='letter'>d</span>
          &nbsp;
          <span className='letter'>F</span>
          <span className='letter'>r</span>
          <span className='letter'>a</span>
          <span className='letter'>n</span>
          <span className='letter'>k</span>
          <span className='letter'>i</span>
          <span className='letter'>e</span>
        </h1>
      </div>
      {level.currentLevel == level.lastLevel ? (
        <>
          <div className='ui-card ui-sub-card'>
            <p>You beat Easy Mode!</p>
          </div>
          <div className='ui-card ui-sub-card' onClick={resetGame}>
            <p>Main Menu</p>
          </div>
        </>
      ) : (
        <div className='ui-card ui-sub-card' onClick={advanceToNextLevel}>
          <p>Next Level</p>
        </div>
      )}
    </div>
  );
};
export default WinCard;
