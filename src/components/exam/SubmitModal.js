export default function SubmitModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  submitting, 
  timeRemaining, 
  totalQuestions, 
  answeredCount, 
  markedCount 
}) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        padding: '1.5rem',
        maxWidth: '22rem',
        width: '100%',
        position: 'relative'
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.25rem',
            color: '#6b7280',
            cursor: 'pointer',
            padding: '0',
            lineHeight: '1'
          }}
        >
          ×
        </button>

        <h3 style={{ 
          fontSize: '0.9375rem', 
          fontWeight: '600', 
          marginBottom: '1.25rem',
          color: '#1f2937',
          paddingRight: '1.5rem'
        }}>
          Are you sure you want to submit the test?
        </h3>

        <div style={{ marginBottom: '1.25rem' }}>
          {/* Remaining Time */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <div style={{
                width: '1.5rem',
                height: '1.5rem',
                backgroundColor: '#1e293b',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg style={{ width: '0.875rem', height: '0.875rem', color: '#ffffff' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <span style={{ fontSize: '0.8125rem', color: '#374151' }}>Remaining Time:</span>
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#1f2937' }}>
              {formatTime(timeRemaining)}
            </span>
          </div>

          {/* Total Questions */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <div style={{
                width: '1.5rem',
                height: '1.5rem',
                backgroundColor: '#f59e0b',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                Q
              </div>
              <span style={{ fontSize: '0.8125rem', color: '#374151' }}>Total Questions:</span>
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#1f2937' }}>
              {totalQuestions}
            </span>
          </div>

          {/* Questions Answered */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <div style={{
                width: '1.5rem',
                height: '1.5rem',
                backgroundColor: '#10b981',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: '700'
              }}>
                ✓
              </div>
              <span style={{ fontSize: '0.8125rem', color: '#374151' }}>Questions Answered:</span>
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#1f2937' }}>
              {String(answeredCount).padStart(3, '0')}
            </span>
          </div>

          {/* Marked for review */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <div style={{
                width: '1.5rem',
                height: '1.5rem',
                backgroundColor: '#9333ea',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: '700'
              }}>
                ★
              </div>
              <span style={{ fontSize: '0.8125rem', color: '#374151' }}>Marked for review:</span>
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#1f2937' }}>
              {String(markedCount).padStart(3, '0')}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={onSubmit}
          disabled={submitting}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#22414D',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: submitting ? 'not-allowed' : 'pointer',
            opacity: submitting ? 0.5 : 1
          }}
        >
          {submitting ? 'Submitting...' : 'Submit Test'}
        </button>
      </div>
    </div>
  );
}
