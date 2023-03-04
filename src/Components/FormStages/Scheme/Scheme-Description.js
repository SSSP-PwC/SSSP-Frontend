import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { TextArea, Button } from "govuk-react";

export const SchemeDescription = () => {
  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [schemeDescription, setSchemeDescription] = useState("");
  const [schemeDetails, setSchemeDetails] = useState("");
  const [show, setShow] = useState(false);
  const [variantType, setVariantType] = useState("");
  const [userResponse, setUserResponse] = useState("");

  const handleNextStage = (data) => {
    navigate("/publish-scheme-dates", {
      state: {
        scheme_title: state.scheme_title,
        scheme_description: data.scheme_description,
        scheme_details: data.scheme_details,
      },
    });
  };
  const updateData = (e) => {
    setSchemeDescription({
      ...schemeDescription,
      [e.target.name]: e.target.value,
    });
    setSchemeDetails({
      ...schemeDetails,
      [e.target.name]: e.target.value,
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

            <TextArea
              onChange={updateData}
              input={{
                name: "scheme_description",
                rows: 5,
                cols: 70,
              }}
            >
              Short description about the scheme
            </TextArea>
            <br></br>

            <TextArea
              onChange={updateData}
              input={{
                name: "scheme_details",
                rows: 12,
                cols: 70,
              }}
            >
              Further details about the scheme
            </TextArea>
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
