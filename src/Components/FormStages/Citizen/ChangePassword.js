import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingBox, Button, InputField, ErrorSummary } from "govuk-react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export const ChangePassword = () => {
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
  const submitForm = async () => {
    if (data.new_password === data.confirm_new_password) {
      try {
        const token = cookies.get("REACT_TOKEN_AUTH_KEY")
        const response = await fetch('http://192.168.68.108:2000/api/update-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: data.password,
            newPassword: data.new_password,
          }),
        });
  
        if (response.ok) {
          navigate('/success-page');
        } else {
          const errorData = await response.json();
          setErrorMessageTitle('Error');
          setErrorMessageContent(errorData.message);
          setErrorMessageFlag(true);
        }
      } catch (error) {
        
        setErrorMessageTitle('Error');
        setErrorMessageContent(error.message);
        setErrorMessageFlag(true);
      }
    } else {
      setErrorMessageTitle('Passwords do not match');
      setErrorMessageContent('You must provide passwords that match.');
      setErrorMessageCause('Password, Confirm Password');
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
            Change Password
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
            Current Password
          </InputField>
          <br></br>
          <InputField
            onChange={updateData}
            input={{
              name: "new_password",
              type: "password",
            }}
          >
            New Password
          </InputField>
          <br></br>
          <InputField
            onChange={updateData}
            input={{
              name: "confirm_new_password",
              type: "password",
            }}
          >
            Confirm New Password
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
        }