export default function ParagraphModal({ isOpen, onClose, paragraph }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        padding: '1.75rem 2rem',
        maxWidth: '52rem',
        width: '100%',
        maxHeight: '85vh',
        overflowY: 'auto',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
      }}>
        <h3 style={{ 
          fontSize: '1.0625rem', 
          fontWeight: '600', 
          marginBottom: '1.25rem',
          color: '#1f2937',
          borderBottom: '1px solid #e5e7eb',
          paddingBottom: '0.75rem'
        }}>
          Comprehensive Paragraph
        </h3>
        <div style={{ 
          color: '#374151', 
          whiteSpace: 'pre-wrap', 
          marginBottom: '1.75rem', 
          lineHeight: '1.7',
          fontSize: '0.9375rem',
          textAlign: 'justify'
        }}>
          {paragraph}
        </div>
        <button
          onClick={onClose}
          style={{
            width: '100%',
            maxWidth: '200px',
            display: 'block',
            margin: '0 auto',
            padding: '0.75rem',
            backgroundColor: '#22414D',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1a3340'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#22414D'}
        >
          Minimize
        </button>
      </div>
    </div>
  );
}
