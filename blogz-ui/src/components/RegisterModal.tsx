import { useState } from "react";
import { useRegisterMutation } from "../features/auth/authAPI";
import { toast } from "react-toastify";

type InputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type: string;
  autoComplete: string;
  required: boolean;
  className: string;
  placeholder: string;
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>;
export const MyInput = (props: InputProps) => {
  const Element = props.type === 'textarea' ? 'textarea' : 'input';
  return (
    <div className='mb-4'>
      <label htmlFor={props.id} className='block text-sm font-medium text-gray-700'>
        {props.label}
      </label>
      <Element {...props} />
    </div>
  );
}
const RegisterModal = (props: { closeModal: () => void }) => {
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('123456');
  const [name, setName] = useState('Test Name');

  const [registerMutate, { isLoading }] = useRegisterMutation();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await registerMutate({ email, password, name }).unwrap();
      localStorage.setItem('token', result.access_token);
      toast.success('Account created successfully!');
      props.closeModal();
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error || 'Failed to register');
      console.error('Failed to register:', err);
    }
  }
  return (
    <div className='min-w-lg p-4 mx-auto rounded-md shadow-lg border border-gray-300 bg-white z-20'>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <h2 className='text-2xl font-bold'>Register</h2>
        <MyInput label='Full Name' value={name} onChange={(e) => setName(e.target.value)} type='text' autoComplete='name' required className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' placeholder='Full Name' id='name' />
        <MyInput label='Email' value={email} onChange={(e) => setEmail(e.target.value)} type='email' autoComplete='email' required className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' placeholder='Email' id='email' />
        <MyInput label='Password' value={password} onChange={(e) => setPassword(e.target.value)} type='password' autoComplete='password' required className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' placeholder='Password' id='password' />

        <div className='flex items-center justify-between'>
          <div className='text-sm'>
            <a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
              Forgot your password?
            </a>
          </div>
          <div>
            <button
              type='submit'
              className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              {isLoading ? '...' : 'Register'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default RegisterModal;
