/**
 * Root App: wire up ThemePrvider + Contexts + Router + global layout
 */

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import Router from './routes/Router';
import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import "./App.css"

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
        <TaskProvider>
          <Navbar />
          
            <Router />
          
        </TaskProvider>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
