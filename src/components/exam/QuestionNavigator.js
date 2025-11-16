export default function QuestionNavigator({ questions, currentQuestionIndex, onQuestionSelect, answers, markedForReview, visitedQuestions }) {
  const getQuestionStatusColor = (question, index) => {
    const questionId = question.question_id || question.id;
    const isCurrent = currentQuestionIndex === index;
    const isAnswered = answers[questionId] !== undefined && answers[questionId] !== null;
    const isMarked = markedForReview.includes(questionId);
    const isVisited = visitedQuestions?.includes(questionId);
    
    // Current question always shows yellow
    if (isCurrent) {
      return 'bg-yellow-400 text-gray-800 border-2 border-yellow-500';
    }
    
    // Answered and marked
    if (isAnswered && isMarked) {
      return 'bg-gray-800 text-white';
    }
    
    // Just answered
    if (isAnswered) {
      return 'bg-green-500 text-white';
    }
    
    // Just marked (not answered)
    if (isMarked) {
      return 'bg-purple-600 text-white';
    }
    
    // Visited but not answered (Not attended)
    if (isVisited && !isAnswered) {
      return 'bg-red-500 text-white';
    }
    
    // Not visited yet (default state)
    return 'bg-gray-200 text-gray-700';
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(10, 1fr)',
      gap: '0.5rem',
      marginBottom: '1.5rem'
    }}>
      {questions.map((question, index) => (
        <button
          key={question.question_id || question.id}
          onClick={() => onQuestionSelect(index)}
          style={{
            width: '100%',
            aspectRatio: '1',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: '500',
            cursor: 'pointer',
            border: 'none',
            transition: 'all 0.2s'
          }}
          className={getQuestionStatusColor(question, index)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
