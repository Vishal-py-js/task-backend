
//  MUI theme customization point.

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none', // disable upprcase
          boxShadow: 'none',
          padding: '8px 16px',
          fontWeight: 600,
          fontSize: '0.95rem',
        },
        containedPrimary: {
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#115293',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderColor: '#1976d2',
          },
        },
      },
      defaultProps: {
        disableElevation: true, // removes button shadow by default
        variant: 'contained', // default variant for all buttons
        color: 'primary',     // default color
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'all 0.3s ease',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976d2',
            boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.1)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976d2',
            //boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.2)',
          },
        },
        notchedOutline: {
          borderColor: '#ccc',
        },
        
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          marginBottom: '12px', // mb: 1.5
          borderRadius: 8, // same as borderRadius: 2
          p:2,
          transition: 'all 0.3s ease',
          boxShadow: '0px 4px 20px 4px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            boxShadow: '0px 4px 20px 4px rgba(0, 0, 0, 0.20)',
          },
        },
      },
    },
  },
});

export default theme;
