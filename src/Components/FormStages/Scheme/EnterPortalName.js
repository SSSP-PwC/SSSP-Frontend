import { Card, Divider, CardContent, Typography } from "@mui/material";
import {
  Button,
  ErrorText,
  InputField,
  Label,
  Radio,
  Select,
  ErrorSummary,
  LoadingBox,
  SearchBox,
  Caption,
} from "govuk-react";

import React, { useEffect, useState } from "react";
import { MainHeading } from "../../../globalStyles";
import { useNavigate } from "react-router-dom";

const EnterPortalName = () => {
  const id = sessionStorage.getItem("Citizen_ID");
  const [pageUrl, setPageUrl] = useState("");

  const [portalExists, setPortalExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState();
  console.log(data);
  const navigate = useNavigate();
  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleNext = () => {
    
  }
  return (
    <div className="container">
      <LoadingBox loading={loading}>
        <div>
          <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
            Give your site a name
          </MainHeading>

          <br></br>

          <p style={{ color: "#505a5f" }}>
              This is how your service will appear in the services page so it's important that people know what your site is about.
            </p>
          <br></br>
          <Button
                style={{ marginBottom: "15px" }}
                onClick={handleNext}
              >
                Continue
              </Button>
        </div>

        {error === true && (
          <ErrorSummary
            description={
              "To create a web application, you must associate a company record with your account."
            }
            errors={[
              {
                targetName: "description",
                text: "Company Record",
              },
            ]}
            heading={
              "Cannot proceed without assocating a company record to your citizen account"
            }
          />
        )}
        <br></br>
      </LoadingBox>

      <br></br>
    </div>
  );
};

export default EnterPortalName;
