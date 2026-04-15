import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const apiUrl = import.meta.env.VITE_REACT_URL;
console.log('api url', apiUrl);

const RTIRegistrationForm = () => {
  const [formData, setFormData] = useState({
    applicantName: '',
    gender: '',
    contactNumber: '',
    emailId: '',
    address: '',
    rtiCaseNumber: '',
    subject: '',
    applicationMode: '',
    dateOfReceipt: '',
    description: '',
    department: '',
    assignedOfficer: '',
    dueDate: '',
    extendedDueDate: '',
    reminderFrequency: '',
  });
  console.log('rti form data', formData);

  const [uploadApplication, setUploadApplication] = useState(null);
  const [additionalAttachments, setAdditionalAttachments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [activeSection, setActiveSection] = useState('applicant');
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Decoded token:', decoded);
        setUserId(decoded.id);
      } catch (error) {
        console.error('Error decoding token:', error);
        toast.error('Session expired. Please login again.');
      }
    } else {
      console.log('No token found');
      toast.error('Please login to submit RTI application');
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
  
      if (file.type !== 'application/pdf') {
        toast.error('Only PDF files are allowed');
        return;
      }
      if (type === 'application') {
        setUploadApplication(file);
      } else {
        setAdditionalAttachments(file);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!userId) {
      toast.error('User not authenticated. Please login again.');
      return;
    }

    const requiredFields = ['applicantName', 'contactNumber', 'rtiCaseNumber', 'subject', 
                           'applicationMode', 'dateOfReceipt', 'department', 'dueDate', 'reminderFrequency'];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill all required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (formData.emailId && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.emailId)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    if (!/^\d{10}$/.test(formData.contactNumber)) {
      toast.error('Please enter a valid 10-digit contact number');
      return;
    }

    if (formData.gender && !['male', 'female', 'other'].includes(formData.gender)) {
      toast.error('Please select a valid gender option');
      return;
    }

    if (!['online', 'offline', 'post', 'in-person'].includes(formData.applicationMode)) {
      toast.error('Please select a valid application mode');
      return;
    }
    
    if (!['daily', 'weekly', 'bi-weekly', 'monthly'].includes(formData.reminderFrequency)) {
      toast.error('Please select a valid reminder frequency');
      return;
    }

    setLoading(true);
    
    try {
      const formDataToSend = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      if (uploadApplication) {
        formDataToSend.append('applicationDocument', uploadApplication);
      }
     
      const token = localStorage.getItem('token');
      
      const response = await axios.post(`${apiUrl}/form/${userId}`, formDataToSend, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('response', response);
      toast.success('RTI Application Submitted Successfully!');
      
      setFormData({
        applicantName: '',
        gender: '',
        contactNumber: '',
        emailId: '',
        address: '',
        rtiCaseNumber: '',
        subject: '',
        applicationMode: '',
        dateOfReceipt: '',
        description: '',
        department: '',
        assignedOfficer: '',
        dueDate: '',
        extendedDueDate: '',
        reminderFrequency: '',
      });
      setUploadApplication(null);
      setAdditionalAttachments(null);
      
      // Scroll to top on success
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      console.log('error', error);
      
      if (error.response) {
        const errorMessage = error.response.data.message || 'Failed to submit application';
        
        if (error.response.data.message === 'RTI case number already exists') {
          toast.error('This RTI Case Number already exists. Please use a unique number.');
        } else if (error.response.data.errors) {
          const errorMessages = Object.values(error.response.data.errors).join(', ');
          toast.error(`Validation Error: ${errorMessages}`);
        } else if (error.response.status === 401) {
          toast.error('Session expired. Please login again.');
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        } else {
          toast.error(errorMessage);
        }
      } else if (error.request) {
        toast.error('Network error. Please check your connection');
      } else {
        toast.error('Something went wrong. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  // Scroll to section on mobile
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  // Section configuration for mobile navigation
  const sections = [
    { id: 'applicant', name: 'Applicant Details', icon: '👤' },
    { id: 'rti', name: 'RTI Details', icon: '📋' },
    { id: 'department', name: 'Department Details', icon: '🏢' },
    { id: 'timeline', name: 'Timeline Details', icon: '⏰' },
    { id: 'documents', name: 'Documents', icon: '📎' }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 lg:px-8 w-full">
        <div className="max-w-7xl mx-auto">
          
          {/* Mobile Navigation Tabs */}
          {isMobile && (
            <div className="mb-4 overflow-x-auto sticky top-0 z-10 bg-white shadow-sm rounded-lg">
              <div className="flex min-w-max px-2 py-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center space-x-1 px-3 py-2 mx-1 rounded-lg transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-sm">{section.icon}</span>
                    <span className="text-xs sm:text-sm whitespace-nowrap">{section.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 md:space-y-8">
            <div>
            
              {isMobile && (
                <h3 className="text-lg font-semibold text-gray-800 mb-3 px-2">RTI Registration</h3>
              )}

             
              <div id="applicant" className="bg-white rounded-lg shadow-md mb-4 sm:mb-6 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-white px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                    <span className="mr-2">👤</span>
                    Applicant Details
                  </h4>
                </div>
                <div className="p-3 sm:p-4 md:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Applicant Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="applicantName"
                        value={formData.applicantName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Contact Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                        pattern="[0-9]{10}"
                        maxLength="10"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email ID</label>
                      <input
                        type="email"
                        name="emailId"
                        value={formData.emailId}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter your full address"
                      />
                    </div>
                  </div>
                </div>
              </div>

            
              <div id="rti" className="bg-white rounded-lg shadow-md mb-4 sm:mb-6 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-white px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                    <span className="mr-2">📋</span>
                    RTI Details
                  </h4>
                </div>
                <div className="p-3 sm:p-4 md:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        RTI Case Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="rtiCaseNumber"
                        value={formData.rtiCaseNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Application Mode <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="applicationMode"
                        value={formData.applicationMode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      >
                        <option value="">Select Mode</option>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                        <option value="post">Post</option>
                        <option value="in-person">In Person</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Date of Receipt <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="dateOfReceipt"
                        value={formData.dateOfReceipt}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter detailed description of your RTI application"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Department Details Section */}
              <div id="department" className="bg-white rounded-lg shadow-md mb-4 sm:mb-6 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-white px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                    <span className="mr-2">🏢</span>
                    Department Details
                  </h4>
                </div>
                <div className="p-3 sm:p-4 md:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Department <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                        placeholder="Enter department name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Assigned Officer</label>
                      <input
                        type="text"
                        name="assignedOfficer"
                        value={formData.assignedOfficer}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter officer name"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Details Section */}
              <div id="timeline" className="bg-white rounded-lg shadow-md mb-4 sm:mb-6 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-white px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                    <span className="mr-2">⏰</span>
                    Timeline Details
                  </h4>
                </div>
                <div className="p-3 sm:p-4 md:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Due Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Extended Due Date</label>
                      <input
                        type="date"
                        name="extendedDueDate"
                        value={formData.extendedDueDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Reminder Frequency <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="reminderFrequency"
                        value={formData.reminderFrequency}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      >
                        <option value="">Select Frequency</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="bi-weekly">Bi-Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Documents Section */}
              <div id="documents" className="bg-white rounded-lg shadow-md mb-4 sm:mb-6 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-white px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                    <span className="mr-2">📎</span>
                    Upload Documents (Optional)
                  </h4>
                </div>
                <div className="p-3 sm:p-4 md:p-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Upload Application (PDF only)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-blue-500 transition-all duration-200">
                      <input
                        type="file"
                        id="application-upload"
                        accept=".pdf"
                        onChange={(e) => handleFileChange(e, 'application')}
                        className="hidden"
                      />
                      <label htmlFor="application-upload" className="cursor-pointer block">
                        <div className="text-gray-600">
                          <svg className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="text-xs sm:text-sm mb-1">Drop file here or <span className="text-blue-600 hover:text-blue-700 font-medium">Click to browse</span></p>
                          <p className="text-xs text-gray-500">Accepted: PDF only</p>
                          <p className="text-xs text-gray-500">Max size: 5MB</p>
                          {uploadApplication && (
                            <div className="mt-3 p-2 bg-green-50 rounded-md">
                              <p className="text-xs sm:text-sm text-green-600 flex items-center justify-center">
                                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {uploadApplication.name}
                              </p>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="sticky bottom-0 sm:relative bg-white sm:bg-transparent p-3 sm:p-0 -mx-3 sm:mx-0 rounded-t-lg shadow-lg sm:shadow-none">
                <div className="flex flex-col sm:flex-row gap-3 justify-end max-w-md sm:max-w-full mx-auto sm:mx-0">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        applicantName: '',
                        gender: '',
                        contactNumber: '',
                        emailId: '',
                        address: '',
                        rtiCaseNumber: '',
                        subject: '',
                        applicationMode: '',
                        dateOfReceipt: '',
                        description: '',
                        department: '',
                        assignedOfficer: '',
                        dueDate: '',
                        extendedDueDate: '',
                        reminderFrequency: '',
                      });
                      setUploadApplication(null);
                      setAdditionalAttachments(null);
                    }}
                    className="px-4 py-2 sm:px-6 sm:py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors text-sm sm:text-base"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 sm:px-6 sm:py-2 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors text-sm sm:text-base ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: '14px',
            maxWidth: '500px',
          },
          success: {
            style: {
              background: '#10B981',
              color: 'white',
            },
          },
          error: {
            style: {
              background: '#EF4444',
              color: 'white',
            },
          },
        }}
      />
    </>
  );
};

export default RTIRegistrationForm;