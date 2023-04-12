import React from 'react';
import { NavbarComponent } from '../../Navbar/NavbarComponent';


export const IframeComponent = () => {
    return (
      <div style={{height: "100vh", display: "flex", flexDirection: "column"}}>
        <NavbarComponent />
        <iframe src="https://www.example.com" style={{flex: "1", border: "none", height: "calc(100% - 50px)"}}></iframe>
      </div>
    );
  }