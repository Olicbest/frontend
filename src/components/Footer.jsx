import React from 'react';
import { FaFacebookF } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import google1 from '../assets/images/google.png';
const Footer = () => {
  return (
    <footer className="bg-white py-6 px-16 shadow-2xl shadow-gray-400 mt-12">
      <p className="text-sm text-center pb-3 md:text-left text-gray-600 ">Follow us on:</p>
      <div className="container justify-center mx-auto flex flex-col md:flex-row md:mb-0 px-4">
        {/* Social Icons */}
        <div className="flex items-center justify-center space-x-4  mb-4 ">
          
          <a href="#" className="text-white p-1 rounded-full bg-pink-600">
            <i className="text-lg">
              <FaInstagram />
            </i>
          </a>
          <a href="#" className="text-white p-1 rounded-full bg-blue-700">
            <i className="text-lg">
              <FaFacebookF />
            </i>
          </a>
          <a href="#" className="text-white p-1 rounded-full bg-blue-500">
            <i className="fab fa-linkedin fa-lg">
              <FaLinkedinIn />
            </i>
          </a>
          <a href="#" className="text-white p-1 rounded-full bg-black">
            <i className="text-lg">
              <FaXTwitter />
            </i>
          </a>
          <a href="#" className="text-white p-1 rounded-full bg-red-600">
            <i className="text-lg">
              <FaYoutube />
            </i>
          </a>
          <a href="#" className="text-white p-1 rounded-full bg-green-500">
            <i className="text-lg ">
              <FaWhatsapp />
            </i>
          </a>
        </div>

        {/* Google Play and NDPR Audit */}
        <div className="flex flex-col md:flex-row items-center md:pl-5">
          <a href="#">
            <img src={google1} alt="Get it on Google Play" className="w-32" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-7 border-t border-gray-300 flex justify-center  text-gray-600 text-sm">
          <p className="pt-1">
            &copy; 2024 <span className="font-bold">HireSpot</span> 
          </p>
        </div>
    </footer>
  );
};

export default Footer;








// import React from 'react';

// const Footer = () => {
//   return (
//     <div className="bg-gray-800 mt-16 text-white py-4 text-center">
//       <p className="text-sm">&copy; 2024 My Website. All rights reserved.</p>
//       <p className="text-sm">Powered by <span className="font-bold text-blue-500">Olicbest</span></p>
//     </div>
//   );
// };

// export default Footer;
