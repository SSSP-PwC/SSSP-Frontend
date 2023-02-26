import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button, MainHeading } from "../../../../globalStyles";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

export const EnterCitizenPassword = () => {
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
    if (data.password === data.confirmPassword) {
      console.log(data);
      setUserResponse(data.message);
      sessionStorage.setItem("Password", data.password);
      setShow(true);
      navigate("/register-citizen-summary", {
        state:{
          first_name: state.first_name,
          last_name: state.last_name,
          address_line_1: state.address_line_1,
          address_line_2: state.address_line_2,
          town_city: state.town_city,
          postcode: state.postcode,
          email: state.email,
          password: data["password"]
        }

      });
    } else {
      setUserResponse("Passwords do not match");
      setShow(true);
      setVariantType("danger");
    }
  };
  return (
    <div className="container">
      <div
        className="form"
        style={{ marginTop: "70px", display: "inline-block" }}
      >
        {show ? (
          <div style={{ marginTop: "50px" }}>
            <Alert
              variant={variantType}
              onClose={() => {
                setShow(false);
              }}
              dismissible
            >
              <p>{userResponse}</p>
            </Alert>
          </div>
        ) : (
          <div></div>
        )}
        <div style={{ display: "inline-block" }}>
          <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
            Create a Password
          </MainHeading>
          <p style={{ color: "#505a5f" }}>Profile Creation: Section 4 of 5</p>
          <p style={{ color: "#505a5f" }}>
            Please complete this section with your own details.
          </p>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter a password"
              style={{ borderColor: "black", maxWidth: "500px" }}
              {...register("password", { required: true, minLength: 8 })}
            />

            {errors.password && (
              <p style={{ color: "red" }}>
                <small>Password is required</small>
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p style={{ color: "red" }}>
                <small>Min characters should be 8</small>
              </p>
            )}
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              style={{ borderColor: "black", maxWidth: "500px" }}
              {...register("confirmPassword", { required: true, minLength: 8 })}
            />
            {errors.confirmPassword && (
              <p style={{ color: "red" }}>
                <small>Confirm Password is required</small>
              </p>
            )}
            {errors.confirmPassword?.type === "minLength" && (
              <p style={{ color: "red" }}>
                <small>Min characters should be 8</small>
              </p>
            )}
          </Form.Group>
          <br></br>
          <Button
            style={{ marginBottom: "15px" }}
            onClick={handleSubmit(submitForm)}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
