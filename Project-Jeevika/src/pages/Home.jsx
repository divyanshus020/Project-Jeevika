import React from 'react';
import Loader from '../components/Loader';
import HeroSection from '../components/HeroSection';
import HorizontalTag from '../components/HorizontalTag';
import MissionVission from '../components/MissionVission'

const Home = () => {
    return (
        <div>
            {/* <h1 className='text-center text-3xl mt-10'>Home page</h1> */}
            <HeroSection/>
            <HorizontalTag/>
            <MissionVission/>
        </div>
    );
}

export default Home;
