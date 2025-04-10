import React from 'react';
import HeroForm from '../components/HeroForm ';

const heroData = {
    home: {
        title: "Bridging the Gap Between Employers & Workers",
        description: "At Jeevika, we connect factories, restaurants, and businesses with skilled and unskilled workers seamlessly. Our platform ensures verified, reliable, and job-ready labor to solve your workforce shortages.",
    },
    Employee: {
        title: "Bridging the Gap Between Employers & Workers",
        description: "Looking for skilled and dependable workers? Jeevika makes hiring easy and risk-free! Register your company today and find workers tailored to your needs. Pay only after worker confirmation, ensuring a seamless and trustworthy hiring experience.",
    },
    Hire: {
        title: "Bridging the Gap Between Employers & Workers",
        description: "At Jeevika, we understand the struggles of finding stable and well-paying jobs. That’s why we are here to connect you directly with industries, restaurants, and businesses that need hardworking and skilled workers like you",
    }
};

const HeroSection = ({ page }) => {
    const { title, description } = heroData[page] || heroData.home;

    return (
        <section className="bg-white">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-gray-900">
                        {title}
                    </h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
                        {description}
                    </p>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex justify-center">
                    <HeroForm />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;