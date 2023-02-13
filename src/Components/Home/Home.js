import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Section, Container, MainHeading } from "../../globalStyles";
import {
  HomeScreen,
  HomeSection,
  HomeText,
  ButtonWrapper,
  HomeButton,
} from "./HomeStyles";

//<MainHeading>Welcome to our smart societies software platform, where innovation and security come together to create a seamless experience for you. Our platform is designed to provide a smart wallet, where you can store and manage your digital credentials securely and efficiently. With our smart credentials, you'll have a one-stop solution for all your verification needs, whether it's for education, employment, or other personal and professional purposes. Our goal is to make your life easier by eliminating the need for multiple login accounts and passwords, and streamlining your digital identity into a secure, easily accessible platform. Join us on our journey to a smarter, more connected world.</MainHeading>

const Home = () => {

  return (
    <HomeSection>
      <Container>
      <HomeText>Introducing the Smart Societies Software Platform</HomeText>
      <p>In today's fast-paced digital world, traditional credentials and financial transactions are no longer sufficient. That's why we're proud to introduce the Smart Societies Software Platform, an innovative solution that combines digital credentials with a smart wallet to create a more streamlined and secure experience for individuals and organizations alike.</p>
      <p>With the Smart Societies platform, you'll be able to store, manage, and use your digital credentials in one secure location. This eliminates the need for multiple login credentials, passwords, and security questions, making it easier and faster to access the information and services you need.</p>
      <p>Our platform also integrates with a smart wallet, allowing you to store, track, and manage your financial transactions with ease. You'll be able to view your balance and transaction history, as well as make payments, send and receive money, and even earn rewards all from one convenient location.</p>
      <p>The Smart Societies platform is designed with security in mind. All transactions and credentials are encrypted, and our platform uses advanced security protocols to protect your information and transactions from fraud and cybercrime.</p>
      <p>In addition, the platform is highly scalable, making it an ideal solution for organizations of all sizes. Whether you're an individual or a large corporation, the Smart Societies platform can be customized to meet your specific needs and requirements.
      Join us in shaping the future of digital credentials and financial transactions. Try the Smart Societies Software Platform today and experience the convenience and security that comes with a smarter solution.</p>

</Container>
    </HomeSection>
  );
};

export default Home;
