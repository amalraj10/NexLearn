export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div style={{
      fontSize: '0.875rem',
      color: '#dc2626',
      backgroundColor: '#fef2f2',
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      marginBottom: '1rem'
    }}>
      {message}
    </div>
  );
}
