import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Button, Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import useCollapse from "react-collapsed";

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

  const submitForm = async () => {
    const url =
      `${process.env.REACT_APP_BACKEND_URL}/post-schemes`;
    const data = {
      scheme_title: state.scheme_title,
      scheme_description: state.scheme_description,
      scheme_details: state.scheme_details,
      scheme_eligibility_criteria: state.scheme_eligibility_criteria,
      scheme_objectives_description: state.scheme_objectives_description,
      scheme_start_date: state.scheme_start_date,
      scheme_end_date: state.scheme_end_date,
      scheme_application_details_description:
        state.scheme_application_details_description,
      scheme_supporting_information_details:
        state.scheme_supporting_information_details,
      scheme_publisher_details: state.scheme_publisher_details,
    };

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
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  function SchemeTitle() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
      <div className="collapsible">
        <div
          className="header"
          style={{
            fontWeight: "bold",
            textDecoration: "underline",
            color: "#1d70b8",
          }}
          {...getToggleProps()}
        >
          {isExpanded ? "Minimise Scheme Title ↑" : "Scheme Title ↓"}
        </div>
        <div {...getCollapseProps()}>
          <div className="content">
            {state.scheme_title}
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
  function SchemeShortDescription() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
      <div className="collapsible">
        <div
          className="header"
          style={{
            fontWeight: "bold",
            textDecoration: "underline",
            color: "#1d70b8",
          }}
          {...getToggleProps()}
        >
          {isExpanded
            ? "Minimise Short Description ↑"
            : "Scheme Short Description ↓"}
        </div>
        <div {...getCollapseProps()}>
          <div className="content">
            {state.scheme_description}
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
  function SchemeDetails() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
      <div className="collapsible">
        <div
          className="header"
          style={{
            fontWeight: "bold",
            textDecoration: "underline",
            color: "#1d70b8",
          }}
          {...getToggleProps()}
        >
          {isExpanded ? "Minimise Scheme Details ↑" : "Scheme Details ↓"}
        </div>
        <div {...getCollapseProps()}>
          <div className="content" style={{ whiteSpace: "pre-line" }}>
            {state.scheme_details}
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
  function SchemeStartDate() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
      <div className="collapsible">
        <div
          className="header"
          style={{
            fontWeight: "bold",
            textDecoration: "underline",
            color: "#1d70b8",
          }}
          {...getToggleProps()}
        >
          {isExpanded ? "Minimise Start Date ↑" : "Scheme Start Date ↓"}
        </div>
        <div {...getCollapseProps()}>
          <div className="content">
            {state.scheme_start_date}
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
  function SchemeEndDate() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
      <div className="collapsible">
        <div
          className="header"
          style={{
            fontWeight: "bold",
            textDecoration: "underline",
            color: "#1d70b8",
          }}
          {...getToggleProps()}
        >
          {isExpanded ? "Minimise End Date ↑" : "Scheme End Date ↓"}
        </div>
        <div {...getCollapseProps()}>
          <div className="content">
            {state.scheme_end_date}
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
  function SchemeObjectives() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
      <div className="collapsible">
        <div
          className="header"
          style={{
            fontWeight: "bold",
            textDecoration: "underline",
            color: "#1d70b8",
          }}
          {...getToggleProps()}
        >
          {isExpanded ? "Minimise Scheme Objectives ↑" : "Scheme Objectives ↓"}
        </div>
        <div {...getCollapseProps()}>
          <div className="content">
            {state.scheme_objectives_description}
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
  function SchemeApplicationDetails() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
      <div className="collapsible">
        <div
          className="header"
          style={{
            fontWeight: "bold",
            textDecoration: "underline",
            color: "#1d70b8",
          }}
          {...getToggleProps()}
        >
          {isExpanded
            ? "Minimise Application Details ↑"
            : "Scheme Application Details ↓"}
        </div>
        <div {...getCollapseProps()}>
          <div className="content">
            {state.scheme_application_details_description}
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
  function SchemeEligibilityCriteria() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
      <div className="collapsible">
        <div
          className="header"
          style={{
            fontWeight: "bold",
            textDecoration: "underline",
            color: "#1d70b8",
          }}
          {...getToggleProps()}
        >
          {isExpanded
            ? "Minimise Eligibility Criteria ↑"
            : "Scheme Eligibility Criteria ↓"}
        </div>
        <div {...getCollapseProps()}>
          <div className="content">
            {state.scheme_eligibility_criteria}
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
  function SchemePublisherDetails() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
      <div className="collapsible">
        <div
          className="header"
          style={{
            fontWeight: "bold",
            textDecoration: "underline",
            color: "#1d70b8",
          }}
          {...getToggleProps()}
        >
          {isExpanded ? "Minimise Publisher ↑" : "Scheme Publisher ↓"}
        </div>
        <div {...getCollapseProps()}>
          <div className="content">
            {state.scheme_publisher_details}
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div>
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
            <small>
              <SchemeTitle />
            </small>
            <Divider></Divider>
          </Form.Group>
          <br></br>

          <Form.Group>
            <small>
              <SchemeShortDescription />
            </small>
            <Divider></Divider>
          </Form.Group>
          <br></br>

          <Form.Group>
            <small>
              <SchemeDetails />
            </small>
            <Divider></Divider>
          </Form.Group>
          <br></br>

          <Form.Group>
            <small>
              <SchemeStartDate />
            </small>
            <Divider></Divider>
          </Form.Group>
          <br></br>
          <Form.Group>
            <small>
              <SchemeEndDate />
            </small>
            <Divider></Divider>
          </Form.Group>
          <br></br>

          <Form.Group>
            <small>
              <SchemeObjectives />
            </small>
            <Divider></Divider>
          </Form.Group>
          <br></br>

          <Form.Group>
            <small>
              <SchemeApplicationDetails />
            </small>
            <Divider></Divider>
          </Form.Group>
          <br></br>

          <Form.Group>
            <small>
              <SchemeEligibilityCriteria />
            </small>
            <Divider></Divider>
          </Form.Group>
          <br></br>

          <Form.Group>
            <small>
              <SchemePublisherDetails />
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
  );
};
