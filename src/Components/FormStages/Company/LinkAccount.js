import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button, MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const LinkAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [variantType, setVariantType] = useState("");
  const [userResponse, setUserResponse] = useState("");
  const submitForm = (data) => {
    if (data.CitizenID != undefined) {
      console.log(data);
      setUserResponse(data.message);
      setShow(true);
      sessionStorage.setItem("citizen-id", data["CitizenID"]);
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
              Enter your Citizen ID
            </MainHeading>

            <Form.Group>
              <Form.Label>Citizen ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Citizen ID"
                style={{ borderColor: "black", maxWidth: "500px" }}
                {...register("CitizenID", {
                  required: true,
                  maxLength: 120,
                })}
              />

              {errors.CitizenID && (
                <p style={{ color: "red" }}>
                  <small>Citizen ID is required</small>
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
