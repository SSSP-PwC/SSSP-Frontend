import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCollapse from "react-collapsed";
import { Form } from "react-bootstrap";
import { BarLoader } from "react-spinners";
import { Panel, PhaseBanner } from "govuk-react";
import { MainHeading } from "../../../globalStyles";

export const EligibilityCheckerSummary = () => {
  return (
    <div className="container">
      <div
        className="form"
        style={{ marginTop: "70px", display: "inline-block" }}
      >
        <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
          Self eligibility checker
        </MainHeading>
        <Divider style={{ background: "black" }}></Divider>
        <br></br>
        <Panel
          title="You are eligible for the scheme"
          style={{ backgroundColor: "#00823B" }}
        >
          Based on the information provided, you are eligible to apply for this
          scheme.
          <br />
          <br></br>
          <strong>Apply <a href="/Application-Form-Landing-Page" >here</a> </strong>
        </Panel>
      </div>
    </div>
  );
};
