import React from 'react';
import About from '../about/About';
import { info } from '../../data/HomeData';
import { Content } from '../content/Content';
import HomeComponent from '../home/Home';


export const HomePage = () => {
    return (
        <>
            <Content {...info} />
            <HomeComponent />
            <About />


        </>
    );
};

