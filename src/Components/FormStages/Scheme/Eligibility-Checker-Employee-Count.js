import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { Button, ErrorSummary, InputField, Radio } from "govuk-react";
export const EligibilityCheckerEmployeeCount = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [employeeCount, setEmployeeCount] = useState(0);
  const [show, setShow] = useState(false);
  const [variantType, setVariantType] = useState("");
  const [userResponse, setUserResponse] = useState("");
  const [errorMessageFlag, setErrorMessageFlag] = useState(false);
  const [errorMessageDescription, setErrorMessageDescription] = useState("");
  const [errorMessageTextLineOne, setErrorMessageTextLineOne] = useState("");
  const [errorMessageTextLineTwo, setErrorMessageTextLineTwo] = useState("");
  const [errorHeading, setErrorHeading] = useState("");
  const { state } = useLocation();
  const submit = () => {
    var count = employeeCount.employee_count;
    if (count > 4 && count < 249) {
      navigate("/Eligibility-Checker-Trading-Length", {
        state: {
          registered_company: state.registered_company,
          employee_count: count,
        },
      });
    } else if (count < 5) {
      setErrorMessageFlag(true);
      setErrorHeading("Unfortunately, you cannot proceed.");
      setErrorMessageDescription(
        "The employee count specified is less than 5, which means you are not eligible."
      );
      setErrorMessageTextLineOne("Employee count error");
      setErrorMessageTextLineTwo("Employee count cannot be less than 5");
      reset();
    } else if (count > 249) {
      setErrorMessageFlag(true);
      setErrorHeading("Unfortunately, you cannot proceed.");
      setErrorMessageDescription(
        "The employee count specified is greater than 249, which means you are not eligible."
      );
      setErrorMessageTextLineOne("Employee count error");
      setErrorMessageTextLineTwo("Employee count cannot be greater than 249");
      reset();
    } else if (employeeCount === 0) {
      setErrorMessageFlag(true);
      setErrorHeading("You need specify the employee count.");
      setErrorMessageDescription("The employee count specified is empty.");
      setErrorMessageTextLineOne("Employee count error");
      setErrorMessageTextLineTwo("Employee count cannot be empty");
      reset();
    }
  };
  const updateData = (e) => {
    setEmployeeCount({
      ...employeeCount,
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
          {errorMessageFlag === false ? (
            <form style={{ display: "inline-block" }}>
              <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                Self eligibility checker
              </MainHeading>
              <Divider style={{ background: "black" }}></Divider>
              <br></br>
              <p style={{ color: "#505a5f" }}>Section 2 of 5</p>
              <Form.Group>
                <Form.Label>
                  How many people does your business employ?
                </Form.Label>
                <p style={{ color: "#505a5f" }}>
                  For more information on employee count go to <br></br>
                  https://mutuals.FinancialConductAuthority.org.uk
                </p>
                <InputField
                  onChange={updateData}
                  input={{
                    name: "employee_count",
                    type: "number",
                  }}
                >
                  Employee Count
                </InputField>
                <br></br>
              </Form.Group>{" "}
              <Button onClick={handleSubmit(submit)}>Continue</Button>
              <br></br>
            </form>
          ) : (
            <form style={{ display: "inline-block" }}>
              <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                Self eligibility checker
              </MainHeading>
              <Divider style={{ background: "black" }}></Divider>
              <br></br>
              <ErrorSummary
                description={errorMessageDescription}
                errors={[
                  {
                    targetName: "description",
                    text: errorMessageTextLineOne,
                  },
                  {
                    targetName: "description",
                    text: errorMessageTextLineTwo,
                  },
                ]}
                heading={errorHeading}
              />
              <p style={{ color: "#505a5f" }}>Section 2 of 5</p>
              <Form.Group>
                <Form.Label>
                  How many people does your business employ?
                </Form.Label>
                <p style={{ color: "#505a5f" }}>
                  For more information on employee count go to <br></br>
                  https://mutuals.FinancialConductAuthority.org.uk
                </p>
                <InputField
                  onChange={updateData}
                  input={{
                    name: "employee_count",
                    type: "number",
                  }}
                >
                  Employee Count
                </InputField>
                <br></br>
              </Form.Group>{" "}
              <Button onClick={handleSubmit(submit)}>Continue</Button>
              <br></br>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
