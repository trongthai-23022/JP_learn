import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Bgr from '../../assets/images/bgr.jpg';
import logoimg from '../../assets/images/logoEZ.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, login } from '../../store/authSlice';
import { setAuthToken } from '../../api/apiConfig';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setFieldError } from 'formik';
import './SignInPage.css';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        JPLEARN
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInPage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const Navigate = useNavigate();

  useEffect(() => {
    // Xóa token khi trang đăng nhập được hiển thị
    setAuthToken('');
  }, []);

  useEffect(() => {
    const authCheck = async () => {
      const shouldRedirect = await dispatch(checkAuth());
      if (shouldRedirect) {
        Navigate('/'); // Chuyển hướng đến trang chính  
      }
    };

    authCheck();
  }, [dispatch]);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const result = await dispatch(login(values));
        console.log(result);
        if (result.payload?.error || result.error) {
          console.log(result.payload.error);
          // Xử lý lỗi đăng nhập
          setFieldError('error', 'Invalid email or password'); // Đặt giá trị lỗi trong trường error
        } else {
          Navigate('/'); // Chuyển hướng đến trang home
        }
      } catch (error) {
        console.log(error);
        // Xử lý lỗi đăng nhập
        setFieldError('error', 'An error occurred'); // Đặt giá trị lỗi trong trường error
      } finally {
        setSubmitting(false);
      }
    },

  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Bgr})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            className="home-page__logo"
            style={{
              backgroundColor: '#f5dcbd',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={logoimg} alt="logo" />
            <p>JPLEARN</p>
            <Typography
              variant="h3"
              sx={{
                color: 'red',
                fontWeight: 'bold',
                textAlign: 'center',
                fontFamily: 'Roboto',
              }}
            >
              へようこそ！
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...formik.getFieldProps('email')}
                error={formik.touched.email && formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...formik.getFieldProps('password')}
                error={formik.touched.password && formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
              />

              <div className={`error ${formik.errors.error ? 'error-visible' : ''}`}>
                {formik.errors.error}
              </div>


              <Button
                type="submit"
                disabled={loading}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? 'Loading...' : 'Sign In'}
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
