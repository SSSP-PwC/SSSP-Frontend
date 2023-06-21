import React, { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({});

  const [otpQr, setotpQr] = useState("https://www.google.com/chart?chs=200x200&chld=M|0&cht=qr&chl=otpauth://totp/SSSP:adam.x.logan%40pwc.com?secret=3KMMYWWOYNNRRG6MIOZUQ2GVJCGZRCN4&issuer=SSSP");

  const fetchQR = async () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/genqrcode/adam.x.logan@pwc.com`)
        .then((res) => res.json())
        .then((data) => setotpQr(data.message))
  }

  useEffect(() => {
    fetchQR();
  }, []);

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
    } else if (mfa === "microsoft") {
      verifyMicrosoftKey();
    }
  };
  const radioButtons = document.querySelectorAll('input[type="radio"]');

  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener('click', () => {
      radioButtons.forEach((otherButton) => {
        if (otherButton !== radioButton) {
          otherButton.checked = false;
        }
      });
    });
  });

  const verifyMicrosoftKey = () => {
    setLoading(true);

    fetch(
      `http://127.0.0.1:2000/api/testotp/${data?.verification_code}`
    )
    .then((res) => res.json())
    .then((resData) => {
      console.log(resData.message);
      if (resData.message === "Authenticated") {
        alert("Valid");
        // sessionStorage.setItem("Citizen_ID", data.citizen_id);
        // login(data.access_token);
        setLoading(false);
        // navigate("/");
      } else if (resData.message === "Invalid OTP") {
        alert("Invalid");
        setLoading(false);
        setErrorMessageTitle("Invalid OTP");
        setErrorMessageContent(
          "Please check the OTP provided and try again."
        );
        setErrorMessageCause("OTP");
        setErrorMessageFlag(true);
      }
    })
    .catch((error) => {
      setLoading(false);
      console.error(error);
    });
  }

  const verifyGoogleKey = () => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    };

    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/google-auth-verify/${state.email}/${token}/${data?.verification_code}`,
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
      } else if (data.message === "Invalid OTP") {
        setLoading(false);
        setErrorMessageTitle("Invalid OTP");
        setErrorMessageContent(
          "Please check the OTP provided and try again."
        );
        setErrorMessageCause("OTP");
        setErrorMessageFlag(true);
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
        `${process.env.REACT_APP_BACKEND_URL}/verify-email-otp/${state.email}/${data?.verification_code}`,
        requestOptions
      )
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);

          if (data.message === "email verified") {
            login(data.access_token);
            sessionStorage.setItem("Citizen_ID", data.citizen_id);
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
      `${process.env.REACT_APP_BACKEND_URL}/get-phone-number/${state.email}`,
      requestOptionsOne
    )
      .then((res) => res.json())
      .then((response) => {
        const requestOptionsTwo = {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
        };

        fetch(
          `${process.env.REACT_APP_BACKEND_URL}/verify-phone-otp/${data?.verification_code}/${response.phone_number}`,
          requestOptionsTwo
        )
          .then((res) => res.json())
          .then((response_two) => {
            setLoading(false);

            if (response_two.message === "Phone number verified") {
              login(response_two.access_token);
              sessionStorage.setItem("Citizen_ID", response_two.citizen_id);
              navigate("/");
            }
          })
          .catch((error) => {
            setLoading(false);

            console.error(error);
          });
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
    fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, requestOptions)
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
      fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, requestOptions)
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

  const microsoftAuthenticator = () => {
    setLoading(false);
    setVerificationType("microsoft");

    const requestOptions = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      }
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
      setRenderToken(true);
      setVerificationCodeField(true);
      setToken("micorsoft token");

      // fetch(`${process.env.REACT_APP_BACKEND_URL}/genqrcode/adam.x.logan@pwc.com`)
      //   .then((res) => res.json())
      //   .then((data) => setotpQr(data.message))
    }
  }

  const googleAuthenticator = () => {
    setLoading(false);
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
      fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          if (
            data.message ===
            "Please enter the following secret into the google authenticator app"
          ) {
            setRenderToken(true);
            setVerificationCodeField(true);
            setToken(data.token);
          } else if (data.message === "MFA already configured") {
            const requestOptionsTwo = {
              method: "GET",
              headers: {
                "content-type": "application/json",
              },
            };
            fetch(
              `${process.env.REACT_APP_BACKEND_URL}/obtain-secret-key/${state.email}`,
              requestOptionsTwo
            )
              .then((res) => res.json())
              .then((data) => {
                if (data.message === "token present") {
                  setVerificationCodeField(true);
                  setToken(data.token);
                } else {
                  alert("error occured");
                }
              });
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
                <Radio onClick={phoneVerification}>SMS</Radio>
                <Radio onClick={emailVerification}>Email</Radio>
                <Radio onClick={googleAuthenticator}>
                  Google Authenticator
                </Radio>
                <Radio onClick={microsoftAuthenticator}>
                  Any Authenticator App
                </Radio>

                {verificationCode === true && renderToken === false && (
                  <>
                    <br></br>
                    <p style={{ color: "#505a5f" }}>
                      Please enter the one-time password (OTP) that has been
                      generated for you{" "}
                    </p>
                    <InputField
                      onChange={updateData}
                      input={{
                        name: "verification_code",
                        required: true,
                      }}
                    >
                      One-Time Password (OTP)
                    </InputField>
                    <br></br>
                    <Button onClick={handleVerifyClick}>Verify OTP</Button>
                  </>
                )}
                {verificationCode === true && renderToken === true && token !=="micorsoft token" && (
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
                {verificationCode === true && renderToken === true && token==="micorsoft token" && (
                  <>
                    <br></br>
                    <p style={{ color: "#505a5f" }}>
                      Please scan the below QR code within either the Google Authenticator app or the Microsoft Authenticator app.
                    </p>

                    {console.log("hello " + otpQr)}

                    <img src={`${otpQr}`} alt="QR Code for authenticator application" />
                    
                    <br></br>
                    <br></br>

                    <p style={{ color: "#0B0C0C" }}>Guidance:</p>
                    <ul>
                      <li>
                        Download{" "}
                        <a href="https://googleauthenticator.net/">
                          Google Authenticator
                        </a>{" "} 
                        or 
                        <a href="https://support.microsoft.com/en-us/account-billing/download-and-install-the-microsoft-authenticator-app-351498fc-850a-45da-b7b6-27e523b8702a">
                          Microsoft Authenticator
                        </a>{" "}
                        on your mobile device
                      </li>
                      <li>Go to add a new identity</li>
                      <li>Scan the QR code above</li>
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
        </div>{" "}
      </LoadingBox>
    </div>
  );
};
