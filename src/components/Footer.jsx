import { CalendarClock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-gray-400" />
            <span className="font-semibold text-gray-600">ExpiryManager</span>
          </div>
          
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ExpiryManager. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
