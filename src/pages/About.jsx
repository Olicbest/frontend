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

const employerReasons = [
  {
    image: im1,
    title: 'Accelerate your hiring process',
    body: 'Access over 1.1 million qualified jobseeker profiles, streamlining your path to the perfect hire.',
  },
  {
    image: im2,
    title: 'Reach quality candidates faster',
    body: 'Connect with an active talent pool and reduce the time it takes to shortlist the right people.',
  },
  {
    image: im3,
    title: 'Improve hiring confidence',
    body: 'Make better hiring decisions with stronger candidate visibility and a clearer recruitment workflow.',
  },
];

const jobseekerReasons = [
  {
    image: im4,
    title: 'Connect with verified employers',
    body: 'Gain access to thousands of top employers in Nigeria looking for talents like you.',
  },
  {
    image: im5,
    title: 'Customized job alerts',
    body: 'Stay ahead of the competition with personalised job alerts that help you spot the right role early.',
  },
  {
    image: im6,
    title: 'Profile and CV enhancement',
    body: 'Capture recruiters attention with expert profile and CV review services built to help you stand out.',
  },
];

const awards = [
  {
    image: ims1,
    title: 'Impact in Talent Development and Youth productivity in Nigeria',
    body: 'Streetnomics',
    year: '2024',
  },
  {
    image: ims2,
    title: 'Certificate of Excellence Unity in Adversity',
    body: 'The Sabre awards africa',
    year: '2021',
  },
  {
    image: ims3,
    title: 'Philanthropic Consulting Company of the Year',
    body: 'CSR Reporters Philanthropic Award',
    year: '2020',
  },
  {
    image: ims4,
    title: 'Philanthropic Consulting Company of the Year',
    body: 'CSR Reporters Philanthropic Award',
    year: '2020',
  },
];

const About = () => {
  return (
    <section className="pb-12">
      <div
        style={{ backgroundImage: `url(${about3})` }}
        className="mt-6 min-h-[420px] bg-cover bg-center px-4 py-12 sm:px-6 lg:min-h-[520px] lg:px-8"
      >
        <div className="mx-auto flex min-h-[360px] max-w-7xl items-center justify-center">
          <div
            id="job"
            className="glass-card w-full max-w-3xl rounded-[2rem] px-6 py-8 text-center sm:px-8 sm:py-10"
          >
            <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              About HireSpot Nigeria
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">
              <span className="font-semibold">HireSpot</span> is a career development and recruitment solutions company,
              connecting qualified job seekers with verified employers. HireSpot offers online career development support,
              training services, and personalised HR solutions for job seekers and employers.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <section>
          <h2 className="font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
            Top 3 reasons why employers post on HireSpot
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {employerReasons.map((item) => (
              <article key={item.title} className="glass-card rounded-[1.75rem] p-6">
                <img className="w-10" src={item.image} alt={item.title} loading="lazy" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
            Top 3 reasons jobseekers choose HireSpot
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {jobseekerReasons.map((item) => (
              <article key={item.title} className="glass-card rounded-[1.75rem] p-6">
                <img className="w-10" src={item.image} alt={item.title} loading="lazy" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-slate-900 sm:text-3xl">Awards & Memberships</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
            HireSpot is a proud member of the Nigerian German Chamber of Commerce, Nigerian French Chamber of Commerce,
            Nigerian American Chamber of Commerce, and Nigeria Employers&apos; Consultative Association.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {awards.map((item) => (
              <article
                key={`${item.title}-${item.year}`}
                className="glass-card flex flex-col items-center rounded-[1.75rem] px-6 py-8 text-center"
              >
                <img src={item.image} alt={item.title} className="mb-6 h-16 w-auto object-contain" loading="lazy" />
                <p className="text-base font-semibold text-slate-700 sm:text-lg">{item.title}</p>
                <p className="mt-3 text-sm text-slate-600">{item.body}</p>
                <p className="mt-4 text-sm text-slate-400">{item.year}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-12">
          <Testimonial />
        </div>
      </div>
    </section>
  );
};

export default About;
