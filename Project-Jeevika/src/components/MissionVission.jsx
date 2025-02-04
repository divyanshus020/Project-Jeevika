import React from "react";
import Mission from '../assets/mission.Png'
import Values from '../assets/values.Png'
import Vision from '../assets/vision.Png'
const MissionVisionValue = ({ items }) => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="w-full text-center mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl dark:text-white ">Our Mission, Vision & Values</h2>
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
            <p className="text-gray-600">{item.description}</p>
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
    description: "To provide innovative solutions for a better future.",
  },
  {
    image: Vision,
    title: "Our Vision",
    description: "To be the leading company in the tech industry.",
  },
  {
    image: Values,
    title: "Our Values",
    description: "Integrity, Innovation, and Excellence.",
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
