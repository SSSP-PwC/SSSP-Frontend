import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { MainHeading } from "../../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { DateField, Button, InputField, ErrorSummary } from "govuk-react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const EnterDOB = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  const composeDate = (date) => {
    return new Date(date);
  };
  const [errorMessageFlag, setErrorMessageFlag] = useState(false);
  const [data, setData] = useState("");
  console.log(data)
  const submitForm = () => {
    if (data !== undefined ) {
      navigate("/register-citizen-address", {
        state: {
          first_name: state.first_name,
          last_name: state.last_name,
          dob: composeDate(data)
        },
      });
    } else {
      setErrorMessageFlag(true);
    }
  };
  console.log(data.$D);
  console.log(data.$M + 1);
  console.log(data.$y);


  let dateString = data.$M + 1 + "-" + data.$D + "-" + data.$y;
  console.log(composeDate(dateString.toString()));

  return (
    <div className="container">
      <div
        className="form"
        style={{ marginTop: "70px", display: "inline-block" }}
      >
        {errorMessageFlag && (
          <>
            <ErrorSummary
              description={
                "Please check that you have provided both first name and last name."
              }
              errors={[
                {
                  targetName: "description",
                  text: "Name issue",
                },
              ]}
              heading={"First name or last name not provided"}
            />
          </>
        )}
        <div style={{ display: "inline-block" }}>
          <div>
            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              Applicant name
            </MainHeading>
            <p style={{ color: "#505a5f" }}>Profile Creation: Section 1 of 5</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Date of Birth"
                  name="date"
                  onChange={(date) => {
                    setData(date);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <br></br>
            <Form.Group>
              <Button
                style={{ marginBottom: "15px" }}
                onClick={handleSubmit(submitForm)}
              >
                Continue
              </Button>
            </Form.Group>
            <br></br>
          </div>
          <br></br>
        </div>
      </div>
    </div>
  );
};
