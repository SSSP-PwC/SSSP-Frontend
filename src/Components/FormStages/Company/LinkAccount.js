import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import {
  Button,
  ErrorSummary,
  InputField,
  Radio,
  LoadingBox,
} from "govuk-react";
import Breadcrumb from "react-bootstrap/Breadcrumb";


export const LinkAccount = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [variantType, setVariantType] = useState("");
  const [userResponse, setUserResponse] = useState("");

  const updateData = (e) => {
    setEmailAddress({
      ...emailAddress,
      [e.target.name]: e.target.value,
    });
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };
  const submit = async () => {
    setLoading(true);
    const url = "http://127.0.0.1:1000/api/link-citizen-to-company-checks";

    const data = {
      email: emailAddress.email,
      password: password.password,
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
      if (result["citizen"]["message"] === "citizen exists") {
        navigate("/register-company-summary", {
          state: {
            company_name: state.company_name,
            company_registration_number: state.company_registration_number,
            company_address: {
              address_line_1: state.address_line_1,
              address_line_2: state.address_line_2,
              postal_code: state.postal_code,
              country: state.country,
              locality: state.locality,
              region: state.region,
            },
            contact_person: result,
          },
        });
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const RegistrationFormBreadcrumb = () => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/register-company-landing">Register Company</Breadcrumb.Item>
        <Breadcrumb.Item href="/register-company-details">Company details</Breadcrumb.Item>
        <Breadcrumb.Item active>Contact association</Breadcrumb.Item>
      </Breadcrumb>
    );
  };
  return (
    <div className="container">
      <div
        className="form"
        style={{ marginTop: "20px", display: "inline-block" }}
      >
        {show ? (
          <>
            <Alert
              variant={variantType}
              onClose={() => {
                setShow(false);
              }}
              dismissible
            >
              <p>{userResponse}</p>
            </Alert>
          </>
        ) : (
          <div></div>
        )}

        <form style={{ display: "inline-block" }}>
          <RegistrationFormBreadcrumb/>
          <LoadingBox loading={loading}>
            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              Link an existing citizen account
            </MainHeading>
            <Divider style={{ background: "black" }}></Divider>
            <br></br>
            <p style={{ color: "#505a5f" }}>Section 2 of 5</p>
            <Form.Group>
              <Form.Label>
                Please enter email address and password
              </Form.Label>
   
              <InputField
                onChange={updateData}
                input={{
                  name: "email",
                  type: "email",
                }}
              >
                Email Address
              </InputField>
              <br></br>
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
            </Form.Group>{" "}
            <Button onClick={handleSubmit(submit)}>Continue</Button>
            <br></br>
          </LoadingBox>
        </form>
      </div>
    </div>
  );
};
