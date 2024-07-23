import { FC, useState } from 'react';
import './Tutorial.css';
import { tutorialImages } from '../../../library/GameConstants';

interface props {
  showTutorial: boolean;
  setShowTutorial: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDifficultyOptions: React.Dispatch<React.SetStateAction<boolean>>;
}

const Tutorial: FC<props> = ({ showTutorial, setShowTutorial }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const tutorialCards = [
    <div className='ui-card tutorial-card' id='tutorial-card0'>
      <p>
        Welcome to Find Frankie! To win the game, all you need to do is find our
        little guy Frankie in the crowd.
      </p>
      <img
        className='tutorial-frankie'
        src={tutorialImages[0]}
        height={'50px'}
        alt='frankie'
      />
    </div>,
    <div className='ui-card tutorial-card' id='tutorial-card1'>
      <p>
        Frankie has an extensive wardrobe of snazzy sweaters. Each time you look
        for him he may be dressed differently.
      </p>
      <div>
        <img
          className='tutorial-frankie'
          src={tutorialImages[0]}
          height={'50px'}
          alt='green frankie'
        />
        <img
          className='tutorial-frankie'
          src={tutorialImages[1]}
          height={'50px'}
          alt='violet frankie'
        />
        <img
          className='tutorial-frankie'
          src={tutorialImages[2]}
          height={'50px'}
          alt='red frankie'
        />
        <img
          className='tutorial-frankie'
          src={tutorialImages[3]}
          height={'50px'}
          alt='blue frankie'
        />
      </div>
    </div>,
    <div className='ui-card tutorial-card' id='tutorial-card2'>
      <p>
        Above the crowd you'll see a preview of Frankie's drip. Use that tip to
        find him.
      </p>
      <img
        className='tutorial-frankie'
        src={tutorialImages[4]}
        height={'50px'}
        alt='green sweater'
      />
    </div>,
    <div className='ui-card tutorial-card'>
      <p>Try to beat all modes! Good Luck!!!</p>
    </div>,
  ];

  const handleNext = () => {
    if (currentIndex < tutorialCards.length - 1)
      setCurrentIndex(currentIndex + 1);
  };
  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    showTutorial && (
      <>
        <div className='tutorial-container'>{tutorialCards[currentIndex]}</div>
        <div className='sub-options-container'>
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
      </>
    )
  );
};
export default Tutorial;
