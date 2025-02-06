import React from "react";
import Team from "../assets/Team.png";
import Employee from "../assets/Employee.png";
import { useNavigate } from "react-router-dom";

const ClassicLayout = ({ type }) => {
  const navigate = useNavigate();

  // Define the data inside ClassicLayout based on the `type` prop
  const data = {
    hire: {
      image: Team, // Image for Hire Page
      imageAlt: "Hiring Image",
      title: "Join Our Team",
      text1:
        "We are looking for talented individuals to be a part of our dynamic team. Join us and make a difference.",
      text2:
        "Our company offers a supportive work environment, growth opportunities, and the chance to work on exciting projects.",
      buttonText: "Apply Now",
    },
    default: {
      image: Employee, // Default Image
      imageAlt: "Classic Design",
      title: "Classic Layout Design",
      text1:
        "This is a classic design layout with an image on the left and text on the right. The layout is responsive, and the image and text will stack on top of each other on smaller screens.",
      text2:
        "Tailwind CSS makes it easy to build responsive layouts with utility-first classes. This design is flexible and adapts to different screen sizes.",
      buttonText: "Apply Now",
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
          <p className="text-lg text-gray-600 mb-6">{layoutData.text1}</p>
          <p className="text-lg text-gray-600 mb-6">{layoutData.text2}</p>

          {/* Join Us Button */}
          <button
            className="mt-6 py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={() => navigate("/allform")} // Redirect to AllForm page
          >
            {layoutData.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassicLayout;
