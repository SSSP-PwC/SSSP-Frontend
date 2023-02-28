import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { Button, ErrorSummary, Radio } from "govuk-react";

export const EligibilityCheckerSoftwareDetails = () => {
  const { state } = useLocation();
  console.log(state);
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
    navigate("/Eligibility-Checker-Summary", {
      state: {
        registered_company: "Yes",
      },
    });
  };

  return (
    <div className="container">
      <div
        className="form"
        style={{ marginTop: "70px", display: "inline-block" }}
      >
        {radioButton === "No" && (
          <ErrorSummary
            description="The software can only be used for business purposes"
            errors={[
              {
                targetName: "radio-button-answer",
                text: "Software is for company use only",
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
          <p style={{ color: "#505a5f" }}>Section 5 of 6</p>

          <Form.Group>
            <Form.Label>
              If you are not buying your selected software for the first time, is this a major software upgrade for your business?
            </Form.Label>
            <p style={{ color: "#505a5f" }}>
            A purchase that represents a significant shift and change in operations is permitted and classed as a major upgrade. <br></br>For example, from desktop-based applications to cloud-based software as a service. <br></br>This includes major upgrades offered by your existing software supplier.

            </p>

            <>
              <Radio onClick={setNextPage}>Yes</Radio>
              <Radio onClick={() => setRadioButton("No")}>No</Radio>
            </>
          </Form.Group>
          <br></br>
        </form>
        <div></div>
      </div>
    </div>
  );
};
