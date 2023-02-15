import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button, MainHeading } from "../../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const ChangeEmail = () => {
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

  const submitForm = (data) => {
    //Replace with API callout to Companies House
    if (data.email !== undefined) {
      console.log(data);
      setUserResponse(data.message);
      sessionStorage.setItem("citizen-email", data["email"]);
      setShow(true);
      navigate("/register-citizen-summary");
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

            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              Enter your company name
            </MainHeading>
            <p style={{ color: "#0B0C0C" }}>
              We will use this information to cross-reference against companies
              house database
            </p>
          </>
        ) : (
          <div></div>
        )}
        <div style={{ display: "inline-block" }}>
          <form style={{ display: "inline-block" }}>
            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              Enter email address
            </MainHeading>
            <p style={{ color: "#505a5f" }}>Profile Creation: Edit details</p>
            <p style={{ color: "#505a5f" }}>
              Please complete this section with your own details.
            </p>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder={sessionStorage.getItem("citizen-email")}
                style={{ borderColor: "black", maxWidth: "500px" }}
                {...register("email", { required: true, maxLength: 80 })}
              />

              {errors.email && (
                <p style={{ color: "red" }}>
                  <small>Email is required</small>
                </p>
              )}

              {errors.email?.type === "maxLength" && (
                <p style={{ color: "red" }}>
                  <small>Max characters should be 80</small>
                </p>
              )}
            </Form.Group>
            <br></br>
          </form>

          <br></br>
          <Form.Group>
            <Button
              style={{ marginBottom: "15px" }}
              onClick={handleSubmit(submitForm)}
            >
              Go to summary
            </Button>
          </Form.Group>
          <br></br>

          <div></div>
        </div>
      </div>
    </div>
  );
};
