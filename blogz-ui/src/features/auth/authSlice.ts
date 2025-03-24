import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/auth.types';

const initialState = {
  user: undefined as User | null | undefined,
  isLoading: false,
  token: localStorage.getItem('token') ?? '',
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoading = true;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    loginFail: (state) => {
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = '';
      state.isLoading = false;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { login, setUser, loginFail, logout, setToken } = authSlice.actions;
export default authSlice.reducer;
