import React, { useEffect, useState } from 'react';
import './css/QuestionSection.css';

const QuestionSection = ({
  questions,
  loading,
  error,
  userAnswers,
  onSaveAnswer,
  currentQuestionIndex,
  onIndexChange,
}) => {
  const [localQuestionIndex, setLocalQuestionIndex] = useState(currentQuestionIndex);

  useEffect(() => {
    setLocalQuestionIndex(currentQuestionIndex);
  }, [currentQuestionIndex]);

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;

  if (!questions || questions.length === 0) {
    return <p>No questions available for this tab.</p>;
  }

  const handlePrevious = () => {
    if (localQuestionIndex > 0) {
      const newIndex = localQuestionIndex - 1;
      setLocalQuestionIndex(newIndex);
      onIndexChange(newIndex);
    }
  };

  const handleNext = () => {
    if (localQuestionIndex < questions.length - 1) {
      const newIndex = localQuestionIndex + 1;
      setLocalQuestionIndex(newIndex);
      onIndexChange(newIndex);
    }
  };

  const currentQuestion = questions[localQuestionIndex];

  return (
    <div id="question-container" className="question-section">
      <div className="question-block">
        <h3>{localQuestionIndex + 1}. {currentQuestion?.questionText}</h3>
        <form>
          {currentQuestion?.options.map((option, i) => (
            <label key={i}>
              <input
                type="radio"
                name={`question-${currentQuestion._id}`}
                value={option}
                checked={userAnswers[currentQuestion._id] === option}
                onChange={() => onSaveAnswer(currentQuestion._id, option)}
              />
              <p>{option}</p>
            </label>
          ))}
        </form>
      </div>
      <div className="actions">
        <button
          className="btn-review"
          onClick={handlePrevious}
          disabled={localQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          className="btn-review"
          onClick={handleNext}
          disabled={localQuestionIndex === questions.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionSection;
