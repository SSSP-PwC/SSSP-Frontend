import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button, Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { Divider } from "@mui/material";

export const SchemeDates = () => {
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
    navigate("/publish-scheme-objectives", {
      state: {
        scheme_title: state.scheme_title,
        scheme_description: state.scheme_description,
        scheme_details: state.scheme_details,
        scheme_start_date: data.scheme_start_date,
        scheme_end_date: data.scheme_end_date,
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
            <Divider></Divider>
            <br></br>
            <p style={{ color: "#505a5f" }}>Section 1 of 5</p>
            <MainHeading
              style={{ color: "#0B0C0C", fontWeight: "bold", fontSize: "20px" }}
            >
              Scheme Dates
            </MainHeading>
            <p style={{ color: "#0B0C0C" }}>
              Please complete this section with the title of the scheme.
            </p>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                style={{ borderColor: "black", maxWidth: "500px" }}
                {...register("scheme_start_date", { required: true })}
              />

              {errors.scheme_start_date && (
                <p style={{ color: "red" }}>
                  <small>Scheme start date is required</small>
                </p>
              )}
            </Form.Group>
            <br></br>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                style={{ borderColor: "black", maxWidth: "500px" }}
                {...register("scheme_end_date", { required: true })}
              />

              {errors.scheme_end_date && (
                <p style={{ color: "red" }}>
                  <small>Scheme end date is required</small>
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
