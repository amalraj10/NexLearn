export default function AuthHeader({ title, description }) {
  return (
    <div>
      <h1 style={{
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '0.5rem',
        lineHeight: '1.3'
      }}>
        {title}
      </h1>
      <p style={{
        fontSize: '0.875rem',
        color: '#6b7280',
        lineHeight: '1.5',
        marginBottom: '2rem'
      }}>
        {description}
      </p>
    </div>
  );
}
