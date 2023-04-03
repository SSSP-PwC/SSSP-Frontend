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
  const [filteredOptions, setFilteredOptions] = useState([]);

  const navigate = useNavigate();

  return (
    <div className="container">
      <LoadingBox loading={loading}>
        <div>
          <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
            Enter a name for the service
          </MainHeading>

          <br></br>
          <InputField
            input={{
              name: "service_name",
              required: true,
            }}
          >
            Service Name                       <p style={{ color: "#505a5f" }}>Section 2 of 5</p>

          </InputField>
          
          <br></br>
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
