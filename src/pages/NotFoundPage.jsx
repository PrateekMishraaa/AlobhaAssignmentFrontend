import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="text-center py-20">
      <div className="flex justify-center mb-6">
        <AlertCircle className="w-24 h-24 text-yellow-400" />
      </div>
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
      <p className="text-white/90 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn-primary inline-flex items-center gap-2">
        <Home className="w-5 h-5" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;