import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Import Components
import Dashboard from './components/Dashboard';
import RecipeManager from './components/RecipeManager';
import InventoryTracker from './components/InventoryTracker';
import FinancialAnalytics from './components/FinancialAnalytics';
import MenuBuilder from './components/MenuBuilder';
import Authentication from './components/Authentication';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Bright blue
    },
    secondary: {
      main: '#f50057', // Vibrant pink
    },
    background: {
      default: '#f4f4f4',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Authentication />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recipes" element={<RecipeManager />} />
          <Route path="/inventory" element={<InventoryTracker />} />
          <Route path="/financials" element={<FinancialAnalytics />} />
          <Route path="/menu" element={<MenuBuilder />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
