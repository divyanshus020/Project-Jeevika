import React from 'react';
import HeroSection from '../components/HeroSection';
import ClassicLayout from '../components/Classiclayout';
import Footer from '../components/Footer';

const Hire = () => {
    return (
        <>
        <div>
            <HeroSection page="Hire" />
            <ClassicLayout type="hire"/>
            {/* <h1 className='text-center text-3xl mt-10'>Hire page</h1> */}
        </div>
        <Footer />
        </>
    );
}

export default Hire;
