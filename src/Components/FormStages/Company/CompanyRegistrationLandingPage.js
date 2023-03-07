import React from "react";
import { MainHeading } from "../../../globalStyles";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button, InputField, ErrorSummary } from "govuk-react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export const CompanyRegistrationLandingPage = () => {
  const navigate = useNavigate();
  const handleNextPage = () => {
    navigate("/register-company-details");
  };
  const RegistrationFormBreadcrumb = () => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Register Company</Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  return (
    <div className="container">
      <div
        className="form"
        style={{ marginTop: "70px", display: "inline-block" }}
      >
        <RegistrationFormBreadcrumb/>
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
        <Button style={{ marginBottom: "15px" }} onClick={handleNextPage}>
          Register now
        </Button>
      </div>
    </div>
  );
};
