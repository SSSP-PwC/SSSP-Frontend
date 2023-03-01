import React from "react";
import { Button, MainHeading } from "../../../globalStyles";
import { Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export const RegistrationFormLandingPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const handleNextPage = () => {
    navigate("/publish-scheme-title");
  };
  return (
    <div className="container">
      <div
        className="form"
        style={{ marginTop: "70px", display: "inline-block" }}
      >
        <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
          Register to the {state.scheme_title}
        </MainHeading>
        <Divider style={{ background: "black" }}></Divider>
        <br></br>
        <p style={{ color: "#505a5f" }}>
          Use this service to register to the {state.scheme_title}
        </p>

        <p style={{ color: "#0B0C0C" }}>
          We will collect the following pieces of information during registration:{" "}
        </p>
        <ul>
          <li>Applicant name</li>
          <li>Business email address</li>
          <li>Scheme Start and End Date</li>
          <li>Scheme Objectives</li>
          <li>Application Details</li>
          <li>Eligibility Criteria</li>
          <li>Publisher Details</li>
        </ul>
        <Button style={{ marginBottom: "15px" }} onClick={handleNextPage}>
          Publish now
        </Button>
      </div>
    </div>
  );
};
