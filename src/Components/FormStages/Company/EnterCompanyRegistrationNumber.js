import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button, MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const EnterCompanyRegistrationNumber = () => {
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
  console.log(company_name);
  const submitForm = (data) => {
    //Replace with API callout to Companies House
    if (data.CompanyRegistrationNumber != undefined) {
      console.log(data);
      setUserResponse(data.message);
      setShow(true);
      sessionStorage.setItem("company-registration-number", data["CompanyRegistrationNumber"]);
      navigate("/company-associated-contact");
    } else {
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
              Enter your company registration number
            </MainHeading>
            <p style={{ color: "#0B0C0C" }}>
              We will use this information to cross-reference against companies
              house database
            </p>

            <Form.Group>
              <Form.Label>Company registration number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company registration number"
                style={{ borderColor: "black", maxWidth: "500px" }}
                {...register("CompanyRegistrationNumber", {
                  required: true,
                  maxLength: 120,
                })}
              />

              {errors.CompanyRegistrationNumber && (
                <p style={{ color: "red" }}>
                  <small>Company Registration Number is required</small>
                </p>
              )}

              {errors.CompanyRegistrationNumber?.type === "maxLength" && (
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