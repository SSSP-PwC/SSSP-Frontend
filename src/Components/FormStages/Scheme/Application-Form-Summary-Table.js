import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button, Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { Radio } from "govuk-react";

export const ApplicationFormSummaryTable = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  const postalAddress = state.postal_address;
  const legalOwner = state.legal_owner;
  const documentation = state.supporting_documentation;
  const fundsExhaustedFlag = state.funds_exhausted
  const [show, setShow] = useState(false);
  const [variantType, setVariantType] = useState("");
  const [userResponse, setUserResponse] = useState("");
  const [radioButton, setRadioButton] = useState("");
  
  const submit = () => {

  }

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
          <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
            Application Form Summary
          </MainHeading>
          <Divider></Divider>
          <br></br>
          <p style={{ color: "#505a5f" }}>Profile Creation: Section 5 of 5</p>
          <h6 style={{ color: "#0B0C0C", fontWeight: "bold" }}>
            Summary table
          </h6>
          <Form.Group>
            <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
              1. Building postal address:
            </Form.Label>
            <small>
              {postalAddress}
              <Link style={{ float: "right" }}>Change</Link>
            </small>
            <Divider></Divider>
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
              1. Building legal owner:
            </Form.Label>
            <small>
              {legalOwner}
              <Link style={{ float: "right" }}>Change</Link>
            </small>
            <Divider></Divider>
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
              2. Building Information, upload documentation:
            </Form.Label>
            <small>
              {documentation}
              <Link to="/change-last-name" style={{ float: "right" }}>
                Change
              </Link>
            </small>
            <Divider></Divider>
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
              3. Have other routes of funding been exhausted?
            </Form.Label>
            <small>
              {fundsExhaustedFlag}
              <Link to="/change-address-line-1" style={{ float: "right" }}>
                Change
              </Link>
            </small>
            <Divider></Divider>
          </Form.Group>

          <br></br>
          <Form.Group>
            <Button
              style={{ marginBottom: "15px" }}
              onClick={handleSubmit(submit)}
            >
              Submit
            </Button>
          </Form.Group>
          <br></br>
        </div>
      </div>
    </div>
  );
};
