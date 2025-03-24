import React, { useEffect, useState } from 'react';
import { MyInput } from './RegisterModal';
import { PostApi, useCreatePostMutation, useGetPostByIdQuery, useUpdatePostMutation } from '../features/post/postAPI';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';
import { Post } from '../types/post.types';
import { useDispatch } from 'react-redux';

type CreatePostProps = {
  editingPost?: boolean;
};
const CreatePost = (props: CreatePostProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams<{ id: string }>();
  const postId = params.id;
  const [createPostMutate] = useCreatePostMutation();
  const [updatePostMutate] = useUpdatePostMutation();
  const { data: post } = useGetPostByIdQuery(postId as string);

  const senderMutation = (props.editingPost ? updatePostMutate : createPostMutate) as typeof createPostMutate;

  useEffect(() => {
    if (props.editingPost && post) {
      setTitle(post.title);
      setContent(post.content);
      setEditingPost(post);
    } else {
      setTitle('');
      setContent('');
      setEditingPost(null);
    }
  }, [post?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const post = { title, content };
    console.log('post', post, senderMutation);
    const { id } = await senderMutation({ ...post, id: editingPost?.id }).unwrap();
    dispatch(PostApi.util.invalidateTags(['PostSingle']));
    toast.success(`Post ${props.editingPost ? 'updated' : 'created'} successfully`);
    navigate(`/post/${id}`);
  };

  return (
    <div className='max-w-2xl mx-auto'>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <h2 className='text-2xl font-bold my-8'>
          {
            props.editingPost ? 'Edit Post' : 'Create Post'}
        </h2>
        <MyInput
          className='my-2 w-full bg-white border border-gray-300 rounded-md px-4 py-2'
          id='title'
          autoComplete='title'
          label='Title'
          onChange={e => setTitle(e.target.value)}
          placeholder='Enter post title'
          required
          type='text'
          value={title}
          minLength={10}
          maxLength={50}
        />
        <MyInput
          className='mt-2 mb-6 w-full bg-white border border-gray-300 rounded-md px-4 py-2'
          id='content'
          autoComplete='content'
          label='Content'
          onChange={e => setContent(e.target.value)}
          placeholder='Enter post content'
          required
          value={content}
          type='textarea'
          minLength={50}
          maxLength={500}
        />
        <button
          className='bg-indigo-500 text-white mb-4 px-4 py-2 rounded-md w-full hover:bg-indigo-600 cursor-pointer'
          type='submit'
        >
          {
            props.editingPost ? 'Update Post' : 'Create Post'
          }
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
