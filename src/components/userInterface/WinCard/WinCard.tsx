import './WinCard.css';

interface props {
  level: { currentLevel: number; lastLevel: number };
  gameConstants: {
    name: string;
    color: string;
    nextMode: string;
    nextModeColor: string;
    levels: {
      sceneBoundary: number;
      characterCount: number;
      groundSprite: string;
      characterSprites: string[];
      frankieSprites: string[];
    }[];
  };
  advanceToNextLevel(): void;
  resetGame(): void;
  startGame(difficulty: string): void;
}

const WinCard: React.FC<props> = ({
  level,
  gameConstants,
  advanceToNextLevel,
  resetGame,
  startGame,
}) => {
  return (
    <div className='win-container'>
      <div className='win-title-container'>
        <div className='ui-title-card game-title' id='win-title'>
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
            <span className='letter'>!</span>
          </h1>
        </div>
        {level.currentLevel === level.lastLevel && (
          <div
            className='ui-card ui-sub-card'
            id='congrats'
            style={{ background: `${gameConstants.color}` }}
          >
            <p>You beat {gameConstants.name} Mode!</p>
          </div>
        )}
      </div>
      <div className='win-card-options-container'>
        {level.currentLevel === level.lastLevel ? (
          <>
            <div
              className='ui-card ui-sub-card'
              onClick={() => startGame('Medium')}
              style={{ background: `${gameConstants.nextModeColor}` }}
            >
              <p>Try {gameConstants.nextMode} Mode</p>
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
    </div>
  );
};
export default WinCard;
