import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/auth.types';

const initialState = {
  user: null as User | null,
  isLoading: false,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoading = true;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    loginFail: (state) => {
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
    }
  },
});

export const { login, setUser, loginFail, logout } = authSlice.actions;
export default authSlice.reducer;
