import React from 'react';
import { Loader, Sparkles } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', fullScreen = false, message = 'Loading...' }) => {
  
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const spinnerSize = sizes[size] || sizes.md;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-lg flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative mb-6">
        
            <div className={`${spinnerSize} border-4 border-purple-200/30 rounded-full animate-pulse`}></div>
         
            <div className={`absolute top-0 left-0 ${spinnerSize} border-4 border-t-purple-500 border-r-pink-500 border-b-purple-500 border-l-transparent rounded-full animate-spin`}></div>
  
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <p className="text-white text-lg font-semibold animate-pulse">{message}</p>
          <p className="text-white/60 text-sm mt-2">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        
        <div className={`${spinnerSize} border-4 border-gray-200 dark:border-gray-700 rounded-full`}></div>
       
        <div className={`absolute top-0 left-0 ${spinnerSize} border-4 border-t-purple-500 border-r-pink-500 border-b-purple-500 border-l-transparent rounded-full animate-spin`}></div>
       
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
      </div>
      {message && (
        <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">{message}</p>
      )}
    </div>
  );
};


export const DotSpinner = () => {
  return (
    <div className="flex gap-2">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        ></div>
      ))}
    </div>
  );
};

export const PulseSpinner = () => {
  return (
    <div className="relative">
      <div className="w-12 h-12 bg-purple-500 rounded-full animate-ping opacity-75"></div>
      <div className="absolute top-0 left-0 w-12 h-12 bg-purple-600 rounded-full animate-pulse"></div>
    </div>
  );
};

export const RingSpinner = () => {
  return (
    <div className="relative">
      <div className="w-12 h-12 border-4 border-purple-200 rounded-full"></div>
      <div className="absolute top-0 left-0 w-12 h-12 border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;