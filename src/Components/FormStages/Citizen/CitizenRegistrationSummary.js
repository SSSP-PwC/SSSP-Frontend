import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
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
  const { state } = useLocation();

  

  const [show, setShow] = useState(false);
  const [variantType, setVariantType] = useState("");
  const [userResponse, setUserResponse] = useState("");
  var first_name = state.first_name;
  var last_name = state.last_name;
  var address_line_1 = state.address_line_1;
  var address_line_2 = state.address_line_2;
  var town_city = state.town_city;
  var postcode = state.postcode;
  var email = state.email;
  var password = state.password

  const submitForm = async (data) => {

    const url = "https://20230226t215147-dot-sssp-378808.nw.r.appspot.com/api/signup";
    const d = { 
      first_name: first_name, 
      last_name: last_name, 
      email: email, 
      password: password, 
      address: { 
        address_line_1: address_line_1, 
        address_line_2: address_line_2, 
        town_city: town_city, 
        postcode: postcode }};
        
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(d),
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (result['message'] === "User created successfully") {
        setUserResponse('Account created successfully')
        setVariantType('success')
        setShow(true)
        navigate("/")
      }
      else if (result['message'] === "User already exists") {
        setUserResponse('Email address already exists. Please try again with a different email address')
        setVariantType('danger')
        setShow(true)
      }
    } catch (error) {
      console.error(error);
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
                  <Link to="/change-last-name" style={{ float: "right" }}>
                    Change
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Address line 1:
                </Form.Label>
                <small>
                  {address_line_1}
                  <Link to="/change-address-line-1" style={{ float: "right" }}>
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
                  <Link to="/change-town-city" style={{ float: "right" }}>
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
                  <Link to="/change-postcode" style={{ float: "right" }}>
                    Change
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Email Address:
                </Form.Label>
                <small>
                  {email}
                  <Link to="/change-email-address" style={{ float: "right" }}>
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
                  Submit
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
                  <Link to="/change-first-name" style={{ float: "right" }}>
                    Change
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Last name:
                </Form.Label>
                <small>
                  {last_name}
                  <Link to="/change-last-name" style={{ float: "right" }}>
                    Change
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Address line 1:
                </Form.Label>
                <small>
                  {address_line_1}
                  <Link to="/change-address-line-1" style={{ float: "right" }}>
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
                  <Link to="/change-address-line-2" style={{ float: "right" }}>
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
                  <Link to="/change-town-city" style={{ float: "right" }}>
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
                  <Link to="/change-postcode" style={{ float: "right" }}>
                    Change
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Email Address:
                </Form.Label>
                <small>
                  {email}
                  <Link to="/change-email-address" style={{ float: "right" }}>
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
                  Submit
                </Button>
              </Form.Group>
              <br></br>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}