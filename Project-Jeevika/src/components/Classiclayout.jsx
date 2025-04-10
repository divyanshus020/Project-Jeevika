import React from "react";
import Team from "../assets/HR.jpg";
import Employee from "../assets/JobSeek.jpg";
import { useNavigate } from "react-router-dom";

const ClassicLayout = ({ type }) => {
  const navigate = useNavigate();

  // Define the data inside ClassicLayout based on the `type` prop
  const data = {
    hire: { 
      image: Team, // Image for Hire Page
      imageAlt: "Hiring Image",
      title: "What Jeevikaa Provides you ?",
      text1: `
        🔹 Find Verified Workers – Skilled and unskilled, ready to work.
        🔹 Reduce Hiring Hassles – No fake resumes, no unreliable hires.
        🔹 Hire On-Demand – Get workers as per your specific needs.
      `,
      text2: `
        Prevent losses, boost productivity! Either find the worker by yourself or let Jeevika handle the hiring so you can focus on growing your business. Register now and get the best workforce for your company. 🚀
      `,
      buttonText: "Apply Now",
      loginPath: "/login/company", // Navigate to company login
    },
    default: {
      image: Employee, // Default Image
      imageAlt: "Classic Design",
      title: "Why Choose Jeevika?",
      text1: `
        ✅ Find Jobs Easily – Get work in factories, industries, restaurants, and more without any hassle.
      `,
      text2: `
        ✅ Elimination of Contractor – Get a job without a contractor and prevent being exploited by them.
        ✅ Work as Per Your Skills – Get hired based on your experience and expertise.
        ✅ Flexible Job Options – Choose between full-time, part-time, or daily wage jobs as per your needs.
      `,
      buttonText: "Apply Now",
      loginPath: "/login/employee", // Default to employee login
    },
  };

  // Use the `type` prop to select the correct data
  const layoutData = data[type] || data.default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        {/* Left Side (Image) */}
        <div className="flex-1 md:w-1/2 mb-8 md:mb-0">
          <img
            src={layoutData.image}
            alt={layoutData.imageAlt}
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>

        {/* Right Side (Text) */}
        <div className="flex-1 md:w-1/2 px-6 md:px-12 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6">   
            {layoutData.title}
          </h2>
          <p className="text-lg text-gray-600 mb-6 whitespace-pre-line">{layoutData.text1}</p>
          <p className="text-lg text-gray-600 mb-6 whitespace-pre-line">{layoutData.text2}</p>

          {/* Join Us Button */}
          <button
            className="mt-6 py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={() => navigate(layoutData.loginPath)} // Dynamic Navigation
          >
            {layoutData.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassicLayout;