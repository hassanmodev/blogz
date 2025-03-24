import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from '../../types/post.types';

export const PostApi = createApi({
  reducerPath: 'Post',
  tagTypes: ['Post', 'PostSingle'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      return headers;
    }
  }),


  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: ['Post'],
    }),

    getPostById: builder.query<Post, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'GET',
      }),
      providesTags: ['PostSingle'],
    }),

    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
    }),

    createPost: builder.mutation<Post, Partial<Post>>({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),

    updatePost: builder.mutation<Post, { id: string, post: Partial<Post> }>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PATCH',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),

    createComment: builder.mutation<void, { postId: string, content: string, commenter: string }>({
      query: ({ postId, content }) => ({
        url: `/posts/${postId}/comments`,
        method: 'POST',
        body: { content },
      }),
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery, useDeletePostMutation, useCreatePostMutation, useCreateCommentMutation, useUpdatePostMutation } = PostApi;