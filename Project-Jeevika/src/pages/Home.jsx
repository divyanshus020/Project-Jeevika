import React from 'react';
import Loader from '../components/Loader';
import HeroSection from '../components/HeroSection';
import HorizontalTag from '../components/HorizontalTag';
import MissionVission from '../components/MissionVission'
import { CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import Footer from '../components/Footer';
import Team from '../components/Team';
import MeetFounder from '../components/MeetFounder';
// import { AnimatedTestimonials } from '../components/Animated';

const Home = () => {
    return (
        <div>
            {/* <h1 className='text-center text-3xl mt-10'>Home page</h1> */}
            <HeroSection page="home" />
            <HorizontalTag />
            <MissionVission />

            <FloatButton
                shape="circle"
                type="primary"
                style={{ insetInlineEnd: 94 }}
                icon={<CustomerServiceOutlined />}
            />

            <Team/>
            <MeetFounder/>
            {/* <AnimatedTestimonials/> */}
            <Footer/>
        </div>
    );
}

export default Home;
