import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import { authApi } from './features/auth/authAPI';
import postReducer from './features/post/postSlice';
import { PostApi } from './features/post/postAPI';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    [authApi.reducerPath]: authApi.reducer,
    [PostApi.reducerPath]: PostApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, PostApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
