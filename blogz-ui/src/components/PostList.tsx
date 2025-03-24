import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useGetPostsQuery } from '../features/post/postAPI';
import { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure } from '../features/post/postSlice';
import PostItem from './PostItem';

const PostList: React.FC = () => {
  const dispatch = useDispatch();
  const { posts: posts, isLoading, error } = useSelector((state: RootState) => state.posts);
  const { data, error: apiError, isLoading: apiIsLoading } = useGetPostsQuery();

  useEffect(() => {
    dispatch(fetchPostsStart());

    if (data) {
      dispatch(fetchPostsSuccess(data));
    } else if (apiError) {
      dispatch(fetchPostsFailure('Failed to fetch posts'));
    }
  }, [data, apiError, dispatch]);

  if (isLoading || apiIsLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-6" role="alert">
        <p>{error}</p>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No posts found</h3>
        <p className="mt-2 text-gray-600">Check back later for new content</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-10 text-gray-900">Latest Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
