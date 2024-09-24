import React, { useState } from 'react';
import { FaEye, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import useCountries from '../useCountries';

const Register = () => {
  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showInfo, setShowInfo] = useState(false); // For showing password info

  // Fetch countries using useCountries hook
  const { countries, loading, error } = useCountries();

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordToggle = () => {
    setShowPassword(prev => !prev);
  };

  const toggleInfo = () => {
    setShowInfo(prev => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullPhoneNumber = `${selectedCountry?.value} ${phoneNumber}`;
    console.log({
      firstName,
      lastName,
      email,
      password,
      day,
      month,
      year,
      gender,
      selectedCountry,
      fullPhoneNumber
    });
  };

  return (
    <div className="w-full grid mx-auto justify-center">
      <div className="container text-center mx-auto">
        <h1 className="font-bold py-4 text-lg md:text-xl">Create a Job Seeker Account</h1>
        <h3 className="font-semibold pb-5">Your new career is one click away</h3>
      </div>

      {/* Personal info section */}
      <div className="flex flex-col bg-gray-50 md:flex-row gap-1 md:gap-x-0 border container rounded-lg md:pr-3">
        <div className="w-full px-3 md:w-1/3 md:p-4" id="personal">
          <h1 className="text-xl font-bold pb-3">Personal Information</h1>
          <p className="text-gray-500">This is information pertaining to you as an individual</p>
        </div>

        
        {/* Personal info form */}
        <form onSubmit={handleSubmit} className="grid bg-white grid-cols-1 border-2 rounded-md md:grid-cols-2  px-3 gap-1 w-full py-4 my-8">
          {/* First and Last Name */}
          <div>
            <label className="block font-medium" htmlFor="firstName">First Name <span className="text-red-600 text-lg">*</span></label>
            <input
              type="text"
              id="firstName"
              className="border border-gray-400 px-2 py-1 outline-none focus:border-gray-500 rounded-md w-full"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium" htmlFor="lastName">Last Name <span className="text-red-600 text-lg">*</span></label>
            <input
              type="text"
              id="lastName"
              className="border border-gray-400 outline-none px-2 py-1 focus:border-gray-500 rounded-md w-full"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium" htmlFor="email">Email Address <span className="text-red-600 text-lg">*</span></label>
            <input
              type="email"
              id="email"
              className="border border-gray-400 outline-none px-2 py-1 focus:border-gray-500 rounded-md w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block font-medium" htmlFor="password">Password <span className="text-red-600 text-lg">*</span></label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="border border-gray-400 outline-none px-2 py-1 focus:border-gray-500 rounded-md w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaEye
              className="absolute top-10 right-4 cursor-pointer"
              onClick={handlePasswordToggle}
            />
            <FaInfoCircle
              className="absolute top-10 right-12 text-gray-400 cursor-pointer"
              onClick={toggleInfo}
            />
            {showInfo && <p className="absolute top-14 right-12 bg-white p-2 border border-gray-500 rounded-md text-sm">Password must be at least 8 characters long.</p>}
          </div>

          {/* Date of Birth */}
          <div className="md:col-span-2 grid grid-cols-3 gap-2">
            <div>
              <label className="block font-medium">Day <span className="text-red-600 text-lg">*</span></label>
              <select
                className="w-full p-2 border border-gray-400 outline-none focus:border-gray-500 rounded"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                required
              >
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium">Month <span className="text-red-600 text-lg">*</span></label>
              <select
                className="w-full p-2 border border-gray-400 outline-none focus:border-gray-500 rounded"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                required
              >
                <option value="">Month</option>
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium">Year <span className="text-red-600 text-lg">*</span></label>
              <select
                className="w-full p-2 border border-gray-400 outline-none focus:border-gray-500 rounded"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              >
                <option value="">Year</option>
                {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block font-medium">Gender <span className="text-red-600 text-lg">*</span></label>
            <select
              className="w-full p-2 border border-gray-400 outline-none focus:border-gray-500 rounded"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Country */}
          <div className="md:col-span-1">
            <label className="block font-medium">Country <span className="text-red-600 text-lg">*</span></label>
            <Select
              options={countries}
              value={selectedCountry}
              onChange={setSelectedCountry}
              placeholder="Select a country..."
              className="w-full"
              isSearchable
              required
            />
          </div>

          {/* Phone Number */}
          <div className="md:col-span-1 md:flex md:items-center md:space-x-2">
            <div className="w-full">
              <label className="block font-medium">Mobile Number <span className="text-red-600 text-lg">*</span></label>
              <input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="border border-gray-400 w-full px-2 py-1 focus:border-gray-500 rounded-md outline-none"
                required
              />
            </div>
          </div>

          {/* Register Button */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Register
            </button>
          </div>

          {/* Already Registered? */}
          <div className="text-center mt-4">
            <p>Already registered? <Link to="/login">
            <button className="text-blue-700 font-semibold">Login</button>
            </Link>
            </p>
          </div>
        </form>
        
    </div>
    </div>
    
  );
};

export default Register;
