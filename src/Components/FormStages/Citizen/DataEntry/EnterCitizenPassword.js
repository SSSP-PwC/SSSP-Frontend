import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { MainHeading } from "../../../../globalStyles";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingBox, Button, InputField, ErrorSummary } from "govuk-react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export const EnterCitizenPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);

  const [data, setData] = useState("");
  const [errorMessageFlag, setErrorMessageFlag] = useState(false);
  const [errorMessageTitle, setErrorMessageTitle] = useState("");
  const [errorMessageContent, setErrorMessageContent] = useState("");
  const [errorMessageCause, setErrorMessageCause] = useState("");
  const updateData = (e) => {
    console.log(data);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const submitForm = () => {
    if (state?.company === undefined) {
      navigate("/register-citizen-summary", {
        state: {
          first_name: state.first_name,
          last_name: state.last_name,
          address: {
          address_line_1: state.address_line_1,
          address_line_2: state.address_line_2,
          town_city: state.town_city,
          postcode: state.postcode,
          },
          email: state.email,
          password: data.password,
        },
      });
    } else if (data.password === data.confirm_password) {
      navigate("/register-citizen-summary", {
        state: {
          first_name: state.first_name,
          last_name: state.last_name,
          address: {
          address_line_1: state.address_line_1,
          address_line_2: state.address_line_2,
          town_city: state.town_city,
          postcode: state.postcode,
          email: state.email,
          },
          password: data.password,
          company: {
            company_name: state.company.company_name,
            company_registration_number: state.company.company_registration_number,
            company_creation_journey: state.company.company_creation_journey,
            company_address: {
              address_line_1: state.company.company_address.address_line_1,
              address_line_2: state.company.company_address.address_line_2,
              postal_code: state.company.company_address.postal_code,
              country: state.company.company_address.country,
              locality: state.company.company_address.locality,
              region: state.company.company_address.region,
            },
          },
        },
      });
    } else if (data.password !== data.confirm_password) {
      setErrorMessageTitle("Passwords do not match");
      setErrorMessageContent("You must provide passwords that match.");
      setErrorMessageCause("Password, Confirm Password");
      setErrorMessageFlag(true);
    }
  };
  const RegistrationFormBreadcrumb = () => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>

        <Breadcrumb.Item href="/register-citizen-landing">
          Register Citizen
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/register-citizen-name">
          Applicant name
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/register-citizen-address">
          Applicant address
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/register-citizen-email">
          Applicant email
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Applicant password</Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  return (
    <div className="container">
      <div
        className="form"
        style={{ marginTop: "70px", display: "inline-block" }}
      >
        {errorMessageFlag && (
          <>
            <ErrorSummary
              description={errorMessageContent}
              errors={[
                {
                  targetName: "description",
                  text: errorMessageCause,
                },
              ]}
              heading={errorMessageTitle}
            />
          </>
        )}
        <div style={{ display: "inline-block" }}>
          <RegistrationFormBreadcrumb />
          <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
            Create a Password
          </MainHeading>
          <p style={{ color: "#505a5f" }}>Profile Creation: Section 4 of 5</p>
          <p style={{ color: "#505a5f" }}>
            Please complete this section with your own details.
          </p>

          <InputField
            onChange={updateData}
            input={{
              name: "password",
              type: "password",
            }}
          >
            Password
          </InputField>
          <br></br>
          <InputField
            onChange={updateData}
            input={{
              name: "confirm_password",
              type: "password",
            }}
          >
            Confirm Password
          </InputField>
          <br></br>
          <Button
            style={{ marginBottom: "15px" }}
            onClick={handleSubmit(submitForm)}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
