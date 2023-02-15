import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Button, MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const AssociateContact = () => {
  const {
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [variantType, setVariantType] = useState("");
  const [userResponse, setUserResponse] = useState("");

  const linkExistingAccount = () => {
    sessionStorage.setItem("company-registration-flow-flag", "true");
    navigate("/link-account");
  };
  const registerAccount = () => {
    sessionStorage.setItem("company-registration-flow-flag", "true");
    navigate("/register-citizen");
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
          <div>
            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              Attach Contact Details
            </MainHeading>
            <p style={{ color: "#0B0C0C" }}>
              You must associate contact details with the company record.
            </p>
            <Button
              style={{ marginBottom: "15px" }}
              onClick={linkExistingAccount}
            >
              Link existing account
            </Button>
            <br></br>
            <Button style={{ marginBottom: "15px" }} onClick={registerAccount}>
              Create new citizen profile
            </Button>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
};
