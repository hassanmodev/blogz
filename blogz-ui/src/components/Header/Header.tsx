import AuthButtons from './HeaderAuth';

interface HeaderProps {
  siteName: string;
}

const Header = ({ siteName }: HeaderProps) => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-gray-900">
          {siteName}
        </a>
        <AuthButtons />
      </div>
    </header>
  );
};

export default Header;