import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { login } from '../../actions/authActions';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, token, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  useEffect(() => {
    if (isAuthenticated && token) {
      navigate('/leadTable');
      toast.success('Login successful!');
    }
    if (error) {
      toast.error(error);
    }
  }, [isAuthenticated, token, error, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErrors = false;

    if (!email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is required' }));
      hasErrors = true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }

    if (!password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password is required' }));
      hasErrors = true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }

    if (!hasErrors) {
      dispatch(login(email, password));
      setEmail('');
      setPassword('');
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(2),
        },
      }}
    >
      <ToastContainer />
      <Box
        sx={{
          border: '1px solid #ccc',
          borderRadius: 2,
          padding: theme.spacing(4),
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <span>
            <Link to="/register">If You have no account, Please Register</Link>
          </span>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
