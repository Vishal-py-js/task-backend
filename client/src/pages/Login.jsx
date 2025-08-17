/**
 * Login page with validation.
 * On success, backend sets cookie; AuthContext.login sets user in context.
 */

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Link as MuiLink
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../contexts/AuthContext';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password required')
});

export default function Login() {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      await authLogin(data);
      navigate('/', { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Login</Typography>

        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            autoFocus
            {...register('email')}
            error={!!formState.errors?.email}
            helperText={formState.errors?.email?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            {...register('password')}
            error={!!formState.errors?.password}
            helperText={formState.errors?.password?.message}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>

          <Box sx={{ mt: 2 }}>
            <MuiLink href="/register" variant="body2">Don't have an account? Register</MuiLink>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
