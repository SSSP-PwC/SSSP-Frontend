import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { MainHeading } from "../../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoadingBox, Button, InputField, ErrorSummary } from "govuk-react";

export const EnterCitizenAddress = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [errorMessageFlag, setErrorMessageFlag] = useState(false);
  const [errorMessageTitle, setErrorMessageTitle] = useState("");
  const [errorMessageContent, setErrorMessageContent] = useState("");
  const [errorMessageCause, setErrorMessageCause] = useState("");


  const { state } = useLocation();
  const [data, setData] = useState("");
  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const submitForm = () => {
    if (
      data.address_line_1 !== undefined &&
      data.town_city !== undefined &&
      data.postcode !== undefined
    ) {
      navigate("/register-citizen-email", {
        state: {
          first_name: state.first_name,
          last_name: state.last_name,
          address_line_1: data.address_line_1,
          address_line_2: data.address_line_2,
          town_city: data.town_city,
          postcode: data.postcode,
        },
      });
    } else if (data.address_line_1 === undefined && data.town_city === undefined && data.postcode === undefined){
      setErrorMessageTitle("All address fields are empty")
      setErrorMessageContent("You must provide your address details in order to proceed.")
      setErrorMessageCause("Address Line 1, Town/City, Postcode")
      setErrorMessageFlag(true)

    }
    else if (data.address_line_1 === undefined ){
      setErrorMessageTitle("Address Line 1 is empty")
      setErrorMessageContent("You must provide your address details in order to proceed.")
      setErrorMessageCause("Address Line 1")
      setErrorMessageFlag(true)

    }
    else if (data.town_city === undefined ){
      setErrorMessageTitle("Town/City is empty")
      setErrorMessageContent("You must provide your address details in order to proceed.")
      setErrorMessageCause("Town/City")
      setErrorMessageFlag(true)

    }
    else if (data.postcode === undefined ){
      setErrorMessageTitle("Postcode is empty")
      setErrorMessageContent("You must provide your address details in order to proceed.")
      setErrorMessageCause("Postcode")
      setErrorMessageFlag(true)

    }
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
                errorMessageContent
              }
              errors={[
                {
                  targetName: "description",
                  text: errorMessageCause,
                },
              ]}
              heading={errorMessageTitle}
            />
          </>
        )}
        <div style={{ display: "inline-block" }}>
          <form style={{ display: "inline-block" }}>
            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              Enter your address
            </MainHeading>
            <p style={{ color: "#505a5f" }}>Profile Creation: Section 2 of 5</p>
            <p style={{ color: "#505a5f" }}>
              Please complete this section with your own details.
            </p>
            <InputField
              onChange={updateData}
              input={{
                name: "address_line_1",
                required: true,
              }}
            >
              Address Line 1
            </InputField>
            <br></br>
            <InputField
              onChange={updateData}
              input={{
                name: "address_line_2",
                required: true,
              }}
            >
              Address Line 2
            </InputField>
            <br></br>
            <InputField
              onChange={updateData}
              input={{
                name: "town_city",
                required: true,
              }}
            >
              Town/City
            </InputField>
            <br></br>
            <InputField
              onChange={updateData}
              input={{
                name: "postcode",
                required: true,
              }}
            >
              Postcode
            </InputField>
            <br></br>
          </form>
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

          <div></div>
        </div>
      </div>
    </div>
  );
};
