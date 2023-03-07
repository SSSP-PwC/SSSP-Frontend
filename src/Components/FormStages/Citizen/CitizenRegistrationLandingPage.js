import React from "react";
import { MainHeading } from "../../../globalStyles";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { Button } from "govuk-react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export const CitizenRegistrationLandingPage = () => {
  const navigate = useNavigate();
  const handleNextPage = () => {
    navigate("/register-citizen-name");
  };
  const RegistrationFormBreadcrumb = () => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>

        <Breadcrumb.Item active>Register Citizen</Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  return (
    <div className="container">
      <div
        className="form"
        style={{ marginTop: "70px", display: "inline-block" }}
      >
        {" "}
        <RegistrationFormBreadcrumb />
        <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
          Register as a citizen
        </MainHeading>
        <Divider></Divider>
        <br></br>
        <p style={{ color: "#0B0C0C" }}>
          Use this service to register your details with the platform.
        </p>
        <p style={{ color: "#0B0C0C" }}>
          You will be asked to provide the following pieces of information
          during citizen registration:{" "}
        </p>
        <ul>
          <li>First Name</li>
          <li>Last Name</li>
          <li>Address</li>
          <li>Email Address</li>
          <li>Password</li>
        </ul>
        <Button style={{ marginBottom: "15px" }} onClick={handleNextPage}>
          Register now
        </Button>
      </div>
    </div>
  );
};
