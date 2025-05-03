// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import AuthService from './AuthService';

// export const signup = createAsyncThunk('auth/signup', AuthService.signup);
// export const login = createAsyncThunk('auth/login', AuthService.login);

// const storedUser = localStorage.getItem('user');

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: storedUser ? JSON.parse(storedUser) : null,
//     isLoading: false,
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       localStorage.removeItem('user');
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(signup.fulfilled, (state, action) => {
//         state.user = action.payload;
//         localStorage.setItem('user', JSON.stringify(action.payload));
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.user = action.payload;
//         localStorage.setItem('user', JSON.stringify(action.payload));
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from './AuthService';

export const signup = createAsyncThunk('auth/signup', async (data, { rejectWithValue }) => {
  try {
    const response = await AuthService.signup(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || 'Signup failed');
  }
});

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    const response = await AuthService.login(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || 'Login failed');
  }
});

const storedUser = localStorage.getItem('user');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
