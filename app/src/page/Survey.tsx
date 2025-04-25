import { motion } from 'motion/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { submitGuess } from '../api';
interface QuestionType {
  id: number;
  text: string;
  type: string;
}

interface ResponseType {
  [key: number]: string | number;
}

const questions: QuestionType[] = [
  { id: 1, text: 'start-prompt', type: 'text' },
  { id: 2, text: 'nicole-time', type: 'time' },
  { id: 3, text: 'ansel-time', type: 'time' },
];

const Survey = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<ResponseType>({});
  const [times, setTimes] = useState({
    nicole: { minutes: 0, seconds: 0 },
    ansel: { minutes: 0, seconds: 0 },
  });

  const { t } = useTranslation();
  const [isNext, setIsNext] = useState(true);

  const handleNext = async () => {
    setIsNext(true);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      console.log('Survey Complete:', responses);
      const name = responses[1] as string;
      const timeN = times.nicole.minutes * 60 + times.nicole.seconds;
      const timeA = times.ansel.minutes * 60 + times.ansel.seconds;

      try {
        await submitGuess(name, timeA, timeN);
        alert('Submitted! 🎉');
      } catch (error) {
        console.error('Failed to submit guess', error);
        alert('Something went wrong. ❌');
      }
    }
  };

  const handleBack = () => {
    setIsNext(false);
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResponses({
      ...responses,
      [questions[currentQuestion].id]: e.target.value,
    });
  };

  const handleMinuteChange = (person: 'nicole' | 'ansel', value: number) => {
    setTimes((prev) => ({
      ...prev,
      [person]: {
        ...prev[person],
        minutes: value,
      },
    }));
    console.log(times);
  };

  const handleSecondChange = (person: 'nicole' | 'ansel', value: number) => {
    setTimes((prev) => ({
      ...prev,
      [person]: {
        ...prev[person],
        seconds: value,
      },
    }));
    console.log(times);
  };

  const renderInput = () => {
    const question = questions[currentQuestion];

    if (question.type === 'text') {
      return (
        <input
          type="text"
          value={responses[question.id] || ''}
          onChange={handleInputChange}
        />
      );
    }

    if (question.id === 2 || question.id === 3) {
      const personKey = question.id === 2 ? 'nicole' : 'ansel';

      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <label style={{ fontSize: '24px' }}>
            Minutes:
            <select
              key={times[personKey].minutes}
              value={times[personKey].minutes}
              onChange={(e) =>
                handleMinuteChange(personKey, Number(e.target.value))
              }
              style={{
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                backgroundColor: 'var(--button-color)',
                color: 'white',
                padding: '4px 4px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '14px',
                cursor: 'pointer',
                height: '24px',
                width: '48px',
                position: 'relative',
                backgroundImage:
                  "url(\"data:image/svg+xml;charset=UTF-8,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23333' stroke-width='2' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E\")",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 10px center',
                backgroundSize: '10px',
              }}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </label>
          <label style={{ fontSize: '24px' }}>
            Seconds:
            <select
              key={times[personKey].seconds}
              value={times[personKey].seconds}
              onChange={(e) =>
                handleSecondChange(personKey, Number(e.target.value))
              }
              style={{
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                backgroundColor: 'var(--button-color)',
                color: 'white',
                padding: '4px 4px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '14px',
                cursor: 'pointer',
                height: '24px',
                width: '48px',
                position: 'relative',
                backgroundImage:
                  "url(\"data:image/svg+xml;charset=UTF-8,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23333' stroke-width='2' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E\")",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 10px center',
                backgroundSize: '10px',
              }}
            >
              {Array.from({ length: 60 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </label>
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
