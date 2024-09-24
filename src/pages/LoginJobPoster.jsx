import React, { useState, useContext } from 'react'; 
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaGoogle, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import img1 from "../assets/images/loginimg.png";
import img2 from "../assets/images/loginiimg2.png";
import img3 from "../assets/images/loginimg3.png";
import AppContext from '../context/AppContext'; // Import AppContext

const LoginJobPoster = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useContext(AppContext); // Access loginUser from context

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    await loginUser(userData); // Call the loginUser function with email and password
  };

  return (
    <div className="min-h-screen div-container">
      <div className="social flex w-full">
        <div className="flex my-28 flex-col justify-start py-5 w-full md:px-6 md:w-2/6">
          <div className="w-full">
            <div className="font-bold text-2xl pb-3">
              <h1>Log in and get productive</h1>
            </div>

            <p className="text-gray-500 mb-4 text-sm">
              Use your social account to log in
            </p>

            <div className="flex w-full space-x-4 mb-4">
              {/* Facebook Button */}
              <div className="flex items-center justify-center border w-[7rem] h-10 border-gray-400 hover:border-gray-500 rounded-md">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-1 font-bold rounded-full flex items-center justify-center">
                  <FaFacebookF size={18} />
                </button>
              </div>

              {/* Google Button */}
              <div className="flex items-center justify-center border w-[7rem] h-10 border-gray-400 hover:border-gray-500 rounded-md">
                <button className="text-red-500 items-center justify-center font-bold rounded-full flex">
                  <FaGoogle size={18} />
                </button>
              </div>

              {/* LinkedIn Button */}
              <div className="flex items-center justify-center border border-gray-400 hover:border-gray-500 rounded-md w-[7rem] h-10">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-1 rounded-full flex items-center justify-center">
                  <FaLinkedinIn size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center w-full">
              <hr className="border-t border-gray-300 flex-grow mx-2" />
              <span className="text-gray-400 text-sm">Or continue with</span>
              <hr className="border-t border-gray-300 flex-grow mx-2" />
            </div>
          </div>

          {/* Login section */}
          <div className="flex px-3 flex-col justify-start py-2 w-full md:px-1 bg-white">
            <form onSubmit={handleLogin}>
              {/* Email input */}
              <input
                type="email"
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-3 w-full items-center px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                required
              />

              {/* Password input with show/hide icon */}
              <div className="relative mt-4 w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-1 border border-gray-400 rounded-md focus:outline-none focus:border-gray-500"
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>

              <a
                href="/forgot-password"
                className="flex md:w-3/5 py-3 font-bold text-blue-700 hover:text-blue-500 text-sm"
              >
                Forgot Password?
              </a>

              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded-md py-1 w-full font-bold hover:bg-blue-700"
                >
                  <Link to="/JobPostForm">Log in</Link>
                </button>
              </div>

              <p className="mt-2 md:text-center text-gray-600">
                Don't have an account?{" "}
                <a href="/accountsignup" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign up 
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* Conditional Image display for different screen sizes */}
        <div className=" h-[100vh] hidden md:flex">
          <img src={img1} alt="Login Image 1" className="block md:hidden lg:hidden xl:hidden" />
          <img src={img2} alt="Login Image 2" className="hidden md:block lg:hidden xl:hidden" />
          <img src={img3} alt="Login Image 3" className="hidden lg:block xl:block w-[53rem] h-[41rem]" />
        </div>
      </div>
    </div>
  );
};

export default LoginJobPoster;

















