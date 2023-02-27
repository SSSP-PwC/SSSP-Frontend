import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button, Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { Radio } from "govuk-react";

export const ApplicationFormExhaustedForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [show, setShow] = useState(false);
  const [variantType, setVariantType] = useState("");
  const [userResponse, setUserResponse] = useState("");
  const [radioButton, setRadioButton] = useState("");
  const handleNextStage = () => {
    navigate("/Application-Form-Summary-Table", {
      state: {
        postalAddress: state.postal_address,
        legal_owner: state.legal_owner,
        documentation: state.supporting_documentation,
        funds_exhausted: radioButton,
      },
    });
  };
  const selectedRadioButtonOne = () => {
    setRadioButton("Yes");
  };
  const selectedRadioButtonTwo = () => {
    setRadioButton("No");
  };
  const selectedRadioButtonThree = () => {
    setRadioButton("Not applicable");
  };
  console.log(radioButton);
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
          <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
            Application Form
          </MainHeading>
          <Divider style={{ background: "black" }}></Divider>
          <br></br>
          <p style={{ color: "#505a5f" }}>Section 2 of 3</p>
          <MainHeading
            style={{
              color: "#0B0C0C",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            3. Have other routes of funding been exhausted?
          </MainHeading>
          <Form.Group>
            <Form>
              <>
                <Radio name="group1" onClick={selectedRadioButtonOne}>
                  Yes
                </Radio>
                <Radio name="group1" onClick={selectedRadioButtonTwo}>
                  No
                </Radio>
                <Radio name="group1" onClick={selectedRadioButtonThree}>
                  Not applicable
                </Radio>
              </>
            </Form>
          </Form.Group>
          <Form.Group>
            <Button
              style={{
                marginBottom: "15px",
                backgroundColor: "#b1b4b6",
                color: "black",
                margin: "20px",
              }}
            >
              Save as Draft
            </Button>
            <Button style={{ marginBottom: "15px" }} onClick={handleNextStage}>
              Continue
            </Button>
          </Form.Group>
          <br></br>
        </div>
      </div>
    </div>
  );
};
