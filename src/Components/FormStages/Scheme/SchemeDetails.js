import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCollapse from "react-collapsed";
import { Form } from "react-bootstrap";
import {  MainHeading } from "../../../globalStyles";
import { Button } from "govuk-react";

import { BarLoader } from "react-spinners";
import { Panel, PhaseBanner } from "govuk-react";
import banner from "../../../img/banner.jpg";
export const SchemeDetails = ({ schemeId }) => {
  const [scheme, setScheme] = useState(null);
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(
      `https://20230226t215147-dot-sssp-378808.nw.r.appspot.com/api/scheme/${schemeId}`
    )
      .then((response) => response.json())
      .then((data) => setScheme(data), setLoaded(true));
  }, [schemeId]);

  function renderRegisterForm() {
    navigate("/Registration-Form-Landing-Page", {
      state: {
        scheme_id: schemeId,
        scheme_title: scheme.scheme_title
      },
    });
  }
  function renderSelfEligibilityChecker() {
    navigate("/Eligibility-Checker-Registered-Company", {
      state: {
        scheme_id: schemeId,
      },
    });
  }
  function DetailsCollapsible() {
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
          {isExpanded ? "Minimise Details -" : "Details +"}
        </div>
        <div {...getCollapseProps()}>
          <div className="content">
            {scheme.scheme_details}
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
  function ApplicationCollapsible() {
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
            ? "Minimise Application Details -"
            : "Application Details +"}
        </div>
        <div {...getCollapseProps()}>
          <div className="content">
            {scheme.scheme_application_details_description}
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
  function EligibilityCriteriaCollapsible() {
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
            ? "Minimise Eligibility Criteria -"
            : "Eligibility Criteria +"}
        </div>
        <div {...getCollapseProps()}>
          <div className="content">
            {scheme.scheme_eligibility_criteria}
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
  function ObjectivesCollapsible() {
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
          {isExpanded ? "Minimise Objectives -" : "Objectives +"}
        </div>
        <div {...getCollapseProps()}>
          <div className="content">
            {scheme.scheme_objectives_description}
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
  function ObjectivesCollapsible() {
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
          {isExpanded ? "Minimise Objectives -" : "Objectives +"}
        </div>
        <div {...getCollapseProps()}>
          <div className="content">
            {scheme.scheme_objectives_description}
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: "inline-block" }}>
      {scheme ? (
        <div>
          <MainHeading style={{ fontWeight: "bold" }}>
            {scheme.scheme_title}
          </MainHeading>
          <Divider style={{ background: "black" }}></Divider>
          <br></br>
          <p>{scheme.scheme_description}</p>
          <p style={{ fontWeight: "bold" }}>
            Opening Date:{" "}
            <a style={{ fontWeight: "normal" }}>{scheme.scheme_start_date}</a>
          </p>
          <p style={{ fontWeight: "bold" }}>
            Closing Date:{" "}
            <a style={{ fontWeight: "normal" }}>{scheme.scheme_end_date}</a>
          </p>
          <Divider style={{ background: "black" }}></Divider>
          <br></br>
          <DetailsCollapsible />
          <Divider style={{ background: "black" }}></Divider>
          <br></br>
          <ApplicationCollapsible />
          <Divider style={{ background: "black" }}></Divider>
          <br></br>
          <EligibilityCriteriaCollapsible />
          <Divider style={{ background: "black" }}></Divider>
          <br></br>
          <ObjectivesCollapsible />
          <Divider style={{ background: "black" }}></Divider>
          <br></br>
          <Form.Group>
            <Button
              onClick={renderRegisterForm}
              style={{ marginBottom: "15px" }}
            >
              Register
            </Button>{" "}
            <Button
              onClick={renderSelfEligibilityChecker}
              style={{ marginBottom: "15px" }}
            >
              Self eligibility checker
            </Button>
          </Form.Group>{" "}
          <br></br>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <BarLoader loading={loaded} size={200} />
        </div>
      )}
    </div>
  );
};
