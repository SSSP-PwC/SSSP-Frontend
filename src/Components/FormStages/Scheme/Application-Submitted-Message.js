import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCollapse from "react-collapsed";
import { Form } from "react-bootstrap";
import { Button, MainHeading } from "../../../globalStyles";
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

  function refreshPage() {
    window.location.reload();
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
      {loaded ? (
        <div>
       
          <Panel
            title="Application complete"
            style={{ backgroundColor: "#00823B" }}
          >
            Your reference number
            <br />
            <strong>HD1939380</strong>
          </Panel>
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
