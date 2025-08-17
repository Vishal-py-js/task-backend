/**
 * Registration page using react-hook-form + zod for validation.
 * On success, we call auth.register() which sets user in context and the cookie.
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
import { useState } from 'react';

// validation schema (mirrors backend)
const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export default function Register() {
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    console.log("Clickeddddd");
    try {
      await authRegister(data);
      // after register the backend sets cookie; go to dashboard
      navigate('/');
    } catch (err) {
      // show server error message; replace with Snackbar in production
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Register</Typography>

        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            autoFocus
            {...register('name')}
            error={!!formState.errors?.name}
            helperText={formState.errors?.name?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
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
            Register
          </Button>

          <Box sx={{ mt: 2 }}>
            <MuiLink href="/login" variant="body2">Already have an account? Login</MuiLink>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
