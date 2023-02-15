import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button, Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

export const CompanyRegistrationSummary = () => {
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
  var company_name = sessionStorage.getItem("company-name")
  var company_address_1 = sessionStorage.getItem("company-address-line-1")
  var company_address_2 = sessionStorage.getItem("company-address-line-2")
  var company_town_city = sessionStorage.getItem("company-town-city")
  var company_postcode = sessionStorage.getItem("company-postcode")
  var company_registration_number = sessionStorage.getItem("company-registration-number")




  const submitForm = (data) => {
    //Replace with API callout to Companies House
    navigate("/");
   sessionStorage.clear();
    
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
          {company_address_2.length === 0 ? (
            <form style={{ display: "inline-block" }}>
              <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                Company Registration Form
              </MainHeading>
              <Divider></Divider>
              <br></br>
              <p style={{ color: "#505a5f" }}>
                Profile Creation: Section 4 of 4
              </p>
              <h6 style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                Summary table
              </h6>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Company name:
                </Form.Label>
                <small>
                  {company_name}
                  <Link style={{ float: "right" }}>Change</Link>
                </small>
                <Divider></Divider>
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Address line 1:
                </Form.Label>
                <small>
                  {company_address_1}
                  <Link to="/change-last-name" style={{ float: "right" }}>
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
                  {company_town_city}
                  <Link
                    to="/change-town-city"
                    style={{ float: "right" }}
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
                  {company_postcode}
                  <Link
                    to="/change-postcode"
                    style={{ float: "right" }}
                  >
                    Change
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Company registration number:
                </Form.Label>
                <small>
                  {company_registration_number}
                  <Link to="/change-last-name" style={{ float: "right" }}>
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
                Company Registration Form
              </MainHeading>
              <p style={{ color: "#505a5f" }}>
                Profile Creation: Section 4 of 4
              </p>
              <h6 style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                Summary table
              </h6>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Company name:
                </Form.Label>
                <small>
                  {company_name}
                  <Link to="/change-first-name" style={{ float: "right" }}>
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
                  {company_address_1}
                  <Link to="/change-last-name" style={{ float: "right" }}>
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
                  {company_address_2}
                  <Link
                    to="/change-address-line-1"
                    style={{ float: "right" }}
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
                  {company_town_city}
                  <Link
                    to="/change-town-city"
                    style={{ float: "right" }}
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
                  {company_postcode}
                  <Link
                    to="/change-postcode"
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
};
