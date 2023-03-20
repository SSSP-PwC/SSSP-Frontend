import React, { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Radio } from "govuk-react";
import Cookies from "universal-cookie";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export const AssociateContact = () => {
  const {
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("HERE");
  console.log(state.company_registration_number);
  const cookies = new Cookies();
  const [show, setShow] = useState(false);
  const [variantType, setVariantType] = useState("");
  const [userResponse, setUserResponse] = useState("");

  const submitForm = async () => {
    navigate("/register-company-link-citizen", {
      state: {
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
          company_creation_journey: true,
        },
      },
    });
  };

  const selectedRadioButtonTwo = () => {
    navigate("/register-citizen-landing", {
      state: {
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
          company_creation_journey: true,
        },
      },
    });
  };
  const RegistrationFormBreadcrumb = () => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/register-company-landing">
          Register Company
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/register-company-details">
          Company details
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Contact association</Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  return (
    <div className="container">
      <div
        className="form"
        style={{ marginTop: "20px", display: "inline-block" }}
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
          <div>
            <RegistrationFormBreadcrumb />
            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              Contact Person Details
            </MainHeading>

            <p style={{ color: "#0B0C0C" }}>
              Is this contact person already registered as a citizen?
            </p>

            <Form.Group>
              <Form>
                <>
                  <Radio name="group1" onClick={submitForm}>
                    Yes
                  </Radio>
                  <Radio name="group1" onClick={selectedRadioButtonTwo}>
                    No
                  </Radio>
                </>
              </Form>
            </Form.Group>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
};
