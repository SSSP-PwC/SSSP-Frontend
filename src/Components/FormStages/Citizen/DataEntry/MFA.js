import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { MainHeading } from "../../../../globalStyles";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../../../Auth/auth";
import { Radio, ErrorSummary, InputField, Button } from "govuk-react";

export const MFA = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [errorMessageFlag, setErrorMessageFlag] = useState(false);
  const [errorMessageTitle, setErrorMessageTitle] = useState("");
  const [errorMessageContent, setErrorMessageContent] = useState("");
  const [errorMessageCause, setErrorMessageCause] = useState("");
  const [verificationCode, setVerificationCodeField] = useState(false);
  const [verificationType, setVerificationType] = useState("");
  const [onClickHandler, setOnClickHandler] = useState(null);

  const [data, setData] = useState();
  console.log(data?.verification_code.length);
  console.log(onClickHandler);

  const handleVerifyClick = () => {
    verify(verificationType);
  };

  const verify = (mfa) => {
    if (mfa === "phone") {
      verifyPhoneOTP();
    } else if (mfa === "email" && data?.verification_code.length === 6) {
      verifyEmailOTP();
    }
  };

  const verifyEmailOTP = () => {
    if (data?.verification_code.length === 6) {
      const requestOptions = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      };
      fetch(
        `https://sssp-378808.nw.r.appspot.com/api/verify-email-otp/${state.email}/${data.verification_code}`,
        requestOptions
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.message === "email verified") {
            login(data.access_token);
            navigate("/");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert(data?.verification_code);
    }
  };

  const verifyPhoneOTP = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    };
    fetch(
      `https://sssp-378808.nw.r.appspot.com/api/verify-phone-otp/${state.phone_number}/${data.otp}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "phone number verified") {
          login(data.access_token);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateData = (e) => {
    console.log(data);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const phoneVerification = () => {
    setVerificationType("phone");
    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: state.email,
        password: state.password,
        mfa_preference: "phone",
      }),
    };
    fetch(`https://sssp-378808.nw.r.appspot.com/api/login`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (
          data.message ===
          "Email not confirmed. Please check your email for instructions."
        ) {
          setErrorMessageTitle("Email not confirmed");
          setErrorMessageContent("Please check your email for instructions.");
          setErrorMessageCause("Email confirmation");
          setErrorMessageFlag(true);
        } else if (
          data.message ===
          "Please enter the verification code sent to your phone number"
        ) {
          setVerificationCodeField(true);
        } else {
          setErrorMessageTitle("Invalid email or password");
          setErrorMessageContent(
            "Please enter a valid email address and password."
          );
          setErrorMessageCause("Email address or password");
          setErrorMessageFlag(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessageTitle("Error");
        setErrorMessageContent(
          "An unexpected error occurred. Please try again later."
        );
        setErrorMessageCause("System error");
        setErrorMessageFlag(true);
      });
  };

  const emailVerification = () => {
    setVerificationType("email");
    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: state.email,
        password: state.password,
        mfa_preference: "email",
      }),
    };
    if (state.email === "") {
      setErrorMessageTitle("Email address not provided");
      setErrorMessageContent("Please enter your email address.");
      setErrorMessageCause("Email address");
      setErrorMessageFlag(true);
    } else if (state.password === "") {
      setErrorMessageTitle("Password not provided");
      setErrorMessageContent("Please enter your password.");
      setErrorMessageCause("Password");
      setErrorMessageFlag(true);
    } else {
      fetch("https://sssp-378808.nw.r.appspot.com/api/login", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Invalid email or password") {
            setErrorMessageTitle("Invalid email or password");
            setErrorMessageContent(
              "The email or password you entered is incorrect. Please try again."
            );
            setErrorMessageCause("Email or password");
            setErrorMessageFlag(true);
          } else if (
            data.message ===
            "Email not confirmed. Please check your email for instructions."
          ) {
            setErrorMessageTitle("Email not confirmed");
            setErrorMessageContent(
              "Please check your email for instructions to confirm your email address."
            );
            setErrorMessageCause("Email confirmation");
            setErrorMessageFlag(true);
          } else if (data.message === "OTP sent") {
            setVerificationCodeField(true);
          }
        })
        .catch((error) => {
          console.error(error);
          setErrorMessageTitle("Error");
          setErrorMessageContent(
            "An unexpected error occurred. Please try again later."
          );
          setErrorMessageCause("System error");
          setErrorMessageFlag(true);
        });
    }
  };

  return (
    <div className="container">
      <div
        className="form"
        style={{ marginTop: "20px", display: "inline-block" }}
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
              Multi-factor authentication
            </MainHeading>

            <p style={{ color: "#0B0C0C" }}>
              What is your preferred method of authentication?
            </p>

            <Form.Group>
              <Form>
                <>
                  <Radio onClick={phoneVerification}>Phone</Radio>
                  <Radio onClick={emailVerification}>Email</Radio>

                  {verificationCode === true && (
                    <>
                      <p style={{ color: "#505a5f" }}>
                        A verification code has been sent to the phone number
                        linked to your account.
                      </p>
                      <InputField
                        onChange={updateData}
                        input={{
                          name: "verification_code",
                          required: true,
                        }}
                      >
                        Verification code
                      </InputField>
                      <br></br>
                      <Button onClick={handleVerifyClick}>Verify</Button>
                    </>
                  )}
                </>
              </Form>
            </Form.Group>

            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
};
