import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import axios from "axios"

const apiUrl = import.meta.env.VITE_REACT_URL;
console.log('api url', apiUrl)

const Register = () => {
  const navigate = useNavigate(); 
  const [viewPassword, setViewPassword] = useState(false);
  const [formData, setFormData] = useState({
    FullName: "",
    Gender: "", 
    ContactNumber: "",
    Email: "",
    Address: "",
    Password: ""
  })
  
  console.log('form data', formData)
  const Gender = ['male', 'female', 'other']

  const handleViewPassword = () => {
    setViewPassword(!viewPassword)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    

    if (!formData.FullName || !formData.Address || !formData.ContactNumber || 
        !formData.Email || !formData.Gender || !formData.Password) {
      return toast.error('All fields are required')
    }

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.Email)) {
      return toast.error('Please enter a valid email address')
    }


    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(formData.ContactNumber)) {
      return toast.error('Please enter a valid 10-digit contact number')
    }

 
    if (formData.Password.length < 8) {
      return toast.error('Password must be at least 6 characters long')
    }

    try {
      const response = await axios.post(`${apiUrl}/register`, formData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      
      console.log('response', response)
      toast.success('User created successfully')
      
      setTimeout(() => {
        navigate('/login')
      }, 3000)
      
    } catch (error) {
      console.log('error', error)
   
      if (error.response) {
        
        const errorMessage = error.response.data.message || 'Registration failed'
        toast.error(errorMessage)
      } else if (error.request) {
       
        toast.error('Network error. Please check your connection')
      } else {
      
        toast.error('Something went wrong. Please try again')
      }
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
      
            <div className="md:w-1/3 bg-gradient-to-b from-blue-800 to-blue-900 p-8 flex flex-col items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">SAU</h1>
                <p className="text-blue-200 text-sm">South Asian University</p>
                <div className="h-px bg-blue-700 my-4"></div>
                <p className="text-blue-300 text-xs">RTI Management System</p>
              </div>
            </div>

          
            <div className="md:w-2/3 p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
                <p className="text-gray-600">Register for RTI Management Portal</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="FullName"
                      value={formData.FullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

             
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      name="Gender" 
                      value={formData.Gender} 
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      {
                        Gender.map((item, index) => {
                          return (
                            <option key={index} value={item}>{item}</option>
                          )
                        })
                      }
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="ContactNumber"
                      value={formData.ContactNumber}
                      onChange={handleChange}
                      placeholder="Enter 10-digit contact number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength="10"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Email ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="Email"
                      value={formData.Email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="Address"
                      value={formData.Address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
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
                        placeholder="Create password (min. 6 characters)"
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
                    <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                  >
                    Register
                  </button>
                </div>

                <p className="text-center text-gray-600 mt-4">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  )
}

export default Register