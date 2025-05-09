import { motion } from 'motion/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { submitGuess } from '../services/submitGuess';
import { QuestionType, ResponseType } from '../types';
import TimeSelect from './TimeInput';
import './spinner.css';

const questions: QuestionType[] = [
  { id: 1, text: 'start-prompt', type: 'text' },
  { id: 2, text: 'time-prompt', type: 'time' },
];

const Survey = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<ResponseType>({});
  const [inputTime, setInputTime] = useState({
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [isNext, setIsNext] = useState(true);

  const handleNext = async () => {
    setIsNext(true);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const isConfirmed = window.confirm(
        'Are you sure you want to submit your guess?',
      );
      if (isConfirmed) {
        const name = responses[1] as string;
        const guessedTimeInMs =
          inputTime.minutes * 60 * 1000 +
          inputTime.seconds * 1000 +
          inputTime.milliseconds;
        try {
          setIsLoading(true);
          await submitGuess(name, guessedTimeInMs);
          setIsLoading(false);
          navigate('/guesses');
        } catch (error) {
          console.error('Failed to submit guess', error);
          alert('Something went wrong. ❌');
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handleBack = () => {
    setIsNext(false);
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };
  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResponses({
      ...responses,
      [questions[currentQuestion].id]: e.target.value,
    });
  };

  const handleTimeInputChange = (
    field: string,
    value: number,
    maxValue: number,
  ) => {
    let ans = 0;
    if (value <= maxValue) {
      ans = value;
    } else {
      ans = maxValue; // Clamp to 59
    }
    setInputTime((prev) => ({
      ...prev,
      [field]: ans,
    }));
  };

  const renderInput = () => {
    const question = questions[currentQuestion];

    if (question.type === 'text') {
      return (
        <input
          type="text"
          value={responses[question.id] || ''}
          onChange={handleNameInputChange}
        />
      );
    }

    if (question.type === 'time') {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>
            <TimeSelect
              inputTime={inputTime.minutes}
              maxValue={59}
              inputTimeField={'minutes'}
              handleTimeInputChange={handleTimeInputChange}
            />
          </div>
          <div>
            <TimeSelect
              inputTime={inputTime.seconds}
              inputTimeField={'seconds'}
              maxValue={59}
              handleTimeInputChange={handleTimeInputChange}
            />
          </div>
          <div>
            <TimeSelect
              inputTime={inputTime.milliseconds}
              inputTimeField={'milliseconds'}
              maxValue={999}
              handleTimeInputChange={handleTimeInputChange}
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--container-padding)',
      }}
    >
      {isLoading ? (
        <div aria-busy="true" className="modal-loading">
          <span className="loader" />
          <span style={{ color: 'white' }}>Submitting...</span>
        </div>
      ) : null}
      <motion.div
        key={currentQuestion} // Ensures animation runs when content changes
        initial={{ opacity: 0, x: isNext ? 100 : -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: isNext ? -100 : 100 }}
        transition={{ duration: 0.3 }}
      >
        <h2>{t(questions[currentQuestion].text)}</h2>
        {renderInput()}
      </motion.div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--container-padding)',
        }}
      >
        <button
          className="back-button"
          onClick={handleBack}
          disabled={currentQuestion === 0}
        >
          BACK
        </button>
        <button className="selection-button" onClick={handleNext}>
          {currentQuestion < questions.length - 1 ? 'NEXT' : t('SUBMIT')}
        </button>
      </div>
    </div>
  );
};

export default Survey;
