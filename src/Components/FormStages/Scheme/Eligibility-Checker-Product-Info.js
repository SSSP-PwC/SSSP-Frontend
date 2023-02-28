import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { Button, ErrorSummary, Radio } from "govuk-react";

export const EligibilityCheckerProductInfo = () => {
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
    navigate("/Eligibility-Checker-Software-Details", {
      state: {
        registered_company: state.registered_company,
        employee_count: state.employee_count,
        trading_length_criteria: "passed",
        selected_product_criteria: "passed",
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
            description="Your business must be purchasing the approved software for the first time. You cannot apply for a software product that you already own or have an active subscription to."
            errors={[
              {
                targetName: "radio-button-answer",
                text: "Your business must be purchasing the approved software for the first time",
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
          <p style={{ color: "#505a5f" }}>Section 4 of 6</p>

          <Form.Group>
            <Form.Label>
              Are you buying your selected product for the first time?
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
