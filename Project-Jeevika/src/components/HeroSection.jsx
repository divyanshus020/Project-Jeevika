import React from 'react';
import HeroForm from '../components/HeroForm ';

const heroData = {
    home: {
        title: "Empowering Lives by Breaking Barriers and Connecting Hands to Work.",
        description: "Our platform simplifies hiring workers or contractors for factories, restaurants, and other industries. With Jeevika, hiring is faster, smarter, and more reliable—empowering both businesses and workers.",
    },
    Employee: {
        title: "About Jeevika - Employee section ",
        description: "Jeevika aims to bridge the gap between establishments and workers by providing a seamless hiring platform, ensuring efficiency for businesses and stable employment for workers.",
    },
    Hire: {
        title: "Our Services - Hire Section ",
        description: "We provide a smart and efficient hiring platform that connects industries with skilled and unskilled labor, ensuring smooth workforce management.",
    }
};

const HeroSection = ({ page }) => {
    const { title, description } = heroData[page] || heroData.home;

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                        {title}
                    </h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
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
