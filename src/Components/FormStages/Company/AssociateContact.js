import React, { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Radio } from "govuk-react";
import Cookies from 'universal-cookie';
export const AssociateContact = () => {
  const {
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  const cookies = new Cookies();
  console.log(cookies.get("REACT_TOKEN_AUTH_KEY"))
  console.log(state);
  const [show, setShow] = useState(false);
  const [variantType, setVariantType] = useState("");
  const [userResponse, setUserResponse] = useState("");
  const [radioButton, setRadioButton] = useState("");

  const handleNextStage = () => {
    if (radioButton === "Yes") {

      navigate("/Application-Form-Summary-Table");
    }
  };
  const selectedRadioButtonOne = () => {
    setRadioButton("Yes");
  };
  const selectedRadioButtonTwo = () => {
    setRadioButton("No");
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
              <Form>
                <>
                  <Radio name="group1" onClick={selectedRadioButtonOne}>
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
