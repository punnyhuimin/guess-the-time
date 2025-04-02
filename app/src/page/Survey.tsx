import { motion } from 'motion/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
interface QuestionType {
  id: number;
  text: string;
  type: string;
}

interface ResponseType {
  [key: number]: string;
}

const questions: QuestionType[] = [
  { id: 1, text: 'start-prompt', type: 'text' },
  { id: 2, text: 'color-pick', type: 'slider' },
  { id: 3, text: 'nicole-time', type: 'text' },
  { id: 4, text: 'ansel-time', type: 'text' },
];

const renderPlaceholder = (question: QuestionType) => {
  if (question.text === 'start-prompt') {
    return 'Name';
  }
  else if (question.text === 'nicole-time' || question.text === 'ansel-time') {
    return 'HH:MM:SS';
  }
  return '';
};

const Survey = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<ResponseType>({});
  const { t } = useTranslation();
  const [isNext, setIsNext] = useState(true);

  const handleNext = () => {
    setIsNext(true);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      console.log('Survey Complete:', responses);
      alert('Survey Complete! Check the console for responses.');
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

  const renderInput = () => {
    const question = questions[currentQuestion];

    if (question.type === 'text') {
      return (
        <input
          className="text-input"
          type="text"
          placeholder={t(renderPlaceholder(question))}
          value={responses[question.id] || ''}
          onChange={handleInputChange}
        />
      );
    }

    if (question.type === 'slider') {
      return (
        <input
          type="range"
          min="1"
          max="100"
          value={responses[question.id] || 5}
          onChange={handleInputChange}
        />
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
          paddingTop: 'var(--container-padding)',
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--container-padding)',
        }}
      >
        <button
          className="selection-button"
          onClick={handleBack}
          disabled={currentQuestion === 0}
        >
          <ArrowBack style={{ fontSize: '16px' }} />
        </button>
        {currentQuestion < questions.length - 1 ? (
          <button className="selection-button" onClick={handleNext}>
            <ArrowForward style={{ fontSize: '16px' }} />
          </button>
        ) : (
          <button className="submit-button" onClick={handleNext}>
            {t('SUBMIT')}
          </button>
        )}
      </div>
    </div>
  );
};

export default Survey;
