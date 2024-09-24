import React, { useState, useRef} from 'react';
import { FaArrowDownLong } from 'react-icons/fa6';

const JobSignup = () => {
  const [isStep1Complete, setIsStep1Complete] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    position: '',
    countryCode: '',
    phoneNumber: '',
  });

  // Create a ref for the Step 2 form
  const step2Ref = useRef(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep1 = (e) => {
    e.preventDefault();

    // Check if all fields in Step 1 are filled
    const { firstName, lastName, email, password, position, countryCode, phoneNumber } = formData;
    
    // Ensure no field is empty
    if (firstName && lastName && email && password && position && countryCode && phoneNumber) {
      setIsStep1Complete(true); // Enable Step 2

      // Scroll to Step 2 after validation
      step2Ref.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert('Please fill out all fields in Step 1');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
        <h2 className="text-2xl font-semibold mb-6">Create an Employer Account</h2>
        <p className="text-gray-600 mb-4">Reach top talent and find the right candidate today</p>
      <div className="w-full max-w-5xl bg-white shadow-md rounded-md p-6">

        {/* Step 1: Company Representative Info */}
        <div className="flex flex-col md:flex-row rounded-md shadow-md bg-gray-50 md:pr-4 py-8 shadow-gray-100">
          <div className="w-full md:w-2/6">
          <h3 className="text-xl font-semibold mb-4">Company Representative Information</h3>
          <p className="text-gray-500">
            This is information pertaining to you as a representative of the company.
          </p>
          </div>
          <form onSubmit={validateStep1} className="border md:w-4/6 bg-white rounded-md border-gray-300 hover:border-gray-400 p-2 md:p-">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-2">First Name <span className="text-red-600 text-lg">*</span></label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter first name"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Last Name <span className="text-red-600 text-lg">*</span></label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter last name"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Work Email <span className="text-red-600 text-lg">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter work email"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Create Password <span className="text-red-600 text-lg">*</span></label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter password"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Position in Company <span className="text-red-600 text-lg">*</span></label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select...</option>
                  <option>Manager</option>
                  <option>HR</option>
                  <option>CEO</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium mb-2">Country Code <span className="text-red-600 text-lg">*</span></label>
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="Nigeria">Nigeria (+234)</option>
                    {/* Add more country options */}
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-2">Phone Number <span className="text-red-600 text-lg">*</span></label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>
            </div>
            <div id="Here" className="mt-4 md:justify-start flex justify-center">
              <p className="text-gray-600 text-sm">
                Already have an account? 
                <a href="/JobPostForm" className="text-blue-600  hover:text-blue-800 font-semibold ml-1">
                  Login
                </a>
                </p>
            </div>

            <div className="text-sm py-6">
              <p>
                By clicking "Next", you agree to the
                <a href="#" className="text-blue-600 px-1">
                  Terms and Conditions
                </a> 
                 and 
                <a  href="#" className="text-blue-600 px-1">
                  Privacy Policy
                </a>
                of Job Signup. You are also required to verify your email address with the company's email service provider.
              </p>
            </div>

            <div id="validate" className="flex flex-row justify-end mt-6">
              <button
                type="submit"
                className=" px-2 py-2 flex bg-blue-600 text-white rounded-md"
              >
                Next
                <span className="text-blue-700 py- rounded-md mx-1 text-sm bg-white px-1 py-1 text-center w-full"><FaArrowDownLong /></span>  
              </button>
            </div>
          </form>
        </div>
      </div>
      <h1 className="justify-center text-xl items-center py-8 font-extralight">Step 2 of 2</h1>

      {/* Step 2: Company Information - Disabled until Step 1 is complete */}
      <div ref={step2Ref} className={`w-full max-w-5xl bg-white shadow-md rounded-md p-2 md:p-6 ${!isStep1Complete ? 'opacity-50 pointer-events-none' : ''}`}>
      <div className={`mb-6 ${!isStep1Complete ? 'opacity-50 pointer-events-none' : ''} flex flex-col md:flex-row rounded-md shadow-md bg-gray-100 py-8 shadow-gray-100`}>
        <div className="md:w-2/6">
            <h3 className="text-xl text-center md:text-start font-semibold mb-4"> Company Information</h3>
            <p className="text-gray-500 text-center md:text-start md:pr-8
            pb-2 md:pb-0">
                This information pertains to your company
            </p>
        </div>
          
          <form id="form2" className="border md:w-4/6 bg-white rounded-md border-gray-300 hover:border-gray-400 py-2">
            <div className="grid  md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-2">Company Name <span className="text-red-600 text-lg">*</span></label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-400 hover:border-gray-500 rounded-md"
                  placeholder="Enter company name"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Industry <span className="text-red-600 text-lg">*</span></label>
                <select className="w-full p-2 border border-gray-400 hover:border-gray-500 rounded-md" required>
                  <option value="">Select...</option>
                  <option>Tech</option>
                  <option>Finance</option>
                  <option>Healthcare</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-2">Number of EE <span className="text-red-600 text-lg">*</span></label>
                <select className="w-full p-2 border border-gray-400 hover:border-gray-500 rounded-md" required>
                  <option value="">Select...</option>
                  <option>1-10</option>
                  <option>11-50</option>
                  <option>51-200</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-2">Type of Employer <span className="text-red-600 text-lg">*</span></label>
                <select className="w-full p-2 border border-gray-400 hover:border-gray-500 rounded-md" required>
                  <option value="">Select...</option>
                  <option>Direct employer</option>
                  <option>Agency</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-2">Website <span className="text-red-600 text-lg">*</span></label>
                <input
                  type="url"
                  className="w-full p-2 border border-gray-400 hover:border-gray-500 rounded-md"
                  placeholder="Enter company website"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Contact Person <span className="text-red-600 text-lg">*</span></label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-400 hover:border-gray-500 rounded-md"
                  placeholder="Enter contact person"
                  required
                />
              </div>

              <div className="md:pl-2">
                <label className="block font-medium mb-2">Country <span className="text-red-600 text-lg">*</span></label>
                <select className="w-full p-2 border border-gray-400 hover:border-gray-500 rounded-md" required>
                  <option value="">Select...</option>
                  <option>Nigeria</option>
                  <option>USA</option>
                  <option>UK</option>
                </select>
              </div>

              <div className="md:pr-3">
                <label className="block font-medium mb-2">Phone Number <span className="text-red-600 text-lg">*</span></label>
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-400 rounded-md"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="col-span-2 md:px-3">
                <label className="block font-medium mb-2">Address <span className="text-red-600 text-lg">*</span></label>
                <textarea
                  className="w-full p-2 border border-gray-400 rounded-md"
                  placeholder="Enter address"
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>

            <div className="">
            <div className="flex items-center mt-4">
              <input type="checkbox" className="mr-2 border-gray-400 hover:border-gray-500" required />
              <label className="text-sm">
                I agree to the{' '}
                <a href="#" className="text-blue-600">
                  TERMS & CONDITIONS
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600">
                  PRIVACY POLICY
                </a>
              </label>
            </div>

            <div className="flex p-3 md:border-t border-gray-400 justify-end mt-6">
              <button
                type="submit"
                className="px-2 py-1 bg-blue-600 text-sm text-white rounded-md"
              >
                Create Your Account
              </button>
            </div>
            </div>
          </form>
        </div>
        </div>
    </div>
  );
};

export default JobSignup;
