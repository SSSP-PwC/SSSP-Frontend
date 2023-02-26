import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Button, Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

export const SchemeSummary = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [show, setShow] = useState(false);
  const [variantType, setVariantType] = useState("");
  const [userResponse, setUserResponse] = useState("");

  const submitForm = async (data) => {};

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
          <form style={{ display: "inline-block" }}>
            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              Scheme Summary
            </MainHeading>
            <Divider></Divider>
            <br></br>
            <p style={{ color: "#505a5f" }}>Profile Creation: Section 5 of 5</p>
            <h6 style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              Summary table
            </h6>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                Scheme Title:
              </Form.Label>
              <small>
                <Link style={{ float: "right" }}>Change</Link>
              </small>
              <Divider></Divider>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                Scheme Short Description:
              </Form.Label>
              <small>
                <Link to="/change-last-name" style={{ float: "right" }}>
                  Change
                </Link>
              </small>
              <Divider></Divider>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                Scheme Details:
              </Form.Label>
              <small>
                <Link to="/change-address-line-1" style={{ float: "right" }}>
                  Change
                </Link>
              </small>
              <Divider></Divider>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                Scheme Start Date:
              </Form.Label>
              <small>
                <Link to="/change-town-city" style={{ float: "right" }}>
                  Change
                </Link>
              </small>
              <Divider></Divider>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                Scheme End Date:
              </Form.Label>
              <small>
                <Link to="/change-postcode" style={{ float: "right" }}>
                  Change
                </Link>
              </small>
              <Divider></Divider>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                Scheme Objectives:
              </Form.Label>
              <small>
                <Link to="/change-email-address" style={{ float: "right" }}>
                  Change
                </Link>
              </small>
              <Divider></Divider>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                Scheme Application Details:
              </Form.Label>
              <small>
                <Link to="/change-email-address" style={{ float: "right" }}>
                  Change
                </Link>
              </small>
              <Divider></Divider>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                Scheme Eligibility Criteria:
              </Form.Label>
              <small>
                <Link to="/change-email-address" style={{ float: "right" }}>
                  Change
                </Link>
              </small>
              <Divider></Divider>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                Scheme Publisher Details:
              </Form.Label>
              <small>
                <Link to="/change-email-address" style={{ float: "right" }}>
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
        </div>
      </div>
    </div>
  );
};
