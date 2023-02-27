import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button, MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { BarLoader } from 'react-spinners';

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
  var company_name = sessionStorage.getItem("company-name");
  var company_address_1 = sessionStorage.getItem("company_address_line_1")
  var company_address_2 = sessionStorage.getItem("company_address_line_2")
  var company_postcode = sessionStorage.getItem("company_postal_code")
  var company_country = sessionStorage.getItem("company_country")
  var company_locality = sessionStorage.getItem("company_locality")
  var company_region = sessionStorage.getItem("company_region")


  function formatAddress(address) {
    if (!address || !address.address_line_1 || !address.address_line_2 || !address.postal_code || !address.locality || !address.region || !address.country) {
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
    navigate("/register-company-associated-contact")
  }

  const submitForm = async (information) => {
    sessionStorage.setItem("company-name", information["CompanyName"]);
    sessionStorage.setItem("company-registration-number", information["CompanyRegistrationNumber"]);
    var company_name = sessionStorage.getItem("company-name");
    var company_number = sessionStorage.getItem("company-registration-number")
    setLoading(true);
    fetch(`https://sssp-378808.nw.r.appspot.com/api/proxy?endpoint=company/${company_number}`)
      .then(response => response.json())
      .then(data => {
        var registered_company_name = data['company_name'];
        if (company_name === registered_company_name) {
          const formattedAddress = formatAddress(data['registered_office_address'])
          sessionStorage.setItem('company_address_line_1', formattedAddress.address_line_1);
          sessionStorage.setItem('company_address_line_2', formattedAddress.address_line_2);
          sessionStorage.setItem('company_postal_code', formattedAddress.postal_code);
          sessionStorage.setItem('company_region', formattedAddress.region);
          sessionStorage.setItem('company_country', formattedAddress.country); sessionStorage.setItem('company_locality', formattedAddress.locality);
          setDetailsReturned(true);
          setLoading(false);
        } else {
          setShow(true);
          setVariantType("danger");
          setUserResponse("We're sorry, the company name or registration number you entered does not match any record from companies house. Please double-check the information and try again.")
          setLoading(false);

        }
      })
      .catch(error => {
      });
  };

  return (
    <div className="container">
      {loading === true && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <BarLoader loading={loading} size={200} />
        </div>

      )}
      <div
        className="form"
        style={{ marginTop: "20px", display: "inline-block" }}
      >
        {show && (
          <div style={{marginTop: "30px"}}>
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
                Both fields must be an exact match to what is stored by companies house.
              </p>
            </div>
            <Form.Group>
              <Form.Label>Company name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                style={{ borderColor: "black", maxWidth: "500px" }}
                {...register("CompanyName", { required: true, maxLength: 120 })}
              />

              {errors.CompanyName && (
                <p style={{ color: "red" }}>
                  <small>Company Name is required</small>
                </p>
              )}

              {errors.CompanyName?.type === "maxLength" && (
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
                {...register("CompanyRegistrationNumber", {
                  required: true,
                  maxLength: 120,
                })}
              />

              {errors.CompanyRegistrationNumber && (
                <p style={{ color: "red" }}>
                  <small>Registration Number is required</small>
                </p>
              )}

              {errors.CompanyRegistrationNumber?.type === "maxLength" && (
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
                This is the correspondance address we will use for {company_name}
              </MainHeading>
              <p style={{ color: "#0B0C0C", fontSize: "12px" }}>
                Check this address before continuing.
              </p>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Address line 1:
                </Form.Label>
                <small>
                  {company_address_1}
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
                  {company_address_2}
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
                  {company_postcode}
                  <Link to="/change-last-name" style={{ float: "right" }}>Update</Link>

                </small>
                <Divider></Divider>
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Country:
                </Form.Label>
                <small>
                  {company_country}
                  <Link to="/change-last-name" style={{ float: "right" }}>Update</Link>

                </small>
                <Divider></Divider>
              </Form.Group>
              <br></br>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Locality:
                </Form.Label>
                <small>
                  {company_locality}
                  <Link to="/change-last-name" style={{ float: "right" }}>Update</Link>

                </small>
                <Divider></Divider>
              </Form.Group>
              <br></br>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                  Region:
                </Form.Label>
                <small>
                  {company_region}
                  <Link to="/change-last-name" style={{ float: "right" }}>Update</Link>

                </small>
                <Divider></Divider>
              </Form.Group>
              <br></br>
              <Form.Group>
                <Button
                  style={{ marginBottom: "15px" }}
                  onClick={handleClick}
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
