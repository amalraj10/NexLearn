export default function Timer({ timeRemaining }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: '#1e293b',
      color: '#ffffff',
      padding: '0.5rem 0.875rem',
      borderRadius: '6px'
    }}>
      <svg style={{ width: '1rem', height: '1rem' }} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
      <span style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '0.875rem' }}>
        {formatTime(timeRemaining)}
      </span>
    </div>
  );
}
