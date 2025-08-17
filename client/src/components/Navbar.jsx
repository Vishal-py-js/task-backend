/**
 * Top app bar showing app name and auth actions.
 */

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 2, background:"red" }}>
      <AppBar position="static" sx={{background:"#525050"}}>
        <Toolbar>
          <Typography variant="h6" component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
            Task Manager
          </Typography>

          {user ? (
            <>
              <Typography sx={{ mr: 2 }}>{user.name}</Typography>
              <Button onClick={onLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button component={RouterLink} to="/login">Login</Button>
              <Button component={RouterLink} sx={{ml:1}} to="/register">Register</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
