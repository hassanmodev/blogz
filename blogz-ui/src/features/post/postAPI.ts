import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from '../../types/post.types';

export const PostApi = createApi({
  reducerPath: 'Post',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
    }),
    getPostById: builder.query<Post, string>({
      query: (token) => ({
        url: `/posts/${token}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery } = PostApi;
