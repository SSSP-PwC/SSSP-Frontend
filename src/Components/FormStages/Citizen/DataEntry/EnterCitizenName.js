import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { MainHeading } from "../../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoadingBox, Button, InputField, ErrorSummary } from "govuk-react";

export const EnterCitizenName = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [errorMessageFlag, setErrorMessageFlag] = useState(false);
  const [data, setData] = useState("");

  const submitForm = () => {
    if (data.first_name != undefined && data.last_name != undefined) {
      navigate("/register-citizen-address", {
        state: {
          first_name: data.first_name,
          last_name: data.last_name,
        },
      });
    } else {
      setErrorMessageFlag(true);
    }
  };
  const updateData = (e) => {
    console.log(data);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

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
            <p style={{ color: "#505a5f" }}>
              Please complete this section with your own details.
            </p>
            <InputField
              onChange={updateData}
              input={{
                name: "first_name",
                required: true,
              }}
            >
              First name
            </InputField>
            <br></br>
            <InputField
              onChange={updateData}
              input={{
                name: "last_name",
                required: true,
              }}
            >
              Last name
            </InputField>
            <br></br>
            <br></br>
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
