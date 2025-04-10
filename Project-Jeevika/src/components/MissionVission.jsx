import React from "react";
import Mission from '../assets/mission.png';
import Values from '../assets/values.png';
import Vision from '../assets/vision.png';

const MissionVisionValue = ({ items }) => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="w-full text-center mb-10 text-3xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl text-gray-900">
        Our Mission, Vision & Values
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-white shadow-lg rounded-2xl text-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-[40vw] object-cover rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            {Array.isArray(item.description) ? (
              item.description.map((desc, i) => (
                <p key={i} className="text-gray-600">
                  {desc}{i < item.description.length - 1 && <br />}
                </p>
              ))
            ) : (
              <p className="text-gray-600">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const data = [
  {
    image: Mission,
    title: "Our Mission",
    description: "To bridge the gap between establishments and workers by providing a seamless hiring platform, ensuring efficiency for businesses and stable employment for workers.",
  },
  {
    image: Vision,
    title: "Our Vision",
    description: "To become a leading platform that seamlessly connects establishments with workers or contractors, transforming the hiring process into an easy and efficient operation.",
  },
  {
    image: Values,
    title: "Our Values",
    description: [
      "Empowerment",
      "Reliability",
      "Creating growth opportunities for establishments",
      "Enabling new areas to thrive"
    ]
  },
];

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <MissionVisionValue items={data} />
    </div>
  );
};

export default App;