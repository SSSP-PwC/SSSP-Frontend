import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { MainHeading } from "../../../../globalStyles";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, InputField, ErrorSummary } from "govuk-react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export const EnterCitizenEmail = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state)

  const [data, setData] = useState("");
  const [errorMessageFlag, setErrorMessageFlag] = useState(false);
  const [errorMessageTitle, setErrorMessageTitle] = useState("");
  const [errorMessageContent, setErrorMessageContent] = useState("");
  const [errorMessageCause, setErrorMessageCause] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  };
  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const submitForm = () => {
    if (state?.company === undefined) {
      navigate("/register-citizen-password", {
        state: {
          first_name: state.first_name,
          last_name: state.last_name,
          address_line_1: state.address_line_1,
          address_line_2: state.address_line_2,
          town_city: state.town_city,
          postcode: state.postcode,
          email: data.email,
        },
      });
    } else if (data.email != undefined && validateEmail(data.email) === true) {
      navigate("/register-citizen-password", {
        state: {
          first_name: state.first_name,
          last_name: state.last_name,
          address_line_1: state.address_line_1,
          address_line_2: state.address_line_2,
          town_city: state.town_city,
          postcode: state.postcode,
          email: data.email,
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
            }
          },
        },
      });
    } else if (data.email === undefined) {
      setErrorMessageTitle("Email address is empty");
      setErrorMessageContent("You must provide an email address.");
      setErrorMessageCause("Email address");
      setErrorMessageFlag(true);
    } else if (validateEmail(data.email) === false) {
      setErrorMessageTitle("Email address is invalid");
      setErrorMessageContent(
        "You must provide an email address in the correct format."
      );
      setErrorMessageCause("Email address");
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
        <Breadcrumb.Item active>Applicant email</Breadcrumb.Item>
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
          <div>
            <RegistrationFormBreadcrumb />
            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              Enter your email address
            </MainHeading>
            <p style={{ color: "#505a5f" }}>Profile Creation: Section 3 of 5</p>
            <p style={{ color: "#505a5f" }}>
              Please complete this section with your own details.
            </p>

            <InputField
              onChange={updateData}
              input={{
                name: "email",
                required: true,
              }}
            >
              Email address
            </InputField>
            <br></br>
            <Form.Group>
              <Button
                style={{ marginBottom: "15px" }}
                onClick={handleSubmit(submitForm)}
              >
                Continue
              </Button>
            </Form.Group>
          </div>
        </div>
      </div>
    </div>
  );
};
