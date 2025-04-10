import React from 'react';
import Somya from '../assets/Somya.jpg';
import Suraj from '../assets/Suraj.jpg';
import Yash from '../assets/Yash.jpg';

const founders = [
  {
    name: "Somya Sehgal",
    position: "Co-Founder",
    image: Somya,
    description: "A driven student from the Mathematics and Computing branch, Somya is diving deep into Web Development and Data Structures & Algorithms. As the founder of multiple startups, she blends technical knowledge with entrepreneurial grit, constantly pushing boundaries and building solutions that matter.",
    linkedin: "https://www.linkedin.com/in/somya-sehgal-159762292?trk=contact-info"
  },
  {
    name: "Suraj",
    position: "Co-Founder",
    image: Suraj,
    description: "With a sharp analytical mind and a strong foundation in Product Management, Suraj represents the Civil Engineering branch. He’s currently gaining real-world experience through an off-campus internship, where he's applying his skills to solve practical challenges. Suraj is passionate about bridging the gap between user needs and product innovation",
    linkedin: "https://in.linkedin.com/in/surajsen1729?utm_source=share&utm_medium=member_mweb&utm_campaign=share_via&utm_content=profile"
  },
  {
    name: "Yash",
    position: "Co-Founder",
    image: Yash,
    description: "A creative powerhouse exploring the intersection of technology and art, Yash specializes in video editing, photoshoots, and is diving into Data Science and Machine Learning. His ability to combine visual storytelling with analytical insights brings a fresh and valuable perspective to any project.",
    linkedin: "https://www.linkedin.com/in/yash-m-902372272?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
  },
];

const MeetFounder = () => {
  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
            Meet Founders
          </h2>
          <h2 className="text-lg font-medium text-gray-500">
            Together, we’re not just students — we’re builders, creators, and innovators shaping the future one project at a time.
          </h2>
        </div>
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          {founders.map((founder, index) => (
            <div
              key={index}
              className={`flex items-center bg-gray-50 rounded-lg shadow ${
                index === 2 ? "md:col-span-2 justify-center" : ""
              }`}
            >
              <img
                className="w-80 h-48 p-2 rounded-lg sm:rounded-none sm:rounded-l-lg object-cover"
                src={founder.image}
                alt={founder.name}
              />
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900">
                  {founder.name}
                </h3>
                <span className="text-gray-500">{founder.position}</span>
                <p className="mt-3 mb-4 font-light text-gray-500">
                  {founder.description}
                </p>
                <ul className="flex space-x-4">
                  <li>
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-900"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0ZM7.12 20.45H3.56V9h3.56v11.45ZM5.34 7.51a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96v5.7h-3.56V9h3.42v1.56h.05c.48-.91 1.66-1.87 3.42-1.87 3.66 0 4.34 2.41 4.34 5.54v6.22Z" />
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
};

export default MeetFounder;