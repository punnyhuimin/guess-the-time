import React from 'react';
import '../App.css';
import Language from '../guessingForm/Language';
import Survey from '../guessingForm/Survey';
import Title from '../guessingForm/Title';

const GuessingForm: React.FC = () => {
  return (
    <div className="container">
      <Language />
      <div
        style={{
          height: '100%',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 'calc(2 * var(--container-padding))',
          gap: 'calc(4 * var(--container-padding))',
        }}
      >
        <Title />
        <Survey />
      </div>
    </div>
  );
};

export default GuessingForm;
