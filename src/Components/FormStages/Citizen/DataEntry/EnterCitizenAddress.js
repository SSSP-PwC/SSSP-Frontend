import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Button, MainHeading } from "../../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const EnterCitizenAddress = () => {
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
  const { state } = useLocation();
  const submitForm = (data) => {
    //Replace with API callout to Companies House
    if (
      data.CitizenAddressLine1 !== undefined &&
      data.CitizenTownCity !== undefined &&
      data.CitizenPostcode !== undefined
    ) {
      setUserResponse(data.message);
      setShow(true);
      navigate("/register-citizen-email", {
        state: {
          first_name: state.first_name,
          last_name: state.last_name,
          address_line_1: data["CitizenAddressLine1"],
          address_line_2: data["CitizenAddressLine2"],
          town_city: data["CitizenTownCity"],
          postcode: data["CitizenPostcode"],
        },
      });
    } else {
    }
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

            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              Enter your company name
            </MainHeading>
            <p style={{ color: "#0B0C0C" }}>
              We will use this information to cross-reference against companies
              house database
            </p>
          </>
        ) : (
          <div></div>
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
            <Form.Group>
              <Form.Label>Address Line 1</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address line 1"
                style={{ borderColor: "black", maxWidth: "500px" }}
                {...register("CitizenAddressLine1", {
                  required: true,
                  maxLength: 80,
                })}
              />

              {errors.CitizenAddressLine1 && (
                <p style={{ color: "red" }}>
                  <small>Address Line 1 is required</small>
                </p>
              )}

              {errors.CitizenAddressLine1?.type === "maxLength" && (
                <p style={{ color: "red" }}>
                  <small>Max characters should be 80</small>
                </p>
              )}
            </Form.Group>
            <br></br>

            <Form.Group>
              <Form.Label>Address Line 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address line 2"
                style={{ borderColor: "black", maxWidth: "500px" }}
                {...register("CitizenAddressLine2", {
                  required: false,
                  maxLength: 80,
                })}
              />
              {errors.CitizenAddressLine2?.type === "maxLength" && (
                <p style={{ color: "red" }}>
                  <small>Max characters should be 80</small>
                </p>
              )}
            </Form.Group>
            <br></br>
            <Form.Group>
              <Form.Label>Town/City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter town/city"
                style={{ borderColor: "black", maxWidth: "500px" }}
                {...register("CitizenTownCity", {
                  required: true,
                  maxLength: 80,
                })}
              />
              {errors.CitizenTownCity && (
                <p style={{ color: "red" }}>
                  <small>Town/City is required</small>
                </p>
              )}
              {errors.CitizenTownCity?.type === "maxLength" && (
                <p style={{ color: "red" }}>
                  <small>Max characters should be 80</small>
                </p>
              )}
            </Form.Group>
            <br></br>
            <Form.Group>
              <Form.Label>Postcode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postcode"
                style={{ borderColor: "black", maxWidth: "500px" }}
                {...register("CitizenPostcode", {
                  required: true,
                  maxLength: 8,
                })}
              />
              {errors.CitizenPostcode && (
                <p style={{ color: "red" }}>
                  <small>Postcode is required</small>
                </p>
              )}
              {errors.CitizenPostcode?.type === "maxLength" && (
                <p style={{ color: "red" }}>
                  <small>Max characters should be 8</small>
                </p>
              )}
            </Form.Group>
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
