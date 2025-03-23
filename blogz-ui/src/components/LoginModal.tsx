import { useState } from "react";
import { useLoginMutation } from "../features/auth/authAPI";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { AuthInput } from "./SignupModal";

const LoginModal = (props: { closeModal: () => void }) => {
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('123456');
  const dispatch = useDispatch();
  const [loginMutate, { isLoading }] = useLoginMutation();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(login());
      const result = await loginMutate({ email, password }).unwrap();
      localStorage.setItem('token', result.access_token);
      toast.success('Logged in, Welcome back!');
      props.closeModal();
    } catch (err) {
      const error = err as { data: { message: string } };
      toast.error(error.data.message);
    }
  }
  return (
    <div className='min-w-lg p-4 mx-auto rounded-md shadow-lg border border-gray-300 bg-white'>
      <form className='space-y-4' onSubmit={handleSubmit}>
      <h2 className='text-2xl font-bold'>Login</h2>


        <AuthInput autoComplete="email" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" id="email" label="Email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required type="email" value={email} />
        <AuthInput autoComplete="password" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" id="password" label="Password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required type="password" value={password} />

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
              {isLoading ? '...' : 'Sign in'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default LoginModal;
