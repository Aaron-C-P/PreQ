import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-white text-2xl font-bold">PreQue</div>
          <div className="space-x-4">
            <Link
              to="/login"
              className="text-white hover:text-blue-200 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Smart Queue Management
            <span className="block text-blue-200">Made Simple</span>
          </h1>
          <p className="text-xl text-blue-100 mb-12">
            Streamline your waiting experience with our intelligent queue management system.
            Save time, reduce stress, and manage your visits efficiently.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start Free Trial
            </Link>
            <Link
              to="/admin/login"
              className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-400/10 transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </div>

        {/* Features section remains unchanged */}
      </div>
    </div>
  );
};

export default LandingPage;