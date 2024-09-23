// import React from 'react';

// const Hero = () => {
//   return (
//     <div className="bg-gradient-to-b from-purple-700 to-blue-700 text-white p-8 md:p-12">
//       {/* Top Bar */}
//       <div className="bg-purple-900 p-3 text-center text-sm">
//         <span>
//           Level up your job search. Get personalized alerts & land your dream job.{' '}
//           <a href="#" className="text-blue-300 underline">
//             Subscribe Now
//           </a>
//         </span>
//       </div>

//       {/* Hero Section */}
//       <div className="text-center py-12">
//         <h1 className="text-3xl md:text-4xl font-bold mb-6">Explore and discover the right job for you!</h1>
        
//         {/* Search Filters */}
//         <div className="bg-white p-4 rounded-md shadow-md flex flex-wrap justify-center items-center gap-4">
//           <select className="border p-2 rounded-md w-full md:w-auto">
//             <option>Any Job Functions</option>
//           </select>
//           <select className="border p-2 rounded-md w-full md:w-auto">
//             <option>Any Industries</option>
//           </select>
//           <select className="border p-2 rounded-md w-full md:w-auto">
//             <option>Any Locations</option>
//           </select>
//           <select className="border p-2 rounded-md w-full md:w-auto">
//             <option>Any Experience Levels</option>
//           </select>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full md:w-auto">
//             Find a Job
//           </button>
//         </div>
        
//         {/* Popular Searches */}
//         <div className="mt-8 space-y-2 md:space-y-0 md:space-x-2">
//           <h3 className="text-lg mb-4">Popular searches</h3>
//           <div className="flex flex-wrap justify-center gap-2">
//             <button className="bg-purple-800 px-4 py-2 rounded-full hover:bg-purple-600 text-sm">
//               Hospitality & Hotel
//             </button>
//             <button className="bg-purple-800 px-4 py-2 rounded-full hover:bg-purple-600 text-sm">
//               IT & Telecoms
//             </button>
//             <button className="bg-purple-800 px-4 py-2 rounded-full hover:bg-purple-600 text-sm">
//               Full Time
//             </button>
//             <button className="bg-purple-800 px-4 py-2 rounded-full hover:bg-purple-600 text-sm">
//               Part Time
//             </button>
//             <button className="bg-purple-800 px-4 py-2 rounded-full hover:bg-purple-600 text-sm">
//               Lagos
//             </button>
//             <button className="bg-purple-800 px-4 py-2 rounded-full hover:bg-purple-600 text-sm">
//               Abuja
//             </button>
//             <button className="bg-purple-800 px-4 py-2 rounded-full hover:bg-purple-600 text-sm">
//               Port Harcourt &...
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;















import React from 'react'

const Hero = () => {
  return (
    <div className="pb-16 mx-auto min-w-full container bg-gray-100 flex flex-col items-center">
      {/* Search Bar */}
      <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-4xl mt-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
          {/* Search Job */}
          <div className="flex items-center w-full md:w-1/3 border rounded-lg px-4 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 6.75v10.5m5.25-5.25H6" />
            </svg>
            <input
              type="text"
              placeholder="Search Job here..."
              className="w-full focus:outline-none bg-gray-100 text-gray-700"
            />
          </div>
          {/* Search by Company */}
          <div className="flex items-center w-full md:w-1/3 border rounded-lg px-4 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <input
              type="text"
              placeholder="Search by company"
              className="w-full focus:outline-none bg-gray-100 text-gray-700"
            />
          </div>
          {/* Search by Location */}
          <div className="flex items-center w-full md:w-1/3 border rounded-lg px-4 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.5 0 4.5 2 4.5 4.5S12 12 12 12s-4.5-2.5-4.5-4.5S9.5 3 12 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v6" />
            </svg>
            <input
              type="text"
              placeholder="Search by Location"
              className="w-full focus:outline-none bg-gray-100 text-gray-700"
            />
          </div>
          {/* Search Button */}
          <div className="w-full md:w-auto">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg w-full md:w-auto hover:bg-blue-700 transition duration-300">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero