import React from 'react';

const Navbar = () => {
 

  return (
    <div className=" bg-gray-100">
  <header className="bg-white shadow-md">
        <nav className="container mx-auto flex justify-between items-center p-4">
          <div className="text-2xl font-bold text-blue-600">Job<span className="text-gray-800">Search</span></div>
          <ul className="hidden md:flex space-x-8 font-medium text-gray-600">
            <li><a href="#" className="hover:text-blue-600">Home</a></li>
            <li><a href="#" className="hover:text-blue-600">Jobs</a></li>
            <li><a href="#" className="hover:text-blue-600">Companies</a></li>
            <li><a href="#" className="hover:text-blue-600">Contact</a></li>
            {/* <li><a href="#" className="hover:text-blue-600">Blog</a></li> */}
          </ul>
          <div className="hidden md:flex space-x-4">
            <button className="text-gray-600 hover:text-blue-600">Login</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Register</button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
