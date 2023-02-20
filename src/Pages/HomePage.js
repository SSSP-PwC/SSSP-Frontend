import React from 'react';
import About from '../components/about/About';
import { info } from '../data/HomeData';
import { Content } from '../components/content/Content';
import HomeComponent from '../components/home/Home';


const Home = () => {
    return (
        <>
            <Content {...info} />
            <HomeComponent />
            <About />


        </>
    );
};

export default Home;
