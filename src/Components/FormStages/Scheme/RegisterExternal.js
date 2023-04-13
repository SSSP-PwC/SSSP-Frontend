import React, { useState } from "react";
import { MainHeading } from "../../../globalStyles";
import { Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "govuk-react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {
  Checkbox,
  Heading,
  InputField,
  Select,
  TextArea,
  FileUpload,
  Label,
  TopNav,
  Footer,
  MultiChoice,
  Radio,
  Link,
} from "govuk-react";

export const RegisterExternalService = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState("");

  const handleCompanySelect = (event) => {
    setSelectedCompany(event.target.value);
  };
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleImageUpload = () => {
    console.log(image);
  };
  const { state } = useLocation();
  console.log(state);
  const handleNextPage = () => {
    navigate("/register-company-details", {
      state: {
        portal_creation_flag: state?.portal_creation_flag,
      },
    });
  };
  const RegistrationFormBreadcrumb = () => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Register External Service</Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  return (
    <div className="container">
      <div
        className="form"
        style={{ marginTop: "70px", display: "inline-block" }}
      >
        <RegistrationFormBreadcrumb />
        <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
          Register your Service
        </MainHeading>
        <Divider></Divider>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <label style={{ fontWeight: "bold" }}>Service Name:</label>
          <input
            type="text"
            style={{ position: "absolute", left: "20%" }}
            placeholder="Enter service name"
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
          <label style={{ fontWeight: "bold" }}>Service Icon:</label>
          <input
            type="file"
            style={{ position: "absolute", left: "20%" }}
            onChange={handleImageChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <label style={{ fontWeight: "bold" }}>Purpose:</label>
          <textarea
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              height: isFocused ? "200px" : "50px",
              resize: "none",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "10px",
              outline: "none",
              position: "absolute", 
              left: "20%",
              marginBottom: "15px",
              transition: "height 0.2s ease-in-out"}}
              />
              </div>
              <div style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
          }}>
      <Label style={{ fontWeight: "bold" }}>Category:</Label>
      <Select id="company-select" value={selectedCompany} onChange={handleCompanySelect} style={{ position: "absolute", left: "20%", width: "30%"}} >
        <option value="">-- Please select --</option>
        <option value="company1">Finance</option>
        <option value="company2">Utility</option>
        <option value="company3">Health</option>
      </Select>
    </div>
              <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <label style={{ fontWeight: "bold" }}>Repository URL:</label>
          <input
            type="text"
            style={{ position: "absolute", left: "20%" }}
            placeholder="Enter URL  "
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <label style={{ fontWeight: "bold" }}>Live Service URL:</label>
          <input
            type="text"
            style={{ position: "absolute", left: "20%" }}
            placeholder="Enter URL  "
          />
        </div>
        <div style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
          }}>
      <Label style={{ fontWeight: "bold" }}>Company:</Label>
      <Select id="company-select" value={selectedCompany} onChange={handleCompanySelect} style={{ position: "absolute", left: "20%", width: "30%" }} >
        <option value="">-- Please select --</option>
        <option value="company1">Company 1</option>
        <option value="company2">Company 2</option>
        <option value="company3">Company 3</option>
      </Select>
    </div>
    <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <label style={{ fontWeight: "bold" }}>Email Address:</label>
          <input
            type="text"
            style={{ position: "absolute", left: "20%" }}
            placeholder="Enter service name"
          />
        </div>
        <a href="/register-sent">
             <Button style={{marginTop: '5px'}}>Apply Now</Button>
             </a>
            </div>
          </div>
        );
      };
