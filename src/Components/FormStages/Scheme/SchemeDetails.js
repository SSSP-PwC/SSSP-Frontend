import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCollapse from "react-collapsed";
import { Form } from "react-bootstrap";
import { Button, MainHeading } from "../../../globalStyles";

export const SchemeDetails = ({ schemeId }) => {
  const [scheme, setScheme] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:4000/api/scheme/${schemeId}`)
      .then((response) => response.json())
      .then((data) => setScheme(data));
  }, [schemeId]);
  console.log(scheme);

  function refreshPage() {
    window.location.reload();
  }
  function DetailsCollapsible() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
      <div className="collapsible">
        <div
          className="header"
          style={{ fontWeight: "bold", textDecoration: "underline", color: "#1d70b8" }}
          {...getToggleProps()}
        >
          {isExpanded
            ? "Minimise Details -"
            : "Details +"}
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
          style={{ fontWeight: "bold", textDecoration: "underline", color: "#1d70b8" }}
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
          style={{ fontWeight: "bold", textDecoration: "underline", color: "#1d70b8" }}
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
          style={{ fontWeight: "bold", textDecoration: "underline", color: "#1d70b8" }}
          {...getToggleProps()}
        >
          {isExpanded
            ? "Minimise Objectives -"
            : "Objectives +"}
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
          style={{ fontWeight: "bold", textDecoration: "underline", color: "#1d70b8" }}
          {...getToggleProps()}
        >
          {isExpanded
            ? "Minimise Objectives -"
            : "Objectives +"}
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
    <div>
      {scheme ? (
        <div>
          <MainHeading style={{fontWeight: "bold"}}>{scheme.scheme_title}</MainHeading>
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
          <DetailsCollapsible/>
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
            <Button style={{ marginBottom: "15px" }}>
              Submit new application
            </Button>
          </Form.Group>{" "}
          <br></br>
        </div>
      ) : (
        <p>Loading scheme details...</p>
      )}
    </div>
  );
};
