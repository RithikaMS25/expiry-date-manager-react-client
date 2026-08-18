import { Link } from 'react-router-dom';
import { CalendarClock } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <CalendarClock className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-xl text-gray-900">ExpiryManager</span>
          </div>
          
          <nav className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              Log in
            </Link>
            <Link 
              to="/register" 
              className="bg-primary hover:bg-[#1d8c97] text-white px-5 py-2 rounded-full font-medium transition-colors shadow-sm"
            >
              Sign up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
