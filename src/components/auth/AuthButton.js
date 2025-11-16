import { Button } from '@mui/material';

export default function AuthButton({ 
  onClick, 
  disabled, 
  loading, 
  children, 
  loadingText = 'Loading...' 
}) {
  return (
    <Button
      fullWidth
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      sx={{
        backgroundColor: !disabled ? '#2d4f5c' : '#d1d5db',
        color: '#ffffff',
        padding: '0.875rem',
        fontSize: '0.9375rem',
        fontWeight: '600',
        textTransform: 'none',
        borderRadius: '10px',
        boxShadow: !disabled ? '0 4px 12px rgba(45, 79, 92, 0.25)' : 'none',
        '&:hover': {
          backgroundColor: !disabled ? '#1e3a4a' : '#d1d5db',
        },
        '&.Mui-disabled': {
          backgroundColor: '#d1d5db',
          color: '#ffffff',
        },
      }}
    >
      {loading ? loadingText : children}
    </Button>
  );
}
