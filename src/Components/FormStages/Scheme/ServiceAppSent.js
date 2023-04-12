import React from "react";
import { MainHeading } from "../../../globalStyles";
import { Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "govuk-react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export const ServiceSent = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const handleNextPage = () => {
    navigate("/register-company-details", {
      state: {
        portal_creation_flag: state?.portal_creation_flag,
      },
    });
  };
  const RegistrationFormBreadcrumb = () => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Thank You</Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  return (
    <div className="container">
      <div
        className="form"
        style={{ marginTop: "70px", display: "inline-block" }}
      >
        <RegistrationFormBreadcrumb />
        <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
          We Have Received Your Application!
        </MainHeading>
        <Divider></Divider>
        <p style={{ color: "#0B0C0C" }}>
          A decision will be made on your application within x working days.
        </p>
        <p style={{ color: "#0B0C0C" }}>
          We appreciate your patience and look forward to welcoming you to the platform.
        </p>
        <p style={{ color: "#0B0C0C" }}>
          The result of the decision will be delivered to the email address provided.
        </p>
      </div>
    </div>
  );
};
