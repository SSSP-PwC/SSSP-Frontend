import React, { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { MainHeading } from "../../../globalStyles";
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
            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              Contact Person Details
            </MainHeading>
            <p style={{ color: "#0B0C0C" }}>
              Is this contact person already registered as a citizen?
            </p>
            <Form.Group>
              <Form.Label style={{ fontSize: "32px" }}>
                <input
                  type="radio"
                  onClick={linkExistingAccount}
                  style={{
                    height: "30px",
                    width: "30px",
                    verticalAlign: "middle",
                    accentColor: "black",
                  }}
                />{" "}
                Yes
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontSize: "32px" }}>
                  <input
                    type="radio"
                    onClick={registerAccount}
                    style={{
                      height: "30px",
                      width: "30px",
                      verticalAlign: "middle",
                      accentColor: "black",
                    }}
                  />{" "}
                  No
              </Form.Label>
            </Form.Group>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
};
