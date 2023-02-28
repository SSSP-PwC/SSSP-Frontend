import React from "react";
import { Button, MainHeading } from "../../../globalStyles";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const CompanyRegistrationLandingPage = () => {
    const navigate = useNavigate();
    const handleNextPage = () => {
        navigate("/register-company-details");
      };
  return (
    <div className="container">
      <div
        className="form"
        style={{ marginTop: "70px", display: "inline-block" }}
      >
        <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
          Register your company
        </MainHeading>
        <Divider></Divider>

        <p style={{ color: "#0B0C0C" }}>
          Use this service to register your company details with the platform.
        </p>

        <p style={{ color: "#0B0C0C" }}>
          Please have the following information available before registering:{" "}
        </p>
        <ul>
          <li>Company Name</li>
          <li>Company Address</li>
          <li>Company Registration Number</li>
          <li>Contact Details</li>
        </ul>
        <Button
          style={{ marginBottom: "15px" }}
          onClick={handleNextPage}

        >
          Register now
        </Button>
      </div>
    </div>
  );
};
