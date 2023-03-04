import React from "react";
import { MainHeading } from "../../../globalStyles";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button} from "govuk-react";

export const RegisterSchemeLandingPage = () => {
  const navigate = useNavigate();
  const handleNextPage = () => {
    navigate("/publish-scheme-title");
  };
  return (
    <div className="container">
      <div
        className="form"
        style={{ marginTop: "70px", display: "inline-block" }}
      >
        <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
          Register a scheme on SSSP
        </MainHeading>
        <Divider style={{ background: "black" }}></Divider>
        <br></br>
        <p style={{ color: "#505a5f" }}>
          Use this service to publish a scheme onto SSSP.
        </p>

        <p style={{ color: "#0B0C0C" }}>
          We will collect the following pieces of information about the scheme:{" "}
        </p>
        <ul>
          <li>Scheme Title</li>
          <li>Scheme Description</li>
          <li>Scheme Start and End Date</li>
          <li>Scheme Objectives</li>
          <li>Application Details</li>
          <li>Eligibility Criteria</li>
          <li>Publisher Details</li>
        </ul>
        <Button style={{ marginBottom: "15px" }} onClick={handleNextPage}>
          Publish now
        </Button>
      </div>
    </div>
  );
};
