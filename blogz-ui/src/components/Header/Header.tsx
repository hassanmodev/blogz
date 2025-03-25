import { Link } from 'react-router';
import HeaderAuth from './HeaderAuth';

interface HeaderProps {
  siteName: string;
}

const Header = ({ siteName }: HeaderProps) => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-900">
          {siteName} |
          <span className="text-xs text-gray-500 ml-2 self-end underline">
            Cold start can take upto 1 minute.
          </span>
        </Link>
        <HeaderAuth />
      </div>
    </header>
  );
};

export default Header;