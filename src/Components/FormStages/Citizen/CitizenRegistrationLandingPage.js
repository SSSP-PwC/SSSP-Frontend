import React from "react";
import { Button, MainHeading } from "../../../globalStyles";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

export const CitizenRegistrationLandingPage = () => {
  const navigate = useNavigate();
  const handleNextPage = () => {
    navigate("/register-citizen-name");
  };

  return (
    <div className="container">
      <div
        className="form"
        style={{ marginTop: "70px", display: "inline-block" }}
      >
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
