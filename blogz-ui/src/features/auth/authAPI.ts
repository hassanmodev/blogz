import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RegisterUser } from '../../types/auth.types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    login: builder.mutation<{ access_token: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<{ access_token: string }, RegisterUser>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getUser: builder.query<{ id: number; email: string; name: string }, string>({
      query: (token) => ({
        url: '/auth/me',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery, useRegisterMutation } = authApi;
