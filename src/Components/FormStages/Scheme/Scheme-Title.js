import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { Button, InputField, ErrorSummary } from "govuk-react";

export const SchemeTitle = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [schemeTitle, setSchemeTitle] = useState("");

  const [show, setShow] = useState(false);
  const [variantType, setVariantType] = useState("");
  const [userResponse, setUserResponse] = useState("");
  const [errorMessageFlag, setErrorMessageFlag] = useState(false);

  const handleNextStage = () => {
    const title = schemeTitle;
    console.log(title.scheme_title);
    if (title.scheme_title === undefined) {
      setErrorMessageFlag(true);
      reset();
    } else {
      navigate("/publish-scheme-details", {
        state: {
          scheme_title: title.scheme_title,
        },
      });
    }
  };
  const updateData = (e) => {
    setSchemeTitle({
      ...schemeTitle,
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
                Publish Scheme
              </MainHeading>
              <Divider></Divider>
              <br></br>
              <p style={{ color: "#505a5f" }}>Section 1 of 5</p>
              <MainHeading
                style={{
                  color: "#0B0C0C",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Scheme Title
              </MainHeading>
              <p style={{ color: "#0B0C0C" }}>
                Please complete this section with the title of the scheme.
              </p>
              <InputField
                onChange={updateData}
                input={{
                  name: "scheme_title",
                  required: true,
                }}
              >
                Scheme Title
              </InputField>
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
          ) : (
            <form style={{ display: "inline-block" }}>
              <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                Publish Scheme
              </MainHeading>
              <Divider style={{ background: "black" }}></Divider>
              <br></br>
              <ErrorSummary
                description={
                  "The scheme title is empty. Please provide a scheme title and select continue"
                }
                errors={[
                  {
                    targetName: "description",
                    text: "Scheme title is empty",
                  },
                ]}
                heading={"Scheme title is empty"}
              />
              <p style={{ color: "#505a5f" }}>Section 1 of 5</p>
              <MainHeading
                style={{
                  color: "#0B0C0C",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Scheme Title
              </MainHeading>
              <p style={{ color: "#0B0C0C" }}>
                Please complete this section with the title of the scheme.
              </p>
              <InputField
                onChange={updateData}
                input={{
                  name: "scheme_title",
                  required: true,
                }}
              >
                Scheme Title
              </InputField>
              {errors.scheme_title && (
                <p style={{ color: "red" }}>
                  <small>Scheme title is required</small>
                </p>
              )}
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
          )}
        </div>
      </div>
    </div>
  );
};
