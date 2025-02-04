import React from "react";

const MeetFounder = ({ founder }) => {
  return (
    <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-center gap-12 text-center md:text-left">
      {/* Left Side - Founder Image */}
      <div className="relative w-72 h-72 md:w-96 md:h-96 flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-400 rounded-3xl shadow-2xl" />
        <img
          src={founder.image}
          alt={founder.name}
          className="relative w-full h-full object-cover rounded-3xl border-4 border-white shadow-xl"
        />
      </div>

      {/* Right Side - Founder Info */}
      <div className="w-full md:w-1/2 bg-white p-8 rounded-3xl shadow-2xl flex flex-col justify-center items-center md:items-start">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Meet Our Founder</h2>
        <h3 className="text-2xl font-semibold text-gray-700 mb-3">{founder.name}</h3>
        <p className="text-gray-600 leading-relaxed text-lg">{founder.description}</p>
      </div>
    </div>
  );
};

const founderData = {
  image: "/path/to/founder.jpg",
  name: "John Doe",
  description: "John Doe is the visionary behind our company, leading with innovation and dedication to excellence. With years of experience in the industry, he aims to create impactful solutions for a better future."
};

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <MeetFounder founder={founderData} />
    </div>
  );
};

export default App; 