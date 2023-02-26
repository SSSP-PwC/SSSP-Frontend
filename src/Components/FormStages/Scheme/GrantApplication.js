import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button, Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
export const GrantApplication = () => {
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
  const [radioButtonOne, setRadioButtonOne] = useState(false);
  const [radioButtonTwo, setRadioButtonTwo] = useState(false);
  const [radioButtonThree, setRadioButtonThree] = useState(false);
  const [postalAddress, setPostalAddress] = useState("");
  const [legalOwner, setLegalOwner] = useState("");
  const [documentation, setDocumentation] = useState(undefined);
  const [fundsExhaustedFlag, setFundsExhausted] = useState("");
  const [renderStageTwo, setRenderStageTwo] = useState(false);
  const [renderStageThree, setRenderStageThree] = useState(false);

  const handleRadioButtonOne = () => {
    setRadioButtonOne(true);
    setRadioButtonTwo(false);
    setRadioButtonThree(false);
  };
  const handleRadioButtonTwo = () => {
    setRadioButtonOne(false);
    setRadioButtonTwo(true);
    setRadioButtonThree(false);
  };
  const handleRadioButtonThree = () => {
    setRadioButtonOne(false);
    setRadioButtonTwo(false);
    setRadioButtonThree(true);
  };

  const handleStageOne = (data) => {
    setPostalAddress(data.postal_address);
    setLegalOwner(data.legal_owner);
    setDocumentation(data.supporting_documentation);
    setRenderStageTwo(true);
  };
  const handleStageTwo = () => {
    if (radioButtonOne === true) {
      setFundsExhausted("Yes");
    } else if (radioButtonTwo === true) {
      setFundsExhausted("No");
    } else if (radioButtonThree === true) {
      setFundsExhausted("Not applicable");
    } else {
      setFundsExhausted("Not specified");
    }
    setRenderStageThree(true);
  };
  const submit = async () => {
    const url = "http://127.0.0.1:9000/api/application-form";
    const data = {
      building_postal_address: postalAddress,
      legal_owner: legalOwner,
      supporting_documentation: documentation,
      funds_exhausted_flag: fundsExhaustedFlag,
    };
    console.log(data);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    
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
            {renderStageTwo === false && renderStageThree === false && (
              <div>
                <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                  Application Form
                </MainHeading>
                <Divider style={{ background: "black" }}></Divider>
                <br></br>
                <p style={{ color: "#505a5f" }}>Section 1 of 3</p>
                <MainHeading
                  style={{
                    color: "#0B0C0C",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  1. Building Information
                </MainHeading>
                <p style={{ color: "#505a5f" }}>
                  Please include the postal address of the building
                </p>

                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Enter building postal address"
                    style={{ borderColor: "black", maxWidth: "500px" }}
                    {...register("postal_address", {
                      required: true,
                      maxLength: 80,
                    })}
                  />

                  {errors.postal_address && (
                    <p style={{ color: "red" }}>
                      <small>Building postal address is required</small>
                    </p>
                  )}

                  {errors.postal_address?.type === "maxLength" && (
                    <p style={{ color: "red" }}>
                      <small>Max characters should be 80</small>
                    </p>
                  )}
                </Form.Group>
                <br></br>
                <p style={{ color: "#505a5f" }}>
                  Please include the legal owner of the building. This might be
                  a person or a company.
                </p>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Enter the legal owner of the building"
                    style={{ borderColor: "black", maxWidth: "500px" }}
                    {...register("legal_owner", {
                      required: true,
                      maxLength: 80,
                    })}
                  />

                  {errors.legal_owner && (
                    <p style={{ color: "red" }}>
                      <small>Legal building owner is required</small>
                    </p>
                  )}

                  {errors.legal_owner?.type === "maxLength" && (
                    <p style={{ color: "red" }}>
                      <small>Max characters should be 80</small>
                    </p>
                  )}
                </Form.Group>
                <MainHeading
                  style={{
                    color: "#0B0C0C",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  2. Building Information, upload documentation
                </MainHeading>
                <p style={{ color: "#505a5f" }}>
                  Please upload any supporting documentation such as a title
                  deed.
                </p>
                <Form.Group>
                  <Form.Control
                    type="file"
                    style={{ borderStyle: "none", maxWidth: "500px" }}
                    {...register("supporting_documentation", {
                      required: false,
                    })}
                  />
                </Form.Group>
                <br></br>
                <Form.Group>
                  <Button
                    style={{
                      marginBottom: "15px",
                      backgroundColor: "#b1b4b6",
                      color: "black",
                      margin: "20px",
                    }}
                    onClick={handleSubmit(handleStageOne)}
                  >
                    Save as Draft
                  </Button>
                  <Button
                    style={{ marginBottom: "15px" }}
                    onClick={handleSubmit(handleStageOne)}
                  >
                    Continue
                  </Button>
                </Form.Group>
                <br></br>
              </div>
            )}
            {renderStageTwo === true && renderStageThree === false && (
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
                  <Form.Label style={{ fontSize: "20px" }}>
                    <input
                      type="radio"
                      checked={radioButtonOne}
                      {...register("radio_button_one", {
                        required: false,
                      })}
                      onClick={handleRadioButtonOne}
                      style={{
                        height: "30px",
                        width: "30px",
                        verticalAlign: "middle",
                        accentColor: "black",
                      }}
                    />{" "}
                    Yes
                  </Form.Label>
                </Form.Group>

                <Form.Group>
                  <Form.Label style={{ fontSize: "20px" }}>
                    <input
                      type="radio"
                      checked={radioButtonTwo}
                      {...register("radio_button_two", {
                        required: false,
                      })}
                      onClick={handleRadioButtonTwo}
                      style={{
                        height: "30px",
                        width: "30px",
                        verticalAlign: "middle",
                        accentColor: "black",
                      }}
                    />{" "}
                    No
                  </Form.Label>
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ fontSize: "20px" }}>
                    <input
                      type="radio"
                      checked={radioButtonThree}
                      {...register("radio_button_three", {
                        required: false,
                      })}
                      onClick={handleRadioButtonThree}
                      style={{
                        height: "30px",
                        width: "30px",
                        verticalAlign: "middle",
                        accentColor: "black",
                      }}
                    />{" "}
                    Not applicable
                  </Form.Label>
                </Form.Group>
                <Form.Group>
                  <Button
                    style={{
                      marginBottom: "15px",
                      backgroundColor: "#b1b4b6",
                      color: "black",
                      margin: "20px",
                    }}
                    onClick={handleSubmit(handleStageTwo)}
                  >
                    Save as Draft
                  </Button>
                  <Button
                    style={{ marginBottom: "15px" }}
                    onClick={handleSubmit(handleStageTwo)}
                  >
                    Continue
                  </Button>
                </Form.Group>
                <br></br>
              </div>
            )}
            {renderStageTwo === true && renderStageThree === true && (
              <div style={{ display: "inline-block" }}>
                <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                  Application Form Summary
                </MainHeading>
                <Divider></Divider>
                <br></br>
                <p style={{ color: "#505a5f" }}>
                  Profile Creation: Section 5 of 5
                </p>
                <h6 style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                  Summary table
                </h6>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                    1. Building postal address:
                  </Form.Label>
                  <small>
                    {postalAddress}
                    <Link style={{ float: "right" }}>Change</Link>
                  </small>
                  <Divider></Divider>
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                    1. Building legal owner:
                  </Form.Label>
                  <small>
                    {legalOwner}
                    <Link style={{ float: "right" }}>Change</Link>
                  </small>
                  <Divider></Divider>
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                    2. Building Information, upload documentation:
                  </Form.Label>
                  <small>
                    {documentation.name}
                    <Link to="/change-last-name" style={{ float: "right" }}>
                      Change
                    </Link>
                  </small>
                  <Divider></Divider>
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                    3. Have other routes of funding been exhausted?
                  </Form.Label>
                  <small>
                    {fundsExhaustedFlag}
                    <Link
                      to="/change-address-line-1"
                      style={{ float: "right" }}
                    >
                      Change
                    </Link>
                  </small>
                  <Divider></Divider>
                </Form.Group>

                <br></br>
                <Form.Group>
                  <Button
                    style={{ marginBottom: "15px" }}
                    onClick={handleSubmit(submit)}
                  >
                    Submit
                  </Button>
                </Form.Group>
                <br></br>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
