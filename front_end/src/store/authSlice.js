import api from '../api/apiConfig';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { setAuthToken, removeAuthToken } from '../api/apiConfig';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue, dispatch }) => {
  try {
    const response = await api.post('/login', credentials);
    const { access_token } = response.data;
    console.log(response.data);
    localStorage.setItem('jwtToken', access_token);
    setAuthToken(access_token);
    dispatch(setUser(response.user));
    return response.user;
  } catch (error) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data);
  } finally {
    dispatch(login.fulfilled()); // Đánh dấu tác vụ đã hoàn thành
  }
});

export const refreshToken = async (refreshToken) => {
  try {
    const response = await api.post('/refresh', { refresh_token: refreshToken });
    const { access_token } = response.data;
    localStorage.setItem('jwtToken', access_token);
    setAuthToken(access_token);
    return true;
  } catch (error) {
    console.log(error.response.data);
    return false;
  }
};

export const checkAuth = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setAuthToken(token);
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Nếu token hết hạn, thực hiện cập nhật token
        const success = await api.post('/refresh', { refresh_token: token });
        if (!success) {
          dispatch(logout());
          return false;
        }
      }
      dispatch(setUser(decoded));
      dispatch(setLoggedIn(true));

      return true;
    }
    return false;
  };
};

export const restoreAuthState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setUser(decoded));
      dispatch(setLoggedIn(true));
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    removeAuthToken();
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    dispatch(setUser(null));
    Navigate('/signin'); // Chuyển hướng đến trang đăng nhập
  };
};

export const setUser = (user) => {
  return {
    type: 'auth/setUser',
    payload: user,
  };
};

export const setLoggedIn = (loggedIn) => {
  return {
    type: 'auth/setLoggedIn',
    payload: loggedIn,
  };
};

const initialState = {
  user: null,
  loggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.loggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export default authSlice.reducer;
