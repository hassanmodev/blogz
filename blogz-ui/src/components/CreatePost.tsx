import React, { useState } from 'react';
import { MyInput } from './RegisterModal';
import { useCreatePostMutation } from '../features/post/postAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createPostMutate] = useCreatePostMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const post = { title, content };
    const { id } = await createPostMutate(post).unwrap()
    setTitle('');
    setContent('');
    toast.success('Post created successfully!');
    navigate(`/post/${id}`);
  };

  return (
    <div className='max-w-2xl mx-auto'>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <h2 className='text-2xl font-bold my-8'>Write a new post</h2>
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
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
