import { motion } from 'motion/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Goes back to the previous question. If this is the first question, nothing happens.
   */
  /******  b30d3cd8-facc-4ca2-b904-41f0c1f28a7c  *******/
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
          type="text"
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
    <motion.div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--container-padding)',
      }}
      key={currentQuestion} // Ensures animation runs when content changes
      initial={{ opacity: 0, x: isNext ? 100 : -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isNext ? -100 : 100 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h2>{t(questions[currentQuestion].text)}</h2>
        {renderInput()}
      </div>
      <div
        style={{
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
          Back
        </button>
        <button className="selection-button" onClick={handleNext}>
          {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
        </button>
      </div>
    </motion.div>
  );
};

export default Survey;
