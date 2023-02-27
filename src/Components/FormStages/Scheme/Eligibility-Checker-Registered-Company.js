import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { Button, ErrorSummary, Radio } from "govuk-react";

export const EligibilityCheckerRegisteredCompany = () => {
  const { state } = useLocation();
    console.log(state)
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
    navigate("/Eligibility-Checker-Employee-Count")
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
          {radioButton === "" && (
            <form style={{ display: "inline-block" }}>
              <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                Self eligibility checker
              </MainHeading>
              <Divider style={{ background: "black" }}></Divider>
              <br></br>
              <p style={{ color: "#505a5f" }}>Section 1 of 5</p>

              <Form.Group>
                <Form.Label>
                  Is your business registered at Companies House or a Registered
                  Society <br></br>on the Financial Conduct Authority Mutuals
                  Register?
                </Form.Label>
                <p style={{ color: "#505a5f" }}>
                  You can find your Companies House number on your certificate
                  of incorporation. You can also search the Companies House
                  register (opens in new tab).
                  <br></br>For example, SP450735
                  <br></br>Mutual Societies can find this number on the
                  Financial Conduct Authority Public Mutuals Register (opens in
                  new tab) <br></br>https://mutuals.Financial Conduct
                  Authority.org.uk
                </p>

                <>
                  <Radio onClick={setNextPage}>Yes</Radio>
                  <Radio onClick={() => setRadioButton("No")}>No</Radio>
                </>
              </Form.Group>
              <br></br>
            </form>
          )}
          {radioButton === "No" && (
            <div>
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
              <form style={{ display: "inline-block" }}>
                <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                  Self eligibility checker
                </MainHeading>
                <Divider style={{ background: "black" }}></Divider>
                <br></br>
                <p style={{ color: "#505a5f" }}>Section 1 of 5</p>

                <Form.Group>
                  <Form.Label>
                    Is your business registered at Companies House or a
                    Registered Society <br></br>on the Financial Conduct
                    Authority Mutuals Register?
                  </Form.Label>
                  <p style={{ color: "#505a5f" }}>
                    You can find your Companies House number on your certificate
                    of incorporation. You can also search the Companies House
                    register (opens in new tab).
                    <br></br>For example, SP450735
                    <br></br>Mutual Societies can find this number on the
                    Financial Conduct Authority Public Mutuals Register (opens
                    in new tab) <br></br>https://mutuals.Financial Conduct
                    Authority.org.uk
                  </p>

                  <>
                    <Radio onClick={setNextPage}>Yes</Radio>
                    <Radio onClick={() => setRadioButton("No")}>No</Radio>
                  </>
                </Form.Group>
                <br></br>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
