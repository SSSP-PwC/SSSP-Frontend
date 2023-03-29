import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { MainHeading } from "../../../../globalStyles";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../Auth/auth";
import { LoadingBox, Button, InputField, ErrorSummary } from "govuk-react";

export const CitizenSignIn = () => {
  const { handleSubmit } = useForm();
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [errorMessageFlag, setErrorMessageFlag] = useState(false);
  const [errorMessageTitle, setErrorMessageTitle] = useState("");
  const [errorMessageContent, setErrorMessageContent] = useState("");
  const [errorMessageCause, setErrorMessageCause] = useState("");

  const handleNextStage = () => {
    navigate("/sign-in-mfa", {
      state: {
        email: data.email,
        password: data.password
      }})
   
  };

  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
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
            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              Sign in to your citizen account
            </MainHeading>

            <InputField
              onChange={updateData}
              input={{
                name: "email",
                required: true,
              }}
            >
              Email
            </InputField>
            <br></br>

            <InputField
              onChange={updateData}
              input={{
                name: "password",
                type: "password",
                required: true,
              }}
            >
              Password
            </InputField>
            <br></br>

            <Form.Group>
              <Button
                style={{ marginBottom: "15px" }}
                onClick={handleSubmit(handleNextStage)}
              >
                Sign In
              </Button>
            </Form.Group>
            <Form.Group>
              <small>
                Don't have an account?{" "}
                <Link to="/register-citizen-landing">Create One</Link>
              </small>
            </Form.Group>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
};
