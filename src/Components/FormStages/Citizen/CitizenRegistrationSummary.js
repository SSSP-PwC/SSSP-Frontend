import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button, Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

export const CitizenRegistrationSummary = () => {
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
  var first_name = sessionStorage.getItem("citizen-first-name");
  var last_name = sessionStorage.getItem("citizen-last-name");
  var address_line_1 = sessionStorage.getItem("address-line-1");
  var address_line_2 = sessionStorage.getItem("address-line-2");
  var town_city = sessionStorage.getItem("town-city");
  var postcode = sessionStorage.getItem("postcode");

  var email = sessionStorage.getItem("citizen-email");

  const submitForm = (data) => {
    //Replace with API callout to Companies House
    if (
      data.CompanyAddressLine1 !== undefined &&
      data.CompanyTownCity !== undefined &&
      data.CompanyPostcode !== undefined
    ) {
      console.log(data);
      setUserResponse(data.message);

      setShow(true);
      navigate("/register-citizen-email");
    } else {
    }
  };
  const resetFirstNameStorage = () => {
    sessionStorage.removeItem("citizen-first-name");
  };
  const resetLastNameStorage = () => {
    sessionStorage.removeItem("citizen-last-name");
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
        <div style={{ display: "inline-block" }}>
          {address_line_2.length === 0 ? (
            <form style={{ display: "inline-block" }}>
              <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                Citizen Registration Form
              </MainHeading>
              <p style={{ color: "#505a5f" }}>
                Profile Creation: Section 5 of 5
              </p>
              <h6 style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                Summary table
              </h6>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  First name:
                </Form.Label>
                <small>
                  {first_name} 
                  <Link style={{ float: "right" }}>Change</Link>
                </small>
                <Divider></Divider>
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Last name:
                </Form.Label>
                <small>
                  {last_name}
                  <Link to ="/change-last-name" style={{ float: "right" }}>Change</Link>
                </small>
                <Divider></Divider>
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Address line 1:
                </Form.Label>
                <small>
                  {address_line_1}
                  <Link
                    to="/register-citizen-name"
                    style={{ float: "right" }}
                    onClick={resetFirstNameStorage}
                  >
                    Change
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Town/City:
                </Form.Label>
                <small>
                  {town_city}
                  <Link
                    to="/register-citizen-name"
                    style={{ float: "right" }}
                    onClick={resetFirstNameStorage}
                  >
                    Change
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Postcode:
                </Form.Label>
                <small>
                  {postcode}
                  <Link
                    to="/register-citizen-name"
                    style={{ float: "right" }}
                    onClick={resetFirstNameStorage}
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
                  onClick={handleSubmit(submitForm)}
                >
                  Continue
                </Button>
              </Form.Group>
              <br></br>
            </form>
          ) : (

            <form style={{ display: "inline-block" }}>
            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              Citizen Registration Form
            </MainHeading>
            <p style={{ color: "#505a5f" }}>
              Profile Creation: Section 5 of 5
            </p>
            <h6 style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              Summary table
            </h6>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                First name:
              </Form.Label>
              <small>
                {first_name} 
                <Link to = "/change-first-name" style={{ float: "right" }}>Change</Link>
              </small>
              <Divider></Divider>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                Last name:
              </Form.Label>
              <small>
                {last_name}
                <Link to ="/change-last-name" style={{ float: "right" }}>Change</Link>
              </small>
              <Divider></Divider>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                Address line 1:
              </Form.Label>
              <small>
                {address_line_1}
                <Link
                  to="/register-citizen-name"
                  style={{ float: "right" }}
                  onClick={resetFirstNameStorage}
                >
                  Change
                </Link>
              </small>
              <Divider></Divider>
            </Form.Group>
            <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Address line 2:
                </Form.Label>
                <small>
                  {address_line_2}
                  <Link
                    to="/register-citizen-name"
                    style={{ float: "right" }}
                    onClick={resetFirstNameStorage}
                  >
                    Change
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                Town/City:
              </Form.Label>
              <small>
                {town_city}
                <Link
                  to="/register-citizen-name"
                  style={{ float: "right" }}
                  onClick={resetFirstNameStorage}
                >
                  Change
                </Link>
              </small>
              <Divider></Divider>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                Postcode:
              </Form.Label>
              <small>
                {postcode}
                <Link
                  to="/register-citizen-name"
                  style={{ float: "right" }}
                  onClick={resetFirstNameStorage}
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
                onClick={handleSubmit(submitForm)}
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
