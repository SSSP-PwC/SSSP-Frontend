import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button, Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

export const SchemeDescription = () => {
  const { state } = useLocation();

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

  const handleNextStage = (data) => {
    navigate("/publish-scheme-dates", {
      state: {
        scheme_title: state.scheme_title,
        scheme_description: data.scheme_description,
        scheme_details: data.scheme_details
      },
    });
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
        <div>
          <form style={{ display: "inline-block" }}>
            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              Publish Scheme
            </MainHeading>
            <Divider style={{ background: "black" }}></Divider>
            <br></br>
            <p style={{ color: "#505a5f" }}>Section 2 of 5</p>
            <MainHeading
              style={{ color: "#0B0C0C", fontWeight: "bold", fontSize: "20px" }}
            >
              Scheme Details
            </MainHeading>
            <p style={{ color: "#0B0C0C" }}>
              Please complete this section with the title of the scheme.
            </p>
            <Form.Group>
              <Form.Label>Short description about the scheme</Form.Label>
              <p style={{ color: "#505a5f" }}>This is for displaying a short blurb about the scheme</p>
              <textarea
                className="form-control"
                placeholder="Please describe here"
                rows="3"
                style={{ borderColor: "black", maxWidth: "500px" }}
                {...register("scheme_description", {
                  required: true,
                  maxLength: 250,
                })}
              />

              {errors.scheme_description && (
                <p style={{ color: "red" }}>
                  <small>Short description required</small>
                </p>
              )}

              {errors.scheme_description?.type === "maxLength" && (
                <p style={{ color: "red" }}>
                  <small>Max characters should be 250</small>
                </p>
              )}
            </Form.Group>
            <br></br>
            <Form.Group>
              <Form.Label>Further details about the scheme</Form.Label>
              <p style={{ color: "#505a5f" }}>Add as much detail here about the scheme</p>

              <textarea
                className="form-control"
                placeholder="Please describe here"
                rows="10"
                style={{ borderColor: "black", maxWidth: "500px" }}
                {...register("scheme_details", {
                  required: true,
                  maxLength: 4000,
                })}
              />

              {errors.scheme_details && (
                <p style={{ color: "red" }}>
                  <small>Scheme details required</small>
                </p>
              )}

              {errors.scheme_details?.type === "maxLength" && (
                <p style={{ color: "red" }}>
                  <small>Max characters should be 4000</small>
                </p>
              )}
            </Form.Group>
            <br></br>

            <Form.Group>
              <Button
                style={{ marginBottom: "15px" }}
                onClick={handleSubmit(handleNextStage)}
              >
                Continue
              </Button>
            </Form.Group>
            <br></br>
          </form>
        </div>
      </div>
    </div>
  );
};
