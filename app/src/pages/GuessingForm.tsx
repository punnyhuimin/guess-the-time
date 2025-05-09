import React from 'react';
import '../App.css';
import Language from '../guessingForm/Language';
import Survey from '../guessingForm/Survey';
import Title from '../guessingForm/Title';

const GuessingForm: React.FC = () => {
  return (
    <div className="container" style={{ minWidth: '100%' }}>
      <div
        style={{
          display: 'flex',
          paddingTop: '32px',
          justifyContent: 'flex-end',
        }}
      >
        <Language />
      </div>
      <div style={{ paddingTop: '16px' }}>
        <Title />
      </div>
      <Survey />
    </div>
  );
};

export default GuessingForm;
