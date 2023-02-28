import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { Button, ErrorSummary, Radio } from "govuk-react";

export const EligibilityCheckerTradingLength = () => {
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
  const [radioButton, setRadioButton] = useState("");
  const setNextPage = () => {
    navigate("/Eligibility-Checker-Selected-Product-Info", {
      state: {
        registered_company: state.registered_company,
        employee_count: state.employee_count,
        trading_length_criteria: "passed",
      },
    });
  };

  return (
    <div className="container">
      <div
        className="form"
        style={{ marginTop: "70px", display: "inline-block" }}
      >
        {radioButton === "Fail" && (
          <ErrorSummary
            description="Your business must be registered at Companies House or a Registered Society on the Financial Conduct Authority Mutuals Register."
            errors={[
              {
                targetName: "radio-button-answer",
                text: "Company not registered error",
              },
              {
                targetName: "description",
                text: "You answered no to this question",
              },
            ]}
            heading="Unfortunately, you cannot proceed."
          />
        )}
        <form style={{ display: "inline-block" }}>
          <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
            Self eligibility checker
          </MainHeading>
          <Divider style={{ background: "black" }}></Divider>
          <br></br>
          <p style={{ color: "#505a5f" }}>Section 3 of 5</p>

          <Form.Group>
            <Form.Label>
              Have you been trading for more than 12 months?
            </Form.Label>
            <p style={{ color: "#505a5f" }}>
              Your business must be purchasing the approved software for the
              first time.
              <br></br>You cannot apply for a software product that you already
              own or have an active subscription to.
              <br></br>If you already have software with a supplier listed on
              the Help to Grow: Digital platform, you can still apply for other
              types of software provided by the same supplier.
              <br></br>Major software upgrades are permitted.
            </p>

            <>
              <Radio onClick={setNextPage}>Yes</Radio>
              <Radio onClick={() => setRadioButton("Fail")}>No</Radio>
            </>
          </Form.Group>
          <br></br>
        </form>
      </div>
    </div>
  );
};
