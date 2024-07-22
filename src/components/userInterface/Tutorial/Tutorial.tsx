import { FC, useState } from 'react';

interface props {
  gameConstants: {
    name: string;
    sceneBoundary: number;
    characterCount: number;
    groundSprite: string;
    characterSprites: string[];
    frankieSprites: string[];
  }[];
  showTutorial: boolean;
  setShowTutorial: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDifficultyOptions: React.Dispatch<React.SetStateAction<boolean>>;
}

const Tutorial: FC<props> = ({
  gameConstants,
  showTutorial,
  setShowTutorial,
  setShowDifficultyOptions,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const tutorialCards = [
    <div className='ui-card'>
      <p>
        Welcome to Find Frankie! To win the game, all you need to do is find our
        little guy Frankie in the crowd.
      </p>
      <img
        className='frankie-preview'
        src={gameConstants[0].frankieSprites[1]}
        height={'50px'}
        alt='frankie'
      />
    </div>,
    <div className='ui-card'>
      <p>
        Frankie has an extensive wardrobe of snazzy sweaters. Each time you look
        for him he may be dressed differently.
      </p>
    </div>,
  ];

  const handleNext = () => {
    if (currentIndex < tutorialCards.length - 1)
      setCurrentIndex(currentIndex + 1);
  };
  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return showTutorial ? (
    <div className='tutorial-container'>
      {tutorialCards[currentIndex]}

      <div className='ui-card ui-sub-card' onClick={handleBack}>
        Back
      </div>
      <div
        className='ui-card ui-sub-card'
        onClick={() => setShowTutorial(false)}
      >
        Main Menu
      </div>
      <div className='ui-card ui-sub-card' onClick={handleNext}>
        Next
      </div>
    </div>
  ) : (
    <div
      className='ui-title-card'
      onClick={() => {
        setShowTutorial(true);
        setShowDifficultyOptions(false);
      }}
    >
      Tutorial
    </div>
  );
};

export default Tutorial;
