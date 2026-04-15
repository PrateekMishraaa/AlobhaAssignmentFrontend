import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [username, setUserName] = useState('');
  const [firstLetter, setFirstLetter] = useState('');
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const decoded = jwtDecode(token); // jwtDecode is synchronous, no need for await
          console.log('decoded', decoded);
          setUserName(decoded);
          
          if (decoded.name && decoded.name.length > 0) {
            setFirstLetter(decoded.name.charAt(0).toUpperCase());
          }
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchUser();
  }, [token]);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
      
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-gray-800">RTI MANAGEMENT</h1>
        </div>

      
        <div className="flex items-center gap-3">
       
          {username.name && (
            <span className="text-gray-700 font-medium hidden sm:block">
              {username.name}
            </span>
          )}
          
        
          <div className="relative group">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg cursor-pointer hover:bg-blue-700 transition-colors">
              {firstLetter || 'U'}
            </div>
            
           
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 invisible group-hover:visible transition-all z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{username.name || 'User'}</p>
                <p className="text-xs text-gray-500 mt-1">{username.email || 'user@example.com'}</p>
              </div>
              <button 
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;