import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button, Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

export const SchemeApplicationDetails = () => {
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
    navigate("/publish-scheme-eligibility-criteria", {
      state: {
        scheme_title: state.scheme_title,
        scheme_description: state.scheme_description,
        scheme_details: state.scheme_details,
        scheme_start_date: state.scheme_start_date,
        scheme_end_date: state.scheme_end_date,
        scheme_objectives: state.scheme_objectives,
        scheme_application_details: data.scheme_application_details
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
            <p style={{ color: "#505a5f" }}>Section 1 of 5</p>
            <MainHeading
              style={{ color: "#0B0C0C", fontWeight: "bold", fontSize: "20px" }}
            >
              Scheme Application Process
            </MainHeading>
         
            <Form.Group>
              <Form.Label>Details about the application process</Form.Label>
              <p style={{ color: "#505a5f" }}>Add as much detail here about the application process for the scheme</p>
              <textarea
                className="form-control"
                placeholder="Please describe here"
                rows="10"
                style={{ borderColor: "black", maxWidth: "500px" }}
                {...register("scheme_application_details", {
                  required: true,
                  maxLength: 4000,
                })}
              />

              {errors.scheme_application_details && (
                <p style={{ color: "red" }}>
                  <small>Application process details required</small>
                </p>
              )}

              {errors.scheme_application_details?.type === "maxLength" && (
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
