import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout, setUser } from '../../features/auth/authSlice';
import SignupModal from '../RegisterModal';
import Modal from 'react-modal';
import LoginModal from '../LoginModal';
import { WelcomeUser } from '../WelcomeUser';

if (Modal.defaultStyles.overlay) {
  Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,20,0.5)';
  Modal.defaultStyles.overlay.zIndex = 50;
}

const HeaderAuth = () => {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);


  useEffect(() => {
    Modal.setAppElement(document.getElementById('root') as HTMLElement);
  }, []);


  const handleLogout = async () => {
    localStorage.removeItem('token');
    dispatch(setUser(null));
    dispatch(logout());
  };

  if (isLoading) return <div>Loading...</div>;
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

export default HeaderAuth;