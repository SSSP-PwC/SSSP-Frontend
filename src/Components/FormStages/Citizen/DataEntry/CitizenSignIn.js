import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button, MainHeading } from "../../../../globalStyles";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../auth/auth";

export const CitizenSignIn = () => {
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
    const requestOptions={
        method:"POST",
        headers: {
            "content-type" : "application/json"
        },
        body:JSON.stringify(data)
    }
    fetch("http://localhost:5000/auth/login", requestOptions)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        login(data.access_token)
        //navigate("/")
    })
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
              Sign in to your citizen account
            </MainHeading>
        

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
              <Button
                style={{ marginBottom: "15px" }}
                onClick={handleSubmit(submitForm)}
              >
                Sign In
              </Button>
            </Form.Group>
            <Form.Group>
              <small>Don't have an account? <Link to='/register-citizen-landing'>Create One</Link></small>
            </Form.Group>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
};
