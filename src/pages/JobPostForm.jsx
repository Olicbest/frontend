import React, { useState } from "react";

const JobPostForm = () => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container mx-auto p-6">
        <h2 className="text-lg flex justify-center md:text-xl md:font-2 font-semibold mb-4">
          Please add your job details below
        </h2>
      <div className="shadow-xl p-2">
      
      <form onSubmit={handleSubmit} className="bg-white rounded md:space-x-2 p-6 grid grid-cols-1 md:grid-cols-2">
        

        <div>
        <label className="block font-medium" htmlFor="lastName">Job Title <span className="text-red-600 text-lg">*</span></label>
         <input
            type="text"
            id="lastName"
            className="border border-gray-400 outline-none px-2 py-1 focus:border-gray-500 rounded-md w-full"
            // value={lastName}
            required
          />
        </div>

        <div>
        <label className="block font-medium" htmlFor="lastName">Job Functions <span className="text-red-600 text-lg">*</span></label>
         <input
            type="text"
            id="lastName"
            className="border border-gray-400 outline-none px-2 py-1 focus:border-gray-500 rounded-md w-full"
            // value={lastName}
            required
          />
        </div>
        <div>
        <label className="block font-medium" htmlFor="lastName">Industry <span className="text-red-600 text-lg">*</span></label>
         <input
            type="text"
            id="lastName"
            className="border border-gray-400 outline-none px-2 py-1 focus:border-gray-500 rounded-md w-full"
            // value={lastName}
            required
          />
        </div>

        <div>
        <label className="block font-medium" htmlFor="lastName">Work Type <span className="text-red-600 text-lg">*</span></label>
         <input
            type="text"
            id="lastName"
            className="border border-gray-400 outline-none px-2 py-1 focus:border-gray-500 rounded-md w-full"
            // value={lastName}
            required
          />
        </div>
        
        <div>
        <label className="block font-medium" htmlFor="lastName">Location <span className="text-red-600 text-lg">*</span></label>
         <input
            type="text"
            id="lastName"
            className="border border-gray-400 outline-none px-2 py-1 focus:border-gray-500 rounded-md w-full"
            // value={lastName}
            required
          />
        </div>

        <div>
        <label className="block font-medium" htmlFor="lastName">Qualification <span className="text-red-600 text-lg">*</span></label>
         <input
            type="text"
            id="lastName"
            className="border border-gray-400 outline-none px-2 py-1 focus:border-gray-500 rounded-md w-full"
            // value={lastName}
            required
          />
        </div>
        
        <div>
        <label className="block font-medium" htmlFor="lastName">Experience Reqmt. <span className="text-red-600 text-lg">*</span></label>
         <input
            type="text"
            id="lastName"
            className="border border-gray-400 outline-none px-2 py-1 focus:border-gray-500 rounded-md w-full"
            // value={lastName}
            required
          />
        </div>

        <div>
        <label className="block font-medium" htmlFor="lastName">Job Level <span className="text-red-600 text-lg">*</span></label>
         <input
            type="text"
            id="lastName"
            className="border border-gray-400 outline-none px-2 py-1 focus:border-gray-500 rounded-md w-full"
            // value={lastName}
            required
          />
        </div>
        
        <div>
        <label className="block font-medium" htmlFor="lastName">Salary Currency <span className="text-red-600 text-lg">*</span></label>
         <input
            type="text"
            id="lastName"
            className="border border-gray-400 outline-none px-2 py-1 focus:border-gray-500 rounded-md w-full"
            // value={lastName}
            required
          />
        </div>
        

        <div className="">
        <label className="block font-medium" htmlFor="lastName">Salary <span className="text-red-600 text-lg">*</span></label>
         <input
            type="text"
            id="lastName"
            className="border border-gray-400 outline-none px-2 py-1 focus:border-gray-500 rounded-md w-full"
            // value={lastName}
            required
          />
        </div>
        <div></div>
        <div className="flex justify-center md:justify-end mt-6">
        <button className="bg-blue-500 w-full md:w-1/3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
          Post Job
        </button>
        </div>
      </form>
      
      </div>
    </div>
  );
};

export default JobPostForm;
