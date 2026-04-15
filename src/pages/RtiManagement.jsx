import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_REACT_URL;
console.log('api url', apiUrl);

const RtiManagement = () => {
  const { id } = useParams();
  console.log('iddddd', id);
  const [rtiData, setRtiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserRti = async () => {
      try {
        setLoading(true);
        setError(null);
        
     
        const cleanId = id?.replace(/^:/, '');
        
        if (!cleanId) {
          throw new Error('No ID provided');
        }
        
        console.log('Fetching with ID:', cleanId);
        const response = await axios.get(`${apiUrl}/form-data/${cleanId}`);
        console.log('this is response from management', response);
        
        if (response.data.success) {
          if (response.data.data && response.data.data.length > 0) {
            setRtiData(response.data.data[0]);
          } else if (response.data.data && !Array.isArray(response.data.data)) {
      
            setRtiData(response.data.data);
          } else {
            setError('No RTI data found');
          }
        } else {
          setError(response.data.message || 'Failed to fetch RTI data');
        }
      } catch (error) {
        console.error('Error fetching RTI data:', error);
        if (error.response) {
          setError(`Server error: ${error.response.data?.message || error.response.statusText}`);
        } else if (error.request) {
          setError('No response from server. Please check your connection.');
        } else {
          setError(error.message || 'An error occurred while fetching data');
        }
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchUserRti();
    } else {
      setError('No RTI ID provided');
      setLoading(false);
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const formatStatus = (status) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-purple-100 text-purple-800'
    };
    const colorClass = statusColors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
    return colorClass;
  };

  const getStatusDisplayText = (status) => {
    if (!status) return 'PENDING';
    return status.toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading RTI details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-md w-full">
            <div className="text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Data</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!rtiData) {
    return (
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-md w-full text-center">
            <div className="text-gray-500 text-5xl mb-4">📄</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No RTI Data Found</h3>
            <p className="text-gray-600">No RTI application found for this user.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
   
      <div className="md:hidden bg-white shadow-sm fixed top-0 left-0 right-0 z-20">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-gray-800">RTI Management</h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar with mobile responsiveness */}
      <div className={`
        fixed md:relative z-30 transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:translate-x-0
      `}>
        <Sidebar />
      </div>

     
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      <div className="flex-1 overflow-y-auto pt-16 md:pt-0">
       
        <div className="hidden md:block bg-white shadow-sm sticky top-0 z-10">
          <div className="px-4 sm:px-6 py-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">RTI Management</h1>
          </div>
        </div>

        <div className="p-3 sm:p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            
          
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800">Applicant Details</h2>
                </div>
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <label className="text-xs sm:text-sm text-gray-500 font-medium">Applicant Name</label>
                    <p className="text-sm sm:text-base text-gray-800 font-medium mt-1 break-words">{rtiData.applicantName || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-gray-500 font-medium">Email ID</label>
                    <p className="text-sm sm:text-base text-gray-800 mt-1 break-words">{rtiData.emailId || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-gray-500 font-medium">Gender</label>
                    <p className="text-sm sm:text-base text-gray-800 mt-1 capitalize break-words">{rtiData.gender || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-gray-500 font-medium">Contact Number</label>
                    <p className="text-sm sm:text-base text-gray-800 mt-1 break-words">{rtiData.contactNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-gray-500 font-medium">Address</label>
                    <p className="text-sm sm:text-base text-gray-800 mt-1 break-words">{rtiData.address || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800">RTI Details</h2>
                </div>
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs sm:text-sm text-gray-500 font-medium">RTI Case Number</label>
                      <p className="text-sm sm:text-base text-gray-800 font-mono mt-1 break-words">{rtiData.rtiCaseNumber || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm text-gray-500 font-medium">Application Mode</label>
                      <p className="text-sm sm:text-base text-gray-800 mt-1 capitalize break-words">{rtiData.applicationMode || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm text-gray-500 font-medium">Date of Receipt</label>
                      <p className="text-sm sm:text-base text-gray-800 mt-1 break-words">{formatDate(rtiData.dateOfReceipt)}</p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm text-gray-500 font-medium">Status</label>
                      <p className="mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${formatStatus(rtiData.status)}`}>
                          {getStatusDisplayText(rtiData.status)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-gray-500 font-medium">Subject</label>
                    <p className="text-sm sm:text-base text-gray-800 mt-1 break-words">{rtiData.subject || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-gray-500 font-medium">Description</label>
                    <p className="text-sm sm:text-base text-gray-800 mt-1 leading-relaxed break-words">{rtiData.description || 'N/A'}</p>
                  </div>
                </div>
              </div>

        
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800">Department Details</h2>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs sm:text-sm text-gray-500 font-medium">Department</label>
                      <p className="text-sm sm:text-base text-gray-800 mt-1 break-words">{rtiData.department || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm text-gray-500 font-medium">Assigned Officer</label>
                      <p className="text-sm sm:text-base text-gray-800 mt-1 break-words">{rtiData.assignedOfficer || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800">Timeline Details</h2>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs sm:text-sm text-gray-500 font-medium">Due Date</label>
                      <p className="text-sm sm:text-base text-gray-800 mt-1 font-medium break-words">{formatDate(rtiData.dueDate)}</p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm text-gray-500 font-medium">Extended Due Date</label>
                      <p className="text-sm sm:text-base text-gray-800 mt-1 break-words">{formatDate(rtiData.extendedDueDate)}</p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm text-gray-500 font-medium">Reminder Frequency</label>
                      <p className="text-sm sm:text-base text-gray-800 mt-1 capitalize break-words">{rtiData.reminderFrequency || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RtiManagement;