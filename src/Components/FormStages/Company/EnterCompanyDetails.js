import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { LoadingBox, Button, InputField, ErrorSummary } from "govuk-react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export const EnterCompanyDetails = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [errorMessageFlag, setErrorMessageFlag] = useState(false);
  const [detailsReturned, setDetailsReturned] = useState(false);

  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [locality, setLocality] = useState("");
  const [region, setRegion] = useState("");

  function formatAddress(address) {
    if (
      !address ||
      !address.address_line_1 ||
      !address.address_line_2 ||
      !address.postal_code ||
      !address.locality ||
      !address.region ||
      !address.country
    ) {
      address.address_line_1 = address.address_line_1 || "N/A";
      address.address_line_2 = address.address_line_2 || "N/A";
      address.postal_code = address.postal_code || "N/A";
      address.locality = address.locality || "N/A";
      address.region = address.region || "N/A";
      address.country = address.country || "N/A";
    }
    return address;
  }
  const handleClick = () => {
    navigate("/register-company-associated-contact", {
      state: {
        company_name: companyName,
        company_number: companyData.company_registration_number,
        address_line_1: addressLine1,
        address_line_2: addressLine2,
        postal_code: postalCode,
        country: country,
        locality: locality,
        region: region,
      },
    });
  };
  const updateData = (e) => {
    setCompanyData({
      ...companyData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async () => {
    setLoading(true);
    fetch(
      `https://20230227t090520-dot-sssp-378808.nw.r.appspot.com/api/proxy?endpoint=company/${companyData.company_registration_number}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const formattedAddress = formatAddress(
          data["registered_office_address"]
        );
        setCompanyName(data.company_name)
        setAddressLine1(formattedAddress.address_line_1);
        setAddressLine2(formattedAddress.address_line_2);
        setPostalCode(formattedAddress.postal_code);
        setCountry(formattedAddress.country);
        setLocality(formattedAddress.locality);
        setRegion(formattedAddress.region);
        setDetailsReturned(true);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessageFlag(true);
        setLoading(false);
      });
  };

  const RegistrationFormBreadcrumb = () => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/register-company-landing">Register Company</Breadcrumb.Item>
        <Breadcrumb.Item active>Company details</Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  return (
    <div className="container">
      <div
        className="form"
        style={{ marginTop: "20px", display: "inline-block" }}
      >
        {detailsReturned === false && errorMessageFlag === true && (
          <ErrorSummary
            description={
              "Please check that you have the correct company number."
            }
            errors={[
              {
                targetName: "description",
                text: "Company profile not found",
              },
            ]}
            heading={"Could not find company profile"}
          />
        )}
        {detailsReturned === false && (
          <div style={{ display: "inline-block" }}>
            <LoadingBox loading={loading}>
              <RegistrationFormBreadcrumb/>
              <div>
                <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                  Enter your company details
                </MainHeading>
                <p style={{ color: "#505a5f" }}>
                  Profile Creation: Section 1 of 4
                </p>
                <p style={{ color: "#0B0C0C", fontSize: "12px" }}>
                  We will use this information to cross-reference against
                  companies house database.
                </p>
                <p style={{ color: "#0B0C0C", fontSize: "12px" }}>
                  Company number must be an exact match to companies house
                  records.
                </p>
              </div>
              <InputField
                onChange={updateData}
                input={{
                  name: "company_registration_number",
                  required: true,
                }}
              >
                Company registration number
              </InputField>
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
            </LoadingBox>
          </div>
        )}

        {detailsReturned === true && (
          <div style={{ display: "inline-block" }}>
            <form style={{ display: "inline-block" }}>
              <RegistrationFormBreadcrumb/>
              <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                This is the correspondance address we will use 
       
              </MainHeading>
              <p style={{ color: "#0B0C0C", fontSize: "12px" }}>
                Check this address before continuing.
              </p>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Address line 1:
                </Form.Label>
                <small>
                  {addressLine1}
                  <Link to="/change-last-name" style={{ float: "right" }}>
                    Update
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Address line 2:
                </Form.Label>
                <small>
                  {addressLine2}
                  <Link to="/change-last-name" style={{ float: "right" }}>
                    Update
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>

              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Postcode:
                </Form.Label>
                <small>
                  {postalCode}
                  <Link to="/change-last-name" style={{ float: "right" }}>
                    Update
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Country:
                </Form.Label>
                <small>
                  {country}
                  <Link to="/change-last-name" style={{ float: "right" }}>
                    Update
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>
              <br></br>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Locality:
                </Form.Label>
                <small>
                  {locality}
                  <Link to="/change-last-name" style={{ float: "right" }}>
                    Update
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>
              <br></br>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Region:
                </Form.Label>
                <small>
                  {region}
                  <Link to="/change-last-name" style={{ float: "right" }}>
                    Update
                  </Link>
                </small>
                <Divider></Divider>
              </Form.Group>
              <br></br>
              <Form.Group>
                <Button
                  style={{ marginBottom: "15px" }}
                  onClick={handleSubmit(handleClick)}
                >
                  Continue
                </Button>
              </Form.Group>
              <br></br>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
