import { createTheme } from '@mui/material/styles';

// Tema para la tabla de estadísticas
export const statsTableTheme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          color: 'white',
        },
        columnHeaders: {
          backgroundColor: '#1e1e1e',
          color: 'black',
        },
        cell: {
          color: 'white',
        },
        footerContainer: {
          backgroundColor: '#1e1e1e',
          color: 'white',
        },
        // Aquí se aplica el estilo a la barra de paginación
        toolbarContainer: {
          backgroundColor: '#1e1e1e',
          color: 'white',
        },
      },
    },
  },
});

// Tema para la tabla de ventas ordenadas
export const sortedSalesTableTheme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          color: 'black',
        },
        columnHeaders: {
          backgroundColor: '#ffffff',
          color: 'black',
        },
        cell: {
          color: 'black',
        },
        footerContainer: {
          backgroundColor: '#ffffff',
          color: 'black',
        },
        toolbarContainer: {
          backgroundColor: '#ffffff',
          color: 'black',
        },
      },
    },
  },
});
