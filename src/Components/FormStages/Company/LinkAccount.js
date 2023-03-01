import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button, MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export const LinkAccount = () => {
  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [variantType, setVariantType] = useState("");
  const [userResponse, setUserResponse] = useState("");
  const submitForm = async (d) => {
    const cookies = new Cookies();

    const token = JSON.parse(cookies.get("REACT_TOKEN_AUTH_KEY"))
      const url = "http://127.0.0.1:21000/api/create-company";
      const data = {
        company_name: state.company_name,
        company_registration_number: state.company_number,
        company_address: {
          address_line_1: state.address_line_1,
          address_line_2: state.address_line_2,
          postal_code: state.postal_code,
          country: state.country,
          locality: state.locality,
          region: state.region,
        },
        email: d.EmailAddress,
        password: d.Password

      };

      const options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error(error);
      }
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
        <div style={{ display: "inline-block" }}>
          <div>
            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              Link an existing citizen account to {sessionStorage.getItem("company-name")} account
            </MainHeading>

            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email address"
                style={{ borderColor: "black", maxWidth: "500px" }}
                {...register("EmailAddress", {
                  required: true,
                  maxLength: 120,
                })}
              />

              {errors.EmailAddress && (
                <p style={{ color: "red" }}>
                  <small>Email Address is required</small>
                </p>
              )}

              {errors.CitizenID?.type === "maxLength" && (
                <p style={{ color: "red" }}>
                  <small>Max characters should be 120</small>
                </p>
              )}
            </Form.Group>
            <br></br>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                style={{ borderColor: "black", maxWidth: "500px" }}
                {...register("Password", {
                  required: true,
                  maxLength: 120,
                })}
              />

              {errors.Password && (
                <p style={{ color: "red" }}>
                  <small>Password is required</small>
                </p>
              )}

              {errors.Password?.type === "maxLength" && (
                <p style={{ color: "red" }}>
                  <small>Max characters should be 120</small>
                </p>
              )}
            </Form.Group>
            <br></br>
            <Form.Group>
              <Button
                style={{ marginBottom: "15px" }}
                onClick={handleSubmit(submitForm)}
              >
                Continue
              </Button>
            </Form.Group>
          </div>
        </div>
      </div>
    </div>
  );
};
