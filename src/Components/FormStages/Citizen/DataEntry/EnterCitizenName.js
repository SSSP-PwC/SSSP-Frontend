import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { MainHeading } from "../../../../globalStyles";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, InputField, ErrorSummary } from "govuk-react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export const EnterCitizenName = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [errorMessageFlag, setErrorMessageFlag] = useState(false);
  const [data, setData] = useState("");
  const { state } = useLocation();
  console.log(state);

  const submitForm = () => {
    if (data.first_name != undefined && data.last_name != undefined) {
      navigate("/register-citizen-address", {
        state: {
          first_name: data.first_name,
          last_name: data.last_name,
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
    } else {
      setErrorMessageFlag(true);
    }
  };
  const updateData = (e) => {
    console.log(data);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const RegistrationFormBreadcrumb = () => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>

        <Breadcrumb.Item href="/register-citizen-landing">
          Register Citizen
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Applicant name</Breadcrumb.Item>
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
              description={
                "Please check that you have provided both first name and last name."
              }
              errors={[
                {
                  targetName: "description",
                  text: "Name issue",
                },
              ]}
              heading={"First name or last name not provided"}
            />
          </>
        )}
        <div style={{ display: "inline-block" }}>
          <div>
            {" "}
            <RegistrationFormBreadcrumb />
            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              Applicant name
            </MainHeading>
            <p style={{ color: "#505a5f" }}>Profile Creation: Section 1 of 5</p>
            <p style={{ color: "#505a5f" }}>
              Please complete this section with your own details.
            </p>
            <InputField
              onChange={updateData}
              input={{
                name: "first_name",
                required: true,
              }}
            >
              First name
            </InputField>
            <br></br>
            <InputField
              onChange={updateData}
              input={{
                name: "last_name",
                required: true,
              }}
            >
              Last name
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
            <br></br>
          </div>
          <br></br>
        </div>
      </div>
    </div>
  );
};
