import React, { useState } from "react";
import { Form, Alert, Breadcrumb } from "react-bootstrap";
import { MainHeading } from "../../../../globalStyles";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  ErrorSummary,
  Heading,
  HintText,
  InputField,
  Label,
  LabelText,
  LoadingBox,
} from "govuk-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

export const EnterCitizenPhoneNumber = () => {
  const style = {
    backgroundColor: "#ffffff",
    border: "2px solid black",
    borderRadius: "0px",
    color: "#1d1d1d",
    height: "40px",
    width: "100%",

    ":focus": {
      outline: "none",
      border: "2px solid #005ea5",
    },
  };

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
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState();
  const [countryCode, setCountryCode] = useState();
  const [verificationField, setRenderVerificationField] = useState(false);
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

  function handleOnChange(value, data) {
    setValue(value);
    setCountryCode(data?.countryCode);
  }
  const sendVerificationCode = () => {
    if (value === undefined) {
      setErrorMessageTitle("Phone number is empty");
      setErrorMessageContent(
        "You must provide a phone number before proceeding."
      );
      setErrorMessageCause("Phone number");
      setErrorMessageFlag(true);
    } else {
      fetch(
        `https://sssp-378808.nw.r.appspot.com/api/validate-phone-number/${value}/${countryCode}`,
        {
          method: "GET",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          if (data.message === "Phone number is valid") {
            fetch(`https://sssp-378808.nw.r.appspot.com/api/send-otp/${value}`, {
              method: "POST",
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(response.statusText);
                }
                return response.json();
              })
              .then((data) => {
                console.log(data);
                if (
                  data.message ===
                  "Please enter the verification code sent to your phone number"
                ) {
                  setRenderVerificationField(true);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else if (data.message === "Phone number is not valid") {
            setErrorMessageTitle("Phone number is not valid");
            setErrorMessageContent("You must provide a valid phone number.");
            setErrorMessageCause("Phone number");
            setErrorMessageFlag(true);
          }
        });
    }
  };
  const submit = () => {
    fetch(
      `https://sssp-378808.nw.r.appspot.com/api/verify-otp-sign-up/${data.verification_code}/${value}`,
      {
        method: "POST",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === "phone number verified") {
          if (state?.company === undefined) {
            navigate("/register-citizen-password", {
              state: {
                first_name: state.first_name,
                last_name: state.last_name,
                address: {
                  address_line_1: state.address.address_line_1,
                  address_line_2: state.address.address_line_2,
                  town_city: state.address.town_city,
                  postcode: state.address.postcode,
                },
                email: state.email,                  
                phone_number: value

              },
            });
          } else if (
            data.email != undefined &&
            validateEmail(data.email) === true
          ) {
            navigate("/register-citizen-password", {
              state: {
                first_name: state.first_name,
                last_name: state.last_name,
                address: {
                  address_line_1: state.address.address_line_1,
                  address_line_2: state.address.address_line_2,
                  town_city: state.address.town_city,
                  postcode: state.address.postcode,
                },
                email: state.email,
                phone_number: value,
                company: {
                  company_name: state.company.company_name,
                  company_registration_number:
                    state.company.company_registration_number,
                  company_creation_journey:
                    state.company.company_creation_journey,
                  company_address: {
                    address_line_1:
                      state.company.company_address.address_line_1,
                    address_line_2:
                      state.company.company_address.address_line_2,
                    postal_code: state.company.company_address.postal_code,
                    country: state.company.company_address.country,
                    locality: state.company.company_address.locality,
                    region: state.company.company_address.region,
                  },
                },
              },
            }).catch((error) => {
              console.log(error);
            });
          }
        }
      });
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
        <Breadcrumb.Item href="/register-citizen-address">
          Applicant email
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Applicant phone number</Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  return (
    <div className="container">
      <LoadingBox>
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
          <div className="container">
            <RegistrationFormBreadcrumb />
            <Heading>Enter your phone number</Heading>{" "}
            <p style={{ color: "#505a5f" }}>Profile Creation: Section 4 of 5</p>
            <p style={{ color: "#505a5f" }}>
              Please complete this section with your own details.
            </p>
            <LabelText>Phone Number</LabelText>
            <PhoneInput
              value={value}
              country={"gb"}
              onChange={handleOnChange}
              inputStyle={style}
              specialLabel=""
              placeholder=""
            />
            <br></br>
            {verificationField === true && (
              <Label>
                <LabelText>Verification Code</LabelText>
                <HintText>
                  You will have received a 6 digit code on the phone number
                  provided
                </HintText>
                <InputField
                  onChange={updateData}
                  input={{
                    name: "verification_code",
                    required: true,
                  }}
                />
              </Label>
            )}
            <br></br>
            {verificationField === false ? (
              <Button onClick={sendVerificationCode}>
                Send Verification Code
              </Button>
            ) : (
              <Button onClick={submit}>Verify and Continue</Button>
            )}
          </div>
        </div>
      </LoadingBox>
    </div>
  );
};
