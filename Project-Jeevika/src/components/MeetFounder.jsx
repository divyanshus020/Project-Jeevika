import React from 'react';
import Somya from '../assets/Somya.jpg';
import Suraj from '../assets/Suraj.jpg';
import Yash from '../assets/Yash.jpg';

const founders = [
  {
    name: "Somya Sehgal",
    position: "Co-Founder",
    image: Somya,
    description: "An innovative leader with expertise in AI, Web3, and Software Development. Passionate about building cutting-edge solutions and leading tech-driven businesses.",
    linkedin: "https://linkedin.com/in/divyanshu-sharma"
  },
  {
    name: "Suraj",
    position: "Co-Founder",
    image: Suraj,
    description: "Tech enthusiast and problem solver with deep knowledge of full-stack development, blockchain, and system architecture.",
    linkedin: "https://linkedin.com/in/suraj"
  },
  {
    name: "Yash",
    position: "Co-Founder",
    image: Yash,
    description: "Tech enthusiast and problem solver with deep knowledge of full-stack development, blockchain, and system architecture.",
    linkedin: "https://linkedin.com/in/suraj"
  },
];

const MeetFounder = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Our Team
          </h2>
        </div>
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          {founders.map((founder, index) => (
            <div key={index} className="flex items-center bg-gray-50 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              
              <img className="w-80 h-48 p-2 rounded-lg sm:rounded-none sm:rounded-l-lg object-cover" src={founder.image} alt={founder.name} />
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {founder.name}
                </h3>
                <span className="text-gray-500 dark:text-gray-400">{founder.position}</span>
                <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">{founder.description}</p>
                <ul className="flex space-x-4">
                  <li>
                    <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MeetFounder;
