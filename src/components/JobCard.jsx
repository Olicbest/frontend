import React from 'react'
import { BiTimeFive } from "react-icons/bi"
import logo1 from "../assets/images/eagle.png"

const JobCard = ({job}) => {
  return (
    <div>
      <div className="jobContainer flex gap-10 justify-center flex-wrap items-center py-10">
        <div className="group group/item single singleJob w-[250px] p-[20px] bg-white rounded [10px] hover:bg-blue-500 shadow-lg shadow-gray-300/70 hover:shadow-lg">
        <span className="flex justify-between items-center gap-4">
          <h1 className="text-[16px] front-semibold text-black group-hover:text-white"> <span className="font-semibold">Title:</span> {job.title}</h1>
          <span className="flex items-center text-[#ccc] gap-1">
            <BiTimeFive />Now
          </span>
        </span>
        <h6 className="text-[#ccc]">{job.location}</h6>

        <p className="text-[13px] text-[#959595] pt-[20px] border-t-[2px] mt-[20px] group-hover:text-white">
        Description: {job.description}
        </p>
        <div className="company flex items-center gap-2">
          <img src={logo1} alt="company logo" className="w-[10%]" />
          <span className="text-[14px] py-[1rem] block group-hover:text-white">
          Company: {job.company}
          </span>
        </div>
        <div className="text-[13px] text-[#959595] pt-[20px] border-t-[2px] mt-[20px] group-hover:text-white">
         Position: {job.position}
        </div>
        <div className="text-[13px] text-[#959595] pt-[20px] border-t-[2px] mt-[20px] group-hover:text-white">
        salary: {job.salary}
        </div>
        <button className="border-[2px] rounded-[10px] block px-3 py-2 text-[14px] font-semibold text-black hover:bg-white group-hover/item:text-black group-hover:text-white hover:text-black">
          Apply Now
        </button>
        </div>
      </div>
    </div>
  )
}

export default JobCard