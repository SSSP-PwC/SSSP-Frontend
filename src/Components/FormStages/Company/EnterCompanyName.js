import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button, MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

export const EnterCompanyName = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [variantType, setVariantType] = useState("");
  const [userResponse, setUserResponse] = useState("");
  var company_name = sessionStorage.getItem("company-name");

  const submitForm = (data) => {
    //Replace with API callout to Companies House
    if (data.CompanyName != undefined) {
      console.log(data);
      setUserResponse(data.message);
      setShow(true);
      sessionStorage.setItem("company-name", data["CompanyName"]);
      navigate("/register-company-address");
    } else {
      alert("Company Name not defined");
    }
  };

  return (
    <div className="container">
      <div
        className="form"
        style={{ marginTop: "70px", display: "inline-block" }}
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
                Enter your company name
              </MainHeading>
              <p style={{ color: "#505a5f" }}>
                Profile Creation: Section 1 of 4
              </p>
              <p style={{ color: "#0B0C0C" }}>
                We will use this information to cross-reference against
                companies house database
              </p>
            </div>
            <Form.Group>
              <Form.Label>Company name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                style={{ borderColor: "black", maxWidth: "500px" }}
                {...register("CompanyName", { required: true, maxLength: 120 })}
              />

              {errors.CompanyName && (
                <p style={{ color: "red" }}>
                  <small>Company Name is required</small>
                </p>
              )}

              {errors.CompanyName?.type === "maxLength" && (
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
            <br></br>

          </div>
        

          </div>
    </div>
  );
};
