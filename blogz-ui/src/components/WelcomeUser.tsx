import { Link } from 'react-router';
import { User } from '../types/auth.types';

export const WelcomeUser = ({ user, handleLogout }: { user: User; handleLogout: () => void; }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium">Welcome, {user.name}</span>
      <Link
        to="/create"
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Write
      </Link>
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm font-medium text-white bg-red-400 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Logout
      </button>
    </div>
  );
};
