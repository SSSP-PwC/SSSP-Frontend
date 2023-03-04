import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { MainHeading } from "../../../../globalStyles";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingBox, Button, InputField, ErrorSummary } from "govuk-react";

export const EnterCitizenPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { state } = useLocation();

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
    if (data.password === data.confirm_password) {
      navigate("/register-citizen-summary", {
        state: {
          first_name: state.first_name,
          last_name: state.last_name,
          address_line_1: state.address_line_1,
          address_line_2: state.address_line_2,
          town_city: state.town_city,
          postcode: state.postcode,
          email: state.email,
          password: data.password,
        },
      });
    } else if (data.password !== data.confirm_password) {
      setErrorMessageTitle("Passwords do not match");
      setErrorMessageContent("You must provide passwords that match.");
      setErrorMessageCause("Password, Confirm Password");
      setErrorMessageFlag(true);
    }
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
