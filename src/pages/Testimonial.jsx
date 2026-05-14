import React, { useEffect, useState } from 'react';
import blisscare from '../assets/images/blisscare.png';
import merrybet from '../assets/images/merrybet.png';
import easthopemart from '../assets/images/easthopemart.png';

const testimonials = [
  {
    imageSrc: blisscare,
    alt: 'Blisscare logo',
    quote: "We faced challenges finding suitable healthcare recruits. Initially handling it internally, we realised we couldn't do it alone. Seeking expert help, we partnered with HireSpot. Their Pro Recruit package eased our burden, providing tailored solutions. Through a detailed job description and meeting, we found the perfect fit.",
    name: 'Adeyemi Sowemimo',
    title: 'Managing Director',
  },
  {
    imageSrc: merrybet,
    alt: 'Merrybet logo',
    quote: "We've been using HireSpot since our inception in 2013. I received a recommendation from my HireSpot Account Officer, who suggested their executive recruitment product. Intrigued, I decided to give it a try. The process lasted about a month, during which HireSpot pre-screened the candidates. They presented me with five qualified individuals. Choosing among them was challenging as they were all excellent. Eventually, I successfully filled the Head with Accounting role from this pool of candidates.",
    name: 'Otemu Anaughe',
    title: 'Head HR',
  },
  {
    imageSrc: easthopemart, 
    alt: 'Easthopemart logo',
    quote: "What sets HireSpot apart is their commitment to excellence and their ability to deliver results. Whether you're a small business or a large corporation, HireSpot provides a seamless experience for finding the perfect fit for your team. I highly recommend HireSpot to any organization seeking quality talent. Don't hesitate-visit HireSpot today and discover the difference they can make for your recruitment needs.",
    name: 'Blessing Adegbayi',
    title: 'Human Resource Manager',
  }
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto p-6 bg-white rounded shadow-lg">
        <h1 className="font-bold md:text-2xl pb-10">
            Customer Testimonials
        </h1>
      {/* Slide Display */}
      <div className="flex justify-center items-center space-x-6">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 text-white"
        >
          &lt;
        </button>

        {/* Main Content */}
        <div className="text-center">
          <img
            src={testimonials[currentIndex].imageSrc}
            alt={testimonials[currentIndex].alt}
            className="mx-auto mb-4 h-16"
            loading="lazy"
          />
          <p className="italic text-gray-600 mb-4">"{testimonials[currentIndex].quote}"</p>
          <h3 className="font-semibold">{testimonials[currentIndex].name}</h3>
          <p className="text-sm text-gray-500">{testimonials[currentIndex].title}</p>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 text-white"
        >
          &gt;
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-4 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
