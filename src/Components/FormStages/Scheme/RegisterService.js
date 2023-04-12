import React from "react";
import { MainHeading } from "../../../globalStyles";
import { Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "govuk-react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export const RegisterNewService = () => {
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
        <Breadcrumb.Item active>Register Service</Breadcrumb.Item>
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
          Register your Service
        </MainHeading>
        <Divider></Divider>
        <p style={{ color: "#0B0C0C" }}>
          We are delighted that you have decided to join us on SSSP!
        </p>

        <p style={{ color: "#0B0C0C" }}>
          If you have an existing live service, you can apply to be considered for integration on the SSSP platform.
        </p>
        <a href="/register-external">
             <Button style={{marginTop: '5px'}}>Apply Now</Button>
             </a>
        <p style={{ color: "#0B0C0C" }}>
          To host a service that does not yet exist, please use our Page Builder for a quick and intuitive solution.
        </p>
        <Button style={{ marginBottom: "15px" }} onClick={handleNextPage}>
          Page Builder
        </Button>
      </div>
    </div>
  );
};
