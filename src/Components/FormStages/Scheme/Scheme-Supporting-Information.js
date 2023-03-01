import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button, Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { Divider } from "@mui/material";

export const SchemeSupportingInformation = () => {
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
    navigate("/publish-scheme-summary", {
      state: {
        scheme_title: state.scheme_title,
        scheme_description: state.scheme_description,
        scheme_details: state.scheme_details,
        scheme_start_date: state.scheme_start_date,
        scheme_end_date: state.scheme_end_date,
        scheme_objectives_description: state.scheme_objectives_description,
        scheme_application_details_description: state.scheme_application_details_description,
        scheme_eligibility_criteria: state.scheme_eligibility_criteria,
        scheme_publisher_details: state.scheme_publisher_details,
        scheme_supporting_information_details: data.scheme_supporting_information_details
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
            <p style={{ color: "#505a5f" }}>Section 4 of 5</p>
            <MainHeading
              style={{ color: "#0B0C0C", fontWeight: "bold", fontSize: "20px" }}
            >
              Scheme Supporting Information
            </MainHeading>

            <Form.Group>
              <p style={{ color: "#505a5f" }}>
                Add any supporting information about the scheme
              </p>

              <textarea
                className="form-control"
                placeholder="Please describe here"
                rows="10"
                style={{ borderColor: "black", maxWidth: "500px" }}
                {...register("scheme_supporting_information_details", {
                  required: true,
                  maxLength: 4000,
                })}
              />

              {errors.scheme_supporting_information_details && (
                <p style={{ color: "red" }}>
                  <small>Scheme objectives required</small>
                </p>
              )}

              {errors.scheme_supporting_information_details?.type === "maxLength" && (
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
