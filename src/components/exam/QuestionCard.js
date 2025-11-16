export default function QuestionCard({ question, questionNumber, selectedAnswer, onAnswerSelect }) {
  const questionId = question?.question_id || question?.id;
  
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <p style={{ color: '#374151', marginBottom: '1rem', fontSize: '0.9375rem', lineHeight: '1.6' }}>
        {questionNumber}. {question?.question}
      </p>
      {question?.image && (
        <img
          src={question.image}
          alt="Question"
          style={{ maxWidth: '300px', height: 'auto', borderRadius: '6px', marginBottom: '1rem' }}
        />
      )}
      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
        Choose the answer:
      </p>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {question?.options?.map((option, index) => {
          const optionId = option.option_id || option.id;
          const optionLabel = String.fromCharCode(65 + index); // A, B, C, D
          return (
            <label
              key={optionId}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.875rem 1rem',
                border: selectedAnswer === optionId ? '2px solid #22414D' : '1px solid #d1d5db',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: 'transparent',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <span style={{ 
                  fontWeight: '600', 
                  color: '#374151', 
                  marginRight: '0.75rem',
                  fontSize: '0.9375rem'
                }}>
                  {optionLabel}.
                </span>
                <span style={{ color: '#374151', fontSize: '0.9375rem' }}>
                  {option.option_text || option.option}
                </span>
              </div>
              <input
                type="radio"
                name={`question-${questionId}`}
                checked={selectedAnswer === optionId}
                onChange={() => onAnswerSelect(optionId)}
                style={{
                  width: '1.125rem',
                  height: '1.125rem',
                  accentColor: '#22414D',
                  cursor: 'pointer',
                  marginLeft: '1rem'
                }}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
