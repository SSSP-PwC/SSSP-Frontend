import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button, MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

export const ChangeFirstName = () => {
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
    if (data.FirstName != undefined ) {
      setUserResponse(data.message);
      setShow(true);
      sessionStorage.setItem("citizen-first-name", data["FirstName"]);
      navigate("/register-citizen-summary");
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
              Enter first name
            </MainHeading> 
            <p style={{ color: "#505a5f" }}>
              Profile Creation: Edit details
            </p>
            <p style={{ color: "#505a5f" }}>
              Please complete this section with your own details.
            </p>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                style={{ borderColor: "black", maxWidth: "500px" }}
                {...register("FirstName", { required: true, maxLength: 80 })}
              />
              {errors.FirstName && (
                <p style={{ color: "red" }}>
                  <small>First Name is required</small>
                </p>
              )}

              {errors.FirstName?.type === "maxLength" && (
                <p style={{ color: "red" }}>
                  <small>Max characters should be 80</small>
                </p>
              )}
            </Form.Group>
            <br></br>
            <Form.Group>
              <Button
                style={{ marginBottom: "15px" }}
                onClick={handleSubmit(submitForm)}
              >
                Go to Summary
              </Button>
            </Form.Group>
            <br></br>
          </div>
          <br></br>
        </div>
      </div>
    </div>
  );
};
