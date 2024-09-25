import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosMenu } from "react-icons/io";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className=" bg-gray-100 w-full fixed mb-16">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto flex justify-between items-center p-4">
          <div className="text-2xl font-bold text-blue-600">
            <Link to="/home">Hire<span className="text-gray-800">Spot</span></Link>
          </div>
          <ul className="hidden md:flex space-x-8 font-medium text-gray-600">
            <li><Link to="#" className="hover:text-blue-600">Home</Link></li>
            <li><Link to="/" className="hover:text-blue-600">Jobs</Link></li>
            <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
            <li><Link to="#" className="hover:text-blue-600">Contact</Link></li>
          </ul>
          <div className="hidden md:flex space-x-4">
            <button className="text-gray-600 hover:text-blue-600">
              <Link to="/login">Login</Link>
            </button>
            <button className="text-gray-600 hover:text-blue-600">
              <Link to="/accountsignup">Sign Up</Link>
            </button>
            <button className="bg-blue-600 text-white text-sm px-4 py-1 rounded-lg hover:bg-blue-700">
              <Link to="/loginjobposter">Post A Job</Link>
            </button>
            
          </div>
          {/* Mobile menu */}
          <div className="md:hidden">
            <button onClick={toggleDropdown} className="text-gray-600 hover:text-blue-600">
              <IoIosMenu size={30} />
            </button>
          </div>
        </nav>
        {/* Dropdown Menu for Mobile */}
        {dropdownOpen && (
          <ul className="md:hidden bg-white shadow-md mt-2 font-medium text-gray-600 space-y-2 p-4">
            <div className="flex space-x-10">
            <li><Link to="/login" className="block hover:text-blue-600">Login</Link></li>
            <li><Link to="/accountsignup" className="block hover:text-blue-600">Sign Up</Link></li>
            </div>
            <li><Link to="/" className="block hover:text-blue-600">Home</Link></li>
            <li><Link to="/jobs" className="block hover:text-blue-600">Jobs</Link></li>
            <li><Link to="/about" className="block hover:text-blue-600">About</Link></li>
            <li><Link to="/contact" className="block hover:text-blue-600">Contact</Link></li>
            
            <li>
              <button className="bg-blue-600 text-white text-sm px-4 py-1 rounded-lg hover:bg-blue-700">
                <Link to="/loginjobposter">Post A Job</Link>
              </button>
            </li>
          </ul>
        )}
      </header>
    </div>
  );
};

export default Navbar;
