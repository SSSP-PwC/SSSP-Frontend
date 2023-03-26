import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { LoadingBox, Button, ErrorSummary } from "govuk-react";
import { AccountCreatedMessage } from "./Account-Created-Message";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import SignUpMessage from "../../SignUpMessage";

export const CitizenRegistrationSummary = () => {
  const { handleSubmit } = useForm();
  const [signUpMessage, setSignUpMessage] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);

  const [errorMessageFlag, setErrorMessageFlag] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  const [loading, setLoading] = useState(false);

  var first_name = state.first_name;
  var last_name = state.last_name;
  var address_line_1 = state.address.address_line_1;
  var address_line_2 = state.address.address_line_2;
  var town_city = state.address.town_city;
  var postcode = state.address.postcode;
  var email = state.email;
  var password = state.password;
  console.log(state);

  const submitForm = async () => {
    setLoading(true);
    const url = "https://sssp-378808.nw.r.appspot.com/api/signup";
    const d = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      address: {
        address_line_1: address_line_1,
        address_line_2: address_line_2,
        town_city: town_city,
        postcode: postcode,
      },
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(d),
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      setLoading(false);
      if (result["message"] === "User created successfully") {
        setAccountCreated(true);
        if (
          result["message"] ===
          "A confirmation email has been sent to your email address"
        ) {
          setSignUpMessage(true);
        }
        if (state.company.company_creation_journey === true) {
          const url =
            "https://sssp-378808.nw.r.appspot.com/api/link-citizen-to-company-checks";

          const data = {
            email: email,
            password: password,
          };

          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          };
          try {
            const response = await fetch(url, options);
            const result = await response.json();
            setLoading(false);
            if (state?.company === undefined) {
              setAccountCreated(true);
            } else if (result["citizen"]["message"] === "citizen exists") {
              navigate("/register-company-summary", {
                state: {
                  company: {
                    company_name: state.company.company_name,
                    company_registration_number:
                      state.company.company_registration_number,
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
                  contact_person: result,
                },
              });
              console.log(result);
            }
          } catch (error) {
            console.error(error);
          }
        }
      } else if (result["message"] === "User already exists") {
        setErrorMessageFlag(true);
      }
    } catch (error) {
      console.error(error);
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
        <Breadcrumb.Item href="/register-citizen-email">
          Applicant email
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/register-citizen-password">
          Applicant password
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Summary</Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  return (
    <div className="container">
      <div
        className="form"
        style={{ marginTop: "70px", display: "inline-block" }}
      >
        {signUpMessage === true && <SignUpMessage />}
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
        {accountCreated && (
          <>
            <AccountCreatedMessage />
          </>
        )}
        {accountCreated === false && (
          <div style={{ display: "inline-block" }}>
            <RegistrationFormBreadcrumb />
            <LoadingBox loading={loading}>
              <form style={{ display: "inline-block" }}>
                <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                  Citizen Registration Form
                </MainHeading>
                <p style={{ color: "#505a5f" }}>
                  Profile Creation: Section 5 of 5
                </p>
                <h6 style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                  Summary table
                </h6>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                    First name:
                  </Form.Label>
                  <small>
                    {first_name}
                    <Link to="/change-first-name" style={{ float: "right" }}>
                      Change
                    </Link>
                  </small>
                  <Divider></Divider>
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                    Last name:
                  </Form.Label>
                  <small>
                    {last_name}
                    <Link to="/change-last-name" style={{ float: "right" }}>
                      Change
                    </Link>
                  </small>
                  <Divider></Divider>
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                    Address line 1:
                  </Form.Label>
                  <small>
                    {address_line_1}
                    <Link
                      to="/change-address-line-1"
                      style={{ float: "right" }}
                    >
                      Change
                    </Link>
                  </small>
                  <Divider></Divider>
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                    Address line 2:
                  </Form.Label>
                  <small>
                    {address_line_2}
                    <Link
                      to="/change-address-line-2"
                      style={{ float: "right" }}
                    >
                      Change
                    </Link>
                  </small>
                  <Divider></Divider>
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                    Town/City:
                  </Form.Label>
                  <small>
                    {town_city}
                    <Link to="/change-town-city" style={{ float: "right" }}>
                      Change
                    </Link>
                  </small>
                  <Divider></Divider>
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                    Postcode:
                  </Form.Label>
                  <small>
                    {postcode}
                    <Link to="/change-postcode" style={{ float: "right" }}>
                      Change
                    </Link>
                  </small>
                  <Divider></Divider>
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                    Email Address:
                  </Form.Label>
                  <small>
                    {email}
                    <Link to="/change-email-address" style={{ float: "right" }}>
                      Change
                    </Link>
                  </small>
                  <Divider></Divider>
                </Form.Group>

                <br></br>
                <Form.Group>
                  <Button
                    style={{ marginBottom: "15px" }}
                    onClick={handleSubmit(submitForm)}
                  >
                    Sign Up
                  </Button>
                </Form.Group>
                <br></br>
              </form>
            </LoadingBox>
          </div>
        )}
      </div>
    </div>
  );
};
