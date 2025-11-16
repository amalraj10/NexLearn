import { TextField, InputAdornment } from '@mui/material';

const countryCodes = [
  { code: '+91', flag: '🇮🇳', country: 'India' },
  { code: '+1', flag: '🇺🇸', country: 'USA' },
  { code: '+44', flag: '🇬🇧', country: 'UK' },
  { code: '+971', flag: '🇦🇪', country: 'UAE' },
];

export default function PhoneInput({ 
  countryCode, 
  setCountryCode, 
  mobile, 
  setMobile, 
  disabled 
}) {
  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 15) {
      setMobile(value);
    }
  };

  return (
    <TextField
      fullWidth
      label="Phone number"
      variant="outlined"
      value={mobile}
      onChange={handleMobileChange}
      placeholder="1234567890"
      disabled={disabled}
      inputProps={{ maxLength: 15 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              disabled={disabled}
              style={{
                border: 'none',
                outline: 'none',
                fontSize: '0.9375rem',
                color: '#6b7280',
                fontWeight: '500',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                paddingRight: '0.5rem',
                marginRight: '0.5rem',
                borderRight: '1px solid #e5e7eb'
              }}
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.code}
                </option>
              ))}
            </select>
          </InputAdornment>
        ),
      }}
      sx={{
        marginBottom: '1.5rem',
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
          '& fieldset': {
            borderColor: '#e5e7eb',
          },
          '&:hover fieldset': {
            borderColor: '#d1d5db',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#3b82f6',
          },
        },
        '& .MuiInputLabel-root': {
          fontSize: '0.875rem',
          color: '#9ca3af',
        },
        '& .MuiInputBase-input': {
          fontSize: '0.9375rem',
          color: '#1f2937',
          fontWeight: '500',
        },
      }}
    />
  );
}
