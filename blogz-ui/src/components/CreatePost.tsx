import React, { useState } from 'react';
import { MyInput } from './RegisterModal';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          minLength={12}
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
          minLength={100}
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
