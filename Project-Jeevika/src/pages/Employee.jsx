import React from 'react';
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection';
import ClassicLayout from '../components/Classiclayout';
const Employee = () => {
    return (
        <div className='w-full '>
            <HeroSection page="Employee" />
            {/* <h1 className='text-center text-3xl mt-10'>Employee page</h1> */}
            <ClassicLayout/>
            <Footer/>


        </div>
    );
}

export default Employee;
