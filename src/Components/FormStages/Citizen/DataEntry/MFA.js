import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { MainHeading } from "../../../../globalStyles";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../../Auth/auth";
import {
  Radio,
  ErrorSummary,
  InputField,
  Button,
  Label,
  LoadingBox,
} from "govuk-react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const MFA = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [text, setText] = useState("Copy this text to clipboard");
  const [isCopied, setIsCopied] = useState(false);

  const [errorMessageFlag, setErrorMessageFlag] = useState(false);
  const [errorMessageTitle, setErrorMessageTitle] = useState("");
  const [errorMessageContent, setErrorMessageContent] = useState("");
  const [errorMessageCause, setErrorMessageCause] = useState("");
  const [verificationCode, setVerificationCodeField] = useState(false);
  const [verificationType, setVerificationType] = useState("google");
  const [renderToken, setRenderToken] = useState(false);
  const [token, setToken] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({});

  const handleVerifyClick = () => {
    verify(verificationType);
  };

  const verify = (mfa) => {
    if (mfa === "phone") {
      verifyPhoneOTP();
    } else if (mfa === "email") {
      verifyEmailOTP();
    } else if (mfa === "google") {
      verifyGoogleKey();
    }
  };

  const verifyGoogleKey = () => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    };

    fetch(
      `https://sssp-378808.nw.r.appspot.com/api/google-auth-verify/${state.email}/${token}/${data?.verification_code}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        
        console.log(data);
        if (data.message === "Authenticated") { 
        sessionStorage.setItem("Citizen_ID", data.citizen_id);
        login(data.access_token);
        setLoading(false); 
        navigate("/");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const verifyEmailOTP = () => {
    setLoading(true);

    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    };

    if (data?.verification_code.length === 6) {
      fetch(
        `https://sssp-378808.nw.r.appspot.com/api/verify-email-otp/${state.email}/${data?.verification_code}`,
        requestOptions
      )
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);

          if (data.message === "email verified") {
            login(data.access_token);
            navigate("/");
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const verifyPhoneOTP = () => {
    setLoading(true);

    const requestOptionsOne = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };
    fetch(
      `https://sssp-378808.nw.r.appspot.com/api/get-phone-number/${state.email}`,
      requestOptionsOne
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.phone_number != undefined) {
          setPhoneNumber(data.phone_number);
        }
      });
    if (phoneNumber !== "") {
      setLoading(true);
      const requestOptionsTwo = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      };
  

      fetch(
        `https://sssp-378808.nw.r.appspot.com/api/verify-phone-otp/${data.verification_code}/+${phoneNumber}`,
        requestOptionsTwo
      )
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);

          if (data.message === "Phone number verified") {
            login(data.access_token);
            navigate("/");
          }
        })
        .catch((error) => {
          setLoading(false);

          console.error(error);
        });
    }
  };

  const updateData = (e) => {
    console.log(data);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const phoneVerification = () => {
    setLoading(true);
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
        setLoading(false);

        if (
          data.message ===
          "Email not confirmed. Please check your email for instructions."
        ) {
          setLoading(false);

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
          setLoading(false);

          setErrorMessageTitle("Invalid email or password");
          setErrorMessageContent(
            "Please enter a valid email address and password."
          );
          setErrorMessageCause("Email address or password");
          setErrorMessageFlag(true);
        }
      })
      .catch((error) => {
        setLoading(false);

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
    setLoading(true);

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
      setLoading(false);

      setErrorMessageTitle("Email address not provided");
      setErrorMessageContent("Please enter your email address.");
      setErrorMessageCause("Email address");
      setErrorMessageFlag(true);
    } else if (state.password === "") {
      setLoading(false);

      setErrorMessageTitle("Password not provided");
      setErrorMessageContent("Please enter your password.");
      setErrorMessageCause("Password");
      setErrorMessageFlag(true);
    } else {
      fetch("https://sssp-378808.nw.r.appspot.com/api/login", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);

          if (data.message === "Invalid email or password") {
            setLoading(false);

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
            setLoading(false);

            setErrorMessageTitle("Email not confirmed");
            setErrorMessageContent(
              "Please check your email for instructions to confirm your email address."
            );
            setErrorMessageCause("Email confirmation");
            setErrorMessageFlag(true);
          } else if (data.message === "OTP sent") {
            setLoading(false);

            setVerificationCodeField(true);
          }
        })
        .catch((error) => {
          setLoading(false);

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
  const googleAuthenticator = () => {
    setLoading(true);

    setVerificationType("google");
    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: state.email,
        password: state.password,
        mfa_preference: "google",
      }),
    };
    if (state.email === "") {
      setLoading(false);

      setErrorMessageTitle("Email address not provided");
      setErrorMessageContent("Please enter your email address.");
      setErrorMessageCause("Email address");
      setErrorMessageFlag(true);
    } else if (state.password === "") {
      setLoading(false);

      setErrorMessageTitle("Password not provided");
      setErrorMessageContent("Please enter your password.");
      setErrorMessageCause("Password");
      setErrorMessageFlag(true);
    } else {
      fetch("https://sssp-378808.nw.r.appspot.com/api/login", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);

          if (
            data.message ===
            "Please enter the following secret into the google authenticator app"
          ) {
            setRenderToken(true);
            setVerificationCodeField(true);
            setToken(data.token);
          }
        })
        .catch((error) => {
          setLoading(false);
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
                  <LoadingBox loading={loading}>

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

              <>
                <Radio onClick={phoneVerification}>Phone</Radio>
                <Radio onClick={emailVerification}>Email</Radio>
                <Radio onClick={googleAuthenticator}>
                  Google Authenticator
                </Radio>

                {verificationCode === true && renderToken === false && (
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
                {verificationCode === true && renderToken === true && (
                  <>
                    <br></br>
                    <p style={{ color: "#505a5f" }}>
                      Please enter the following secret key into google
                      authenticator.
                    </p>

                    <Label>
                      Secret key:
                      <Label style={{ fontWeight: "bold" }}>{token}</Label>
                    </Label>
                    {isCopied ? (
                      <p className="success-msg">Text copied to clipboard</p>
                    ) : null}

                    <CopyToClipboard
                      text={token}
                      onCopy={() => {
                        setIsCopied(true);
                        setTimeout(() => {
                          setIsCopied(false);
                        }, 1000);
                      }}
                    >
                      <Button className="btn">COPY</Button>
                    </CopyToClipboard>
                    <br></br>
                    <p style={{ color: "#0B0C0C" }}>Guidance:</p>
                    <ul>
                      <li>
                        Download{" "}
                        <a href="https://googleauthenticator.net/">
                          Google Authenticator
                        </a>{" "}
                        on your mobile device
                      </li>
                      <li>Create a new account with the secret key</li>
                      <li>Provide the required details</li>
                      <li>Select time based authentication</li>
                      <li>
                        Submit the generated key from the app into the
                        verification code field
                      </li>
                    </ul>
                    <InputField
                      onChange={updateData}
                      input={{
                        name: "verification_code",
                      }}
                    >
                      Verification code
                    </InputField>
                    <br></br>
                    <Button onClick={handleVerifyClick}>Verify</Button>
                  </>
                )}
              </>

              <br></br>
            </div>{" "}
        </div>
      </div>          </LoadingBox>

    </div>
  );
};
