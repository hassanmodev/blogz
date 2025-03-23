import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../features/auth/authSlice';
import { useLogoutMutation } from '../../features/auth/authAPI';
import SignupModal from '../SignupModal';
import Modal from 'react-modal';
import LoginModal from '../LoginModal';
import { WelcomeUser } from '../WelcomeUser';

const AuthButtons: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);


  useEffect(() => {
    Modal.setAppElement(document.getElementById('root') as HTMLElement);
  }, []);


  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  if (user) return <WelcomeUser user={user} handleLogout={handleLogout} />;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLoginModalOpen(true)}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Login
      </button>
      <button
        onClick={() => setSignupModalOpen(true)}
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Sign Up
      </button>

      <Modal isOpen={isSignupModalOpen} onRequestClose={() => setSignupModalOpen(false)} className="flex justify-center items-center focus:outline-none h-full">
        <SignupModal closeModal={() => setSignupModalOpen(false)} />
      </Modal>
      <Modal isOpen={isLoginModalOpen} onRequestClose={() => setLoginModalOpen(false)} className="flex justify-center items-center focus:outline-none h-full">
        <LoginModal closeModal={() => setLoginModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default AuthButtons;