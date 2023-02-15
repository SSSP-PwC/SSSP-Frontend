import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button, Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const EnterCompanyAddress = () => {
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

  const submitForm = (data) => {
    //Replace with API callout to Companies House
    if (data.CompanyAddressLine1 !== undefined && data.CompanyTownCity !== undefined && data.CompanyPostcode !== undefined) {
      console.log(data);
      setUserResponse(data.message);
      sessionStorage.setItem("address-line-1", data["CompanyAddressLine1"]);
      sessionStorage.setItem("address-line-2", data["CompanyAddressLine2"]);
      sessionStorage.setItem("town-city", data["CompanyTownCity"]);
      sessionStorage.setItem("postcode", data["CompanyPostcode"]);
      setShow(true);
      navigate("/company-registration-number");
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
              Enter your company address
            </MainHeading>
            <Form.Group>
              <Form.Label>Address Line 1</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address line 1"
                style={{ borderColor: "black", maxWidth: "500px" }}
                {...register("CompanyAddressLine1", {
                  required: true,
                  maxLength: 80,
                })}
              />

              {errors.CompanyAddressLine1 && (
                <p style={{ color: "red" }}>
                  <small>Address Line 1 is required</small>
                </p>
              )}

              {errors.CompanyAddressLine1?.type === "maxLength" && (
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
                {...register("CompanyAddressLine2", {
                  required: false,
                  maxLength: 80,
                })}
              />
              {errors.CompanyAddressLine2?.type === "maxLength" && (
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
                {...register("CompanyTownCity", {
                  required: true,
                  maxLength: 80,
                })}
              />
                   {errors.CompanyTownCity && (
                <p style={{ color: "red" }}>
                  <small>Town/City is required</small>
                </p>
              )}
              {errors.CompanyTownCity?.type === "maxLength" && (
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
                {...register("CompanyPostcode", {
                  required: true,
                  maxLength: 8,
                })}
              />
                       {errors.CompanyPostcode && (
                <p style={{ color: "red" }}>
                  <small>Postcode is required</small>
                </p>
              )}
              {errors.CompanyPostcode?.type === "maxLength" && (
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
