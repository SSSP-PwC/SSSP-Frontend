import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { Button, LoadingBox } from "govuk-react";
import { CompanyRegisteredSuccessMessage } from "./Company-Registered-Success-Message";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export const RegisterCompanySummary = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const [variantType, setVariantType] = useState("");
  const [userResponse, setUserResponse] = useState("");
  console.log(state)
  const updateData = (e) => {
    setEmailAddress({
      ...emailAddress,
      [e.target.name]: e.target.value,
    });
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };
  
  const submit = async () => {
    setLoading(true);
    const url = "http://127.0.0.1:1000/api/create-company";
    const data = {
      company: {
        company_name: state.company_name,
        company_registration_number: state.company_registration_number,
        company_address: {
          address_line_1: state.company_address.address_line_1,
          address_line_2: state.company_address.address_line_2,
          postal_code: state.company_address.postal_code,
          country: state.company_address.country,
          locality: state.company_address.locality,
          region: state.company_address.region,
        },
      },
      contact_person: state.contact_person.citizen,
    };

    console.log(state);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result["message"]);
      if (result["message"] === "Company created successfully") {
        setLoading(false);
        setSuccessMessage(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const RegistrationFormBreadcrumb = () => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/register-company-landing">Register Company</Breadcrumb.Item>
        <Breadcrumb.Item href="/register-company-details">Company details</Breadcrumb.Item>
        <Breadcrumb.Item href="/register-company-associated-contact">Contact association</Breadcrumb.Item>
        <Breadcrumb.Item href="/register-company-associated-contact">Summary</Breadcrumb.Item>

      </Breadcrumb>
    );
  };
  return (
    <div className="container">
      <div
        className="form"
        style={{ marginTop: "20px", display: "inline-block" }}
      >
        {successMessage === false && (
          <form style={{ display: "inline-block" }}>
            <RegistrationFormBreadcrumb/>
            <LoadingBox loading={loading}>
              <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                Link an existing citizen account to{" "}
                {sessionStorage.getItem("company-name")} account
              </MainHeading>
              <Divider style={{ background: "black" }}></Divider>
              <br></br>
              <p style={{ color: "#505a5f" }}>Section 2 of 5</p>
              <h6 style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                Summary table
              </h6>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Company name:
                </Form.Label>
                <small>
                  {state.company_name}
                  <Link to="/change-first-name" style={{ float: "right" }}>
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
                  {state.company_registration_number}
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
                  {state.company_address.address_line_1}
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
                  {state.company_address.address_line_2}
                  <Link to="/change-address-line-2" style={{ float: "right" }}>
                    Change
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Country:
                </Form.Label>
                <small>
                  {state.company_address.country}
                  <Link to="/change-town-city" style={{ float: "right" }}>
                    Change
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Locality:
                </Form.Label>
                <small>
                  {state.company_address.locality}

                  <Link to="/change-postcode" style={{ float: "right" }}>
                    Change
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Postal code
                </Form.Label>
                <small>
                  {state.company_address.postal_code}
                  <Link to="/change-email-address" style={{ float: "right" }}>
                    Change
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>{" "}
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Region
                </Form.Label>
                <small>
                  {state.company_address.region}
                  <Link to="/change-email-address" style={{ float: "right" }}>
                    Change
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>{" "}
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Linked Contact First Name:
                </Form.Label>
                <small>
                  {state.contact_person.citizen.first_name}
                  <Link to="/change-email-address" style={{ float: "right" }}>
                    Change
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>{" "}
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Linked Contact Last Name:
                </Form.Label>
                <small>
                  {state.contact_person.citizen.last_name}
                  <Link to="/change-email-address" style={{ float: "right" }}>
                    Change
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>{" "}
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Linked Contact Email:
                </Form.Label>
                <small>
                  {state.contact_person.citizen.email}
                  <Link to="/change-email-address" style={{ float: "right" }}>
                    Change
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>{" "}
              <br></br>
              <Button onClick={handleSubmit(submit)}>Continue</Button>
              <br></br>
            </LoadingBox>
          </form>
        )}
        {successMessage === true && (
          <div>
            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              Company Registration
            </MainHeading>
            <Divider style={{ background: "black" }}></Divider>
            <br></br>
            <CompanyRegisteredSuccessMessage />
            <br></br>
            <br></br>
            <Link to="/">
              <Button>Go home</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
