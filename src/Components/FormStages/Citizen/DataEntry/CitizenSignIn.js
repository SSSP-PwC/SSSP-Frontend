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
  const submitForm = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("https://sssp-378808.nw.r.appspot.com/api/login", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        login(data.access_token);
        navigate("/");
      });
  };
  const updateData = (e) => {
    console.log(data);
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
              description={
                "A user already exists with the email address provided."
              }
              errors={[
                {
                  targetName: "description",
                  text: "Email address",
                },
              ]}
              heading={"User already exists"}
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
                type: 'password',
                required: true,
              }}
            >
              Password
            </InputField>
            <br></br>

            <Form.Group>
              <Button
                style={{ marginBottom: "15px" }}
                onClick={handleSubmit(submitForm)}
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
