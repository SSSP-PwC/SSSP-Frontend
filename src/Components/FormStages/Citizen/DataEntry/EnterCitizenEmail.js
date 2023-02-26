import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button, MainHeading } from "../../../../globalStyles";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

export const EnterCitizenEmail = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [show, setShow] = useState(false);
  const [variantType, setVariantType] = useState("");
  const [userResponse, setUserResponse] = useState("");
  const submitForm = (data) => {
    if (data.email != undefined) {
      console.log(data);
      setUserResponse(data.message);
      setShow(true);
      navigate("/register-citizen-password", {
        state: {
          first_name: state.first_name,
          last_name: state.last_name,
          address_line_1: state.address_line_1,
          address_line_2: state.address_line_2,
          town_city: state.town_city,
          postcode: state.postcode,
          email: data["email"],
        },
      });
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
              Enter your email address
            </MainHeading>
            <p style={{ color: "#505a5f" }}>Profile Creation: Section 3 of 5</p>
            <p style={{ color: "#505a5f" }}>
              Please complete this section with your own details.
            </p>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
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
