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
import { Heading } from "govuk-react";

const Home = () => {
  return (
    <HomeSection>
      <Container>
        <Heading>Introducing the Smart Societies Software Platform</Heading>
        <p>
          In today's fast-paced digital world, traditional credentials and
          financial transactions are no longer sufficient. That's why we're
          proud to introduce the Smart Societies Software Platform, an
          innovative solution that combines digital credentials with a smart
          wallet to create a more streamlined and secure experience for
          individuals and organisations alike.
        </p>
        <p>
          With the Smart Societies platform, you'll be able to store, manage,
          and use your digital credentials in one secure location. This
          eliminates the need for multiple login credentials, passwords, and
          security questions, making it easier and faster to access the
          information and services you need.
        </p>
        <p>
          Our platform also integrates with a smart wallet, allowing you to
          store, track, and manage your financial transactions with ease. You'll
          be able to view your balance and transaction history, as well as make
          payments, send and receive money, and even earn rewards all from one
          convenient location.
        </p>
      </Container>
    </HomeSection>
  );
};

export default Home;
