import React from 'react';
import { Post } from '../types/post.types';
import { Link } from 'react-router';
import { getPostImageUrl } from '../types/post.types';

interface PostsItemProps {
  post: Post;
}

const PostItem: React.FC<PostsItemProps> = ({ post }) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString();
  const imageUrl = getPostImageUrl(post);

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      {imageUrl && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
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