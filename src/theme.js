// theme.js
import { createTheme } from '@mui/material/styles';

export const statsTableTheme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          color: 'white',
        },
        columnHeaders: {
          backgroundColor: ' #1e1e1e',
          color: 'white',
        },  
        cell: {
          color: 'white',
        },
        footerContainer: {
          backgroundColor: ' #1e1e1e',
          color: 'white',
        },
      },
    },
  },
});

export const sortedSalesTableTheme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          color: 'lightgray',
        },
        columnHeaders: {
          backgroundColor: '#444',
          color: 'lightgray',
        },
        cell: {
          color: 'lightgray',
        },
        footerContainer: {
          backgroundColor: '#444',
          color: 'lightgray',
        },
      },
    },
  },
});
