import React from 'react';
import HeroForm from './HeroForm ';
const HeroSection = () => {
    return (
        <div>
            <section class="bg-white dark:bg-gray-900">
                <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div class="mr-auto place-self-center lg:col-span-7">
                        <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Jeevika  Empowering Small Businesses, Connecting Talent</h1>
                        <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Jeevika connects small businesses with skilled job seekers and freelancers. With smart recommendations, real-time messaging, and an intuitive dashboard, it simplifies hiring, making recruitment seamless and cost-effective. 🚀</p>
                       
                    </div>
                    <div class="hidden lg:mt-0 lg:col-span-5 lg:flex justify-center">
                        {/* <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup" /> */}
                        <HeroForm />

                    </div>
                </div>
            </section>
        </div>
    );
}

export default HeroSection;
