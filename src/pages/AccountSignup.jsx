import React from 'react';
import { FaPortrait } from 'react-icons/fa';

const AccountSignup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Create your Account</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Job Seeker Card */}
          <div className="bg-white md:px-24 shadow-md md:w-11/12 rounded-lg p-8 flex flex-col items-center">
            <div className="text-purple-600 mb-4">
              <span className="md:text-8xl">
                <img src="https://www.jobberman.com/static-assets/img/jobberman-theme/seeker.svg" alt="Job Seeker" />
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-4">Job Seeker</h2>
            <p className="text-gray-500 mb-6">
              Are you looking for your dream job? Create a unique career profile with Jobsearch
            </p>
            <button className="bg-[#004ab9] text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700">
              <a href="/jobseekeer">
               Sign up as job seeker
              </a>
            </button>
          </div>

          {/* Employer Card */}
          <div className="bg-white md:px-24 shadow-md rounded-lg p-8 flex flex-col items-center">
            <div className="text-purple-600 mb-4">
              <img src="	https://www.jobberman.com/static-assets/img/jobberman-theme/employer.svg" alt="" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Employer</h2>
            <p className="text-gray-500 mb-6">
              Are you looking for quality candidates? Advertise and search with Jobsearch
            </p>
            <button className="bg-[#004ab9] text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700">
             <a href="/jobsignup">
                Sign up as employer
             </a> 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSignup;
