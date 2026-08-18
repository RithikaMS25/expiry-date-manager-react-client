import { Link } from 'react-router-dom';
import { ArrowRight, Bell, ShieldCheck, Clock } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Never Let Anything <span className="text-primary">Expire</span> Again
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Track your groceries, documents, warranties, and subscriptions in one place. Get timely alerts before things expire and save money.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              to="/register" 
              className="w-full sm:w-auto bg-primary hover:bg-[#1d8c97] text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Get Started for Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/login" 
              className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-sm"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Track Everything</h3>
            <p className="text-gray-600">Easily add items with their expiry dates. Sort, filter, and organize them effortlessly.</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Reminders</h3>
            <p className="text-gray-600">Receive notifications before items expire, so you never waste food or miss renewals.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Secure & Private</h3>
            <p className="text-gray-600">Your data is safely stored and entirely private. Access it from anywhere, anytime.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
