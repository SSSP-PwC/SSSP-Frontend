import React from "react";
import { MainHeading } from "../../../globalStyles";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { Button } from "govuk-react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export const CitizenRegistrationLandingPage = () => {
  const { state } = useLocation();
  console.log(state);

  const navigate = useNavigate();
  const handleNextPage = () => {
    if (state !== null && state.company.company_creation_journey === true) {
      navigate("/register-citizen-name", {
        state: {
          company: {
            company_name: state.company.company_name,
            company_registration_number:
              state.company.company_registration_number,
            company_address: {
              address_line_1: state.company.company_address.address_line_1,
              address_line_2: state.company.company_address.address_line_2,
              postal_code: state.company.company_address.postal_code,
              country: state.company.company_address.country,
              locality: state.company.company_address.locality,
              region: state.company.company_address.region,
            },
            company_creation_journey: state.company.company_creation_journey,
          },
        },
      });
    } else if (state === null) {
      navigate("/register-citizen-name");
    }
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
          <li>Phone number</li>
          <li>Password</li>
        </ul>
        <Button style={{ marginBottom: "15px" }} onClick={handleNextPage}>
          Register now
        </Button>
      </div>
    </div>
  );
};
