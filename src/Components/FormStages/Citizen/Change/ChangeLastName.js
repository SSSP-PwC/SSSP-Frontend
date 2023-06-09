import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button, MainHeading } from "../../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const ChangeLastName = () => {
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
    if (data.LastName != undefined) {
      setUserResponse(data.message);
      setShow(true);
      sessionStorage.setItem("citizen-last-name", data["LastName"]);
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
              Enter last name
            </MainHeading>
            <p style={{ color: "#505a5f" }}>Profile Creation: Edit details</p>
            <p style={{ color: "#505a5f" }}>
              Please complete this section with your own details.
            </p>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={
                  "You entered: " + sessionStorage.getItem("citizen-postcode")
                }
                style={{ borderColor: "black", maxWidth: "500px" }}
                {...register("LastName", { required: true, maxLength: 80 })}
              />

              {errors.LastName && (
                <p style={{ color: "red" }}>
                  <small>Last Name is required</small>
                </p>
              )}
              {errors.LastName?.type === "maxLength" && (
                <p style={{ color: "red" }}>
                  <small>Max characters should be 80</small>
                </p>
              )}
            </Form.Group>
            <br></br>
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
