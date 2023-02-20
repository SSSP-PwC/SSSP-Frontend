import React from 'react';
import About from '../Components/About/About';
import { info } from '../Data/HomeData';
import { Content } from '../Components/Content/Content';
import HomeComponent from '../Components/Home/Home';


export const HomePage = () => {
    return (
        <>
            <Content {...info} />
            <HomeComponent />
            <About />


        </>
    );
};

