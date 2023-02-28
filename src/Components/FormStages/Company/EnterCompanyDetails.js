import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button, MainHeading } from "../../../globalStyles";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { Spinner } from "govuk-react";

export const EnterCompanyDetails = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [detailsReturned, setDetailsReturned] = useState(false);
  const [variantType, setVariantType] = useState("");
  const [userResponse, setUserResponse] = useState("");
  const [loading, setLoading] = useState(false);
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
  const handleClick = (data) => {
    navigate("/register-company-associated-contact", {
      state: {
        company_name: data.company_name,
        company_registration_number: data.company_registration_number,
        company_address_line_1: addressLine1,
        company_address_line_2: addressLine2,
        postal_code: postalCode,
        country: country,
        locality: locality,
        region: region
      },
    });
  };

  const submitForm = async (information) => {
    setCompanyName(information.company_name);

    fetch(
      `https://20230227t090520-dot-sssp-378808.nw.r.appspot.com/api/proxy?endpoint=company/${information.company_registration_number}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        console.log(data);
        console.log(data["company_name"]);

        var registered_company_name = data["company_name"];

        if (information.company_name === registered_company_name) {
          const formattedAddress = formatAddress(
            data["registered_office_address"]
          );
          setAddressLine1(formattedAddress.address_line_1);
          setAddressLine2(formattedAddress.address_line_2);
          setPostalCode(formattedAddress.postal_code);
          setCountry(formattedAddress.country);
          setLocality(formattedAddress.locality);
          setRegion(formattedAddress.region);
          setDetailsReturned(true);
          setLoading(false);
        } else {
          ///CHANGE THIS TO COMPANIES HOUSE ERROR MESSAGE
          setShow(true);
          setVariantType("danger");
          setUserResponse(
            "We're sorry, the company name or registration number you entered does not match any record from companies house. Please double-check the information and try again."
          );
          setLoading(false);
        }
      })
      .catch((error) => {});
  };

  return (
    <div className="container">
      {loading === true && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spinner fill="black" height="256px" title="Spinner" width="256px" />{" "}
        </div>
      )}
      <div
        className="form"
        style={{ marginTop: "20px", display: "inline-block" }}
      >
        {show && (
          <div style={{ marginTop: "30px" }}>
            <Alert
              variant={variantType}
              onClose={() => {
                setShow(false);
              }}
              dismissible
            >
              <p>{userResponse}</p>
            </Alert>
          </div>
        )}

        {detailsReturned === false && loading === false && (
          <div style={{ display: "inline-block" }}>
            <div>
              <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                Enter your company name and registration number
              </MainHeading>
              <p style={{ color: "#505a5f" }}>
                Profile Creation: Section 1 of 4
              </p>
              <p style={{ color: "#0B0C0C", fontSize: "12px" }}>
                We will use this information to cross-reference against
                companies house database.
              </p>
              <p style={{ color: "#0B0C0C", fontSize: "12px" }}>
                Both fields must be an exact match to what is stored by
                companies house.
              </p>
            </div>
            <Form.Group>
              <Form.Label>Company name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                style={{ borderColor: "black", maxWidth: "500px" }}
                {...register("company_name", {
                  required: true,
                  maxLength: 120,
                })}
              />

              {errors.company_name && (
                <p style={{ color: "red" }}>
                  <small>Company Name is required</small>
                </p>
              )}

              {errors.company_name?.type === "maxLength" && (
                <p style={{ color: "red" }}>
                  <small>Max characters should be 120</small>
                </p>
              )}
            </Form.Group>
            <br></br>
            <Form.Group>
              <Form.Label>Registration number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter registration number"
                style={{ borderColor: "black", maxWidth: "500px" }}
                {...register("company_registration_number", {
                  required: true,
                  maxLength: 120,
                })}
              />

              {errors.company_registration_number && (
                <p style={{ color: "red" }}>
                  <small>Registration Number is required</small>
                </p>
              )}

              {errors.company_registration_number?.type === "maxLength" && (
                <p style={{ color: "red" }}>
                  <small>Max characters should be 120</small>
                </p>
              )}
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
          </div>
        )}

        {detailsReturned === true && (
          <div style={{ display: "inline-block" }}>
            <form style={{ display: "inline-block" }}>
              <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                This is the correspondance address we will use for {companyName}
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
