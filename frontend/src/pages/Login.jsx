import { useState, useContext } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AuthContext } from '../context/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await login(values.username, values.password);
        setError('');
        // JWT already stored; reload to get role-based redirect
        window.location.reload();
      } catch (e) {
        setError(e.response?.data?.message || 'Login failed');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 12, p: 4, textAlign: 'center' }}>
        <Avatar sx={{ m: 'auto', bgcolor: 'var(--tata-amber)' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            fullWidth
            type="password"
            margin="normal"
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, bgcolor: 'var(--tata-blue)' }}
            disabled={formik.isSubmitting}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
