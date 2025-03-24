import React from 'react';
import { Post } from '../types/post.types';
import { Link } from 'react-router';
import { getPostImageUrl } from '../types/post.types';
import { PostApi, useDeletePostMutation } from '../features/post/postAPI';
import { toast } from 'react-toastify';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';

const DeletePost: React.FC<{ post: Post; user: any }> = ({ post, user }) => {
  const [deletePost] = useDeletePostMutation();
  const dispatch = useDispatch();
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await deletePost(post.id).unwrap();
      dispatch(PostApi.util.invalidateTags(['Post']));
      toast.success('Post deleted successfully');
    } catch (error) {
      toast.error('Failed to delete post');
      console.error(error);
    }
  };

  if (!user) return null;
  return (
    <button
      onClick={handleDelete}
      className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 z-[1]"
    >
      Delete
    </button>
  );
}


interface PostsItemProps {
  post: Post;
}

const PostItem: React.FC<PostsItemProps> = ({ post }) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString();
  const imageUrl = getPostImageUrl(post);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden relative">
      <DeletePost post={post} user={user} />
      <Link to={`/post/${post.id}`} className="">
        {imageUrl && (
          <div className="h-48 w-full overflow-hidden">
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
      </Link>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-900">
          <Link to={`/post/${post.id}`} className="hover:text-indigo-600">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>By {post.author.name} </span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </article>
  );
};

export default PostItem;