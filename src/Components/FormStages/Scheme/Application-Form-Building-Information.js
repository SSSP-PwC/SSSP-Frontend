import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button, Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
export const ApplicationFormBuildingInformation = () => {
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

  const handleStageOne = (data) => {
    navigate("/Application-Form-Exhausted-Funds", {state: {
      postalAddress: data.postal_address,
      legal_owner: data.legal_owner,
      documentation: data.supporting_documentation
    }})
   
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
              <div>
                <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                  Application Form
                </MainHeading>
                <Divider style={{ background: "black" }}></Divider>
                <br></br>
                <p style={{ color: "#505a5f" }}>Section 1 of 3</p>
                <MainHeading
                  style={{
                    color: "#0B0C0C",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  1. Building Information
                </MainHeading>
                <p style={{ color: "#505a5f" }}>
                  Please include the postal address of the building
                </p>

                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Enter building postal address"
                    style={{ borderColor: "black", maxWidth: "500px" }}
                    {...register("postal_address", {
                      required: true,
                      maxLength: 80,
                    })}
                  />

                  {errors.postal_address && (
                    <p style={{ color: "red" }}>
                      <small>Building postal address is required</small>
                    </p>
                  )}

                  {errors.postal_address?.type === "maxLength" && (
                    <p style={{ color: "red" }}>
                      <small>Max characters should be 80</small>
                    </p>
                  )}
                </Form.Group>
                <br></br>
                <p style={{ color: "#505a5f" }}>
                  Please include the legal owner of the building. This might be
                  a person or a company.
                </p>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Enter the legal owner of the building"
                    style={{ borderColor: "black", maxWidth: "500px" }}
                    {...register("legal_owner", {
                      required: true,
                      maxLength: 80,
                    })}
                  />

                  {errors.legal_owner && (
                    <p style={{ color: "red" }}>
                      <small>Legal building owner is required</small>
                    </p>
                  )}

                  {errors.legal_owner?.type === "maxLength" && (
                    <p style={{ color: "red" }}>
                      <small>Max characters should be 80</small>
                    </p>
                  )}
                </Form.Group>
                <MainHeading
                  style={{
                    color: "#0B0C0C",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  2. Building Information, upload documentation
                </MainHeading>
                <p style={{ color: "#505a5f" }}>
                  Please upload any supporting documentation such as a title
                  deed.
                </p>
                <Form.Group>
                  <Form.Control
                    type="file"
                    style={{ borderStyle: "none", maxWidth: "500px" }}
                    {...register("supporting_documentation", {
                      required: false,
                    })}
                  />
                </Form.Group>
                <br></br>
                <Form.Group>
                  <Button
                    style={{
                      marginBottom: "15px",
                      backgroundColor: "#b1b4b6",
                      color: "black",
                      margin: "20px",
                    }}
                    onClick={handleSubmit(handleStageOne)}
                  >
                    Save as Draft
                  </Button>
                  <Button
                    style={{ marginBottom: "15px" }}
                    onClick={handleSubmit(handleStageOne)}
                  >
                    Continue
                  </Button>
                </Form.Group>
                <br></br>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};
