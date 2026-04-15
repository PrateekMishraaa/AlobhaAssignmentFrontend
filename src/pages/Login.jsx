import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_URL;
console.log("api url", apiUrl);

const Login = () => {
 
  
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  console.log("form data", formData);
  const navigate = useNavigate();
  const [viewPassword, setViewPassword] = useState(false);

  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Email || !formData.Password) {
      return toast.error("Invalid Credentials");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.Email)) {
      return toast.error("Please enter a valid email address");
    }

    if (formData.Password.length < 8) {
      return toast.error("Password must be at least 8 characters long"); 
    }

    try {
      const response = await axios.post(`${apiUrl}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("response", response);
      

      const userId = response.data.payload?.id;
      
      if (!userId) {
        return toast.error("User ID not found in response");
      }
      
      toast.success("Login successfully");
      localStorage.setItem('token', response.data.token);
  
      setTimeout(() => {
        navigate(`/dashboard/${userId}`); 
      }, 3000);
      
    } catch (error) {
      console.log("error", error);

      if (error.response) {
        const errorMessage =
          error.response.data.message || "Login failed"; 
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("Network error. Please check your connection");
      } else {
        toast.error("Something went wrong. Please try again");
      }
    }
  };
  
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-blue-100">Sign in to continue</p>
          </div>

          <div className="p-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={viewPassword ? "text" : "password"}
                    name="Password"
                    value={formData.Password}
                    onChange={handleChange}
                    placeholder="Enter your password (min. 8 characters)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    required
                  />
                  <span 
                    onClick={handleViewPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                  >
                    {viewPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
              </div>

              <div className="text-right">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Login
              </button>

              <p className="text-center text-gray-600 mt-4">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Login;