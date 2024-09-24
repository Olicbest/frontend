import React from 'react';
import about3 from '../assets/images/about2.png';
import im1 from '../assets/images/im1.png';
import im2 from '../assets/images/im2.png';
import im3 from '../assets/images/im3.png';
import im4 from '../assets/images/im4.png';
import im5 from '../assets/images/im5.png';
import im6 from '../assets/images/im6.png';
import ims1 from '../assets/images/ims1.png';
import ims2 from '../assets/images/ims2.png';
import ims3 from '../assets/images/ims3.png';
import ims4 from '../assets/images/ims4.png';
import Testimonial from './Testimonial';

const About = () => {
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${about3})` }}
        className="bg-center bg-cover h-[546px] lg:h-[528px] flex items-center justify-center mt-8"
      >
        <div
          id="job"
          className="bg-white bg-opacity-70 p-8 rounded-lg shadow-lg max-w-3xl text-center"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            About HireSpot Nigeria
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            <span className="font-semibold">HireSpot</span> is World leading career development and recruitment
            solutions company, connecting qualified job seekers with verified
            employers. HireSpot offers online career development support,
            training services, and personalised HR solutions for job seekers and
            employers.
          </p>
        </div>
      </div>

      <div className="pt-5 px-16">
        <h1 className="md:text-2xl font-bold">
            Top 3 reasons why Employers post on HireSpot
        </h1>
        <div className="grid grid-rows-1 md:grid-cols-3 gap-6 py-9">
            <div>
                {/* image */}
                <img className="w-9" src={im1} alt="image1" />
                <h3 className="text-lg py-1 font-semibold">
                  Accelerate your hiring process
                </h3>
                <p className="text-gray-600 font-serif">
                  Access over 1.1 million qualified jobseeker profiles, streamlining your path to the perfect hire.
                </p>
            </div>
            <div>
               {/* image */}
               <img className="w-9" src={im2} alt="image1" />
                <h3 className="text-lg py-1 font-semibold">
                  Accelerate your hiring process
                </h3>
                <p className="text-gray-600 font-serif">
                  Access over 1.1 million qualified jobseeker profiles, streamlining your path to the perfect hire.
                </p>
            </div>
            <div>
               {/* image */}
               <img className="w-9" src={im3} alt="image1" />
                <h3 className="text-lg py-1 font-semibold">
                  Accelerate your hiring process
                </h3>
                <p className="text-gray-600 font-serif">
                  Access over 1.1 million qualified jobseeker profiles, streamlining your path to the perfect hire.
                </p>
            </div>
        </div>
      </div>
      <div className="pb-3 px-16">
        <h1 className="md:text-2xl font-bold">
          Top 3 reasons Jobseekers choose HireSpot to search for jobs
        </h1>
        <div className="grid grid-rows-1 md:grid-cols-3 gap-6 py-9">
            <div>
                {/* image */}
                <img className="w-9" src={im4} alt="image1" />
                <h3 className="text-lg py-1 font-semibold">
                  Connect with verified employers
                </h3>
                <p className="text-gray-600 font-serif">
                  Gain access to thousands of top employers in Nigeria looking for talents like you.
                </p>
            </div>
            <div>
               {/* image */}
               <img className="w-9" src={im5} alt="image1" />
                <h3 className="text-lg py-1 font-semibold">
                  Customized job alerts
                </h3>
                <p className="text-gray-600 font-serif">
                  Stay ahead of the competition with personalised job alerts that ensure you never miss an opportunity tailored to you.
                </p>
            </div>
            <div>
               {/* image */}
               <img className="w-9" src={im6} alt="image1" />
                <h3 className="text-lg py-1 font-semibold">
                  Profile and CV enhancement
                </h3>
                <p className="text-gray-600 font-serif">
                  Capture recruiters' attention with our expert profile and CV review services.
                </p>
            </div>
        </div>
      </div>
      {/* Aword */}
      <div className="px-16 ">
        <h1 className="text-lg md:text-3xl font-bold pb-3">
          Awards & Memberships
        </h1>
        <p className="md:text-lg text-gray-500 pr-6">
          HireSpot is a proud member of the <span className="text-blue-500 cursor-pointer">Nigerian German Chamber of Commerce, Nigerian French Chamber of Commerce, Nigerian American Chamber of Commerce,</span> and <span className="text-blue-500 cursor-pointer">Nigeria Employers' Consultative Association.</span>
        </p>
        <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-9 py-9">
        <div className="flex flex-col justify-center items-center text-center border rounded-md border-gray-400 py-10">
            <img src={ims1} alt="ims3" className="md:w-32 w-28 pb-8" />
            <p className="pb-3 px-4 md:px-8 font-semibold text-gray-600 md:text-lg">
              Impact in Talent Development and Youth productivity in Nigeria
            </p>
            <p className="pb-5 text-gray-600 md:px-16">
              Streetnomics
            </p>
            <h6 className=" text-gray-400">
              2024
            </h6>
          </div>

          {/* award 2 */}
          <div className="flex flex-col justify-center items-center text-center border rounded-md border-gray-400 py-10">
            <img src={ims2} alt="ims3" className="md:w-32 w-28 pb-8" />
            <p className="pb-3 px-4 md:px-8 font-semibold text-gray-600 md:text-lg">
              Certificate of Excellence Unity in Adversity
            </p>
            <p className="pb-5 text-gray-600 md:px-16">
            The Sabre awards africa
            </p>
            <h6 className=" text-gray-400">
              2021
            </h6>
          </div>

          {/* award 3 */}
          <div className="flex flex-col justify-center items-center text-center border rounded-md border-gray-400 py-10">
            <img src={ims3} alt="ims3" className="w-16 pb-8" />
            <p className="pb-3 px-4 md:px-8 font-semibold text-gray-600 md:text-lg">
              Philanthropic Consulting Company of the Year
            </p>
            <p className="pb-5 text-gray-600 md:px-16">
              CSR Reporters Philanthropic Award
            </p>
            <h6 className=" text-gray-400">
              2020
            </h6>
          </div>

          {/* award 4 */}
          <div className="flex flex-col justify-center items-center text-center border rounded-md border-gray-400 py-10">
            <img src={ims4} alt="ims3" className="md:w-32 w-28 pb-8" />
            <p className="pb-3 px-4 md:px-10 md:text-lg font-semibold text-gray-600">
              Philanthropic Consulting Company of the Year
            </p>
            <p className="pb-5 text-gray-600 md:px-16">
            CSR Reporters Philanthropic Award
            </p>
            <h6 className=" text-gray-400">
              2020
            </h6>
          </div>
        </div>
      </div>


      {/* testimony */}
      <Testimonial />



    </div>
  );
};

export default About;