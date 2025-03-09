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
];

const Survey = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<ResponseType>({});
  const { t } = useTranslation();

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      console.log('Survey Complete:', responses);
      alert('Survey Complete! Check the console for responses.');
    }
  };
  const handleBack = () => {
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
          className="border p-2 w-full rounded-md mb-4"
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
          className="w-full mb-4"
          value={responses[question.id] || 5}
          onChange={handleInputChange}
        />
      );
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded-lg shadow-md">
      <motion.div
        key={currentQuestion} // Ensures animation runs when content changes
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-xl font-bold mb-4">
          {t(questions[currentQuestion].text)}
        </h1>
        {renderInput()}
        <button
          onClick={handleBack}
          className={`bg-gray-400 text-white px-4 py-2 rounded-md ${
            currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={currentQuestion === 0}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
        </button>
      </motion.div>
    </div>
  );
};

export default Survey;
