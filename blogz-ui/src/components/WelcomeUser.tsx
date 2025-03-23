import { User } from '../types/auth.types';

export const WelcomeUser = ({ user, handleLogout }: { user: User; handleLogout: () => void; }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium">Welcome, {user.username}</span>
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Logout
      </button>
    </div>
  );
};
