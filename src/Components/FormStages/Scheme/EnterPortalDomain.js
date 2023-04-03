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
import Fuse from "fuse.js";

const EnterPortalDomain = () => {
  const [pageTitle, setPageTitle] = useState("");
  const id = sessionStorage.getItem("Citizen_ID");
  const [pageUrl, setPageUrl] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(0 + 1);
  const [portalExists, setPortalExists] = useState(false);
  const [companyExists, setCompanyExists] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleSearchBoxChange = async (e) => {
    const searchTerm = e.target.value;
    setPageUrl(searchTerm);
    setPageTitle(
      searchTerm
        ? `https://sssp-qa.dj4eixkpal8an.amplifyapp.com/digital-services/portal/${searchTerm}`
        : ""
    );
    if (searchTerm) {
      const response = await fetch(
        `http://192.168.68.108:2000/api/domain-similar-match/${searchTerm}`
      );
      const data = await response.json();
      const similarDomains = data["Similar domains"];
      console.log(similarDomains);
      setFilteredOptions(similarDomains);
    }
  };

  return (
    <div className="container">
      <LoadingBox loading={loading}>
        <div>
          <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
            Enter a domain name
          </MainHeading>

          <br></br>
          {portalExists === true && (
            <div>
              <Caption>Enter some descriptive keywords to get started</Caption>
              <br></br>
              <ErrorText>Portal Endpoint already exists</ErrorText>
              <SearchBox label="Domains" fullWidth sx={{ mb: 2 }}>
                <SearchBox.Input
                  placeholder="Enter some descriptive keywords to get started"
                  value={pageUrl}
                  onChange={handleSearchBoxChange}
                />
                <SearchBox.Button />
              </SearchBox>
              <br></br>
              <br></br>
              {pageUrl !== "" &&
                filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Card sx={{ flexGrow: 1 }}>
                      <CardContent>
                        <Typography
                          variant="p1"
                          component="p1"
                          sx={{ wordWrap: "break-word" }}
                        >
                          <a href="#">{option}</a>
                        </Typography>
                        <Button style={{ float: "right" }}>Select</Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              <br></br>
            </div>
          )}
          {portalExists === false && (
            <div>
              <Caption>Enter some descriptive keywords to get started</Caption>

              <SearchBox label="Domains" fullWidth sx={{ mb: 2 }}>
                <SearchBox.Input
                  placeholder="Enter some descriptive keywords to get started"
                  value={pageUrl}
                  onChange={handleSearchBoxChange}
                />
                <SearchBox.Button />
              </SearchBox>
              <br></br>
              <br></br>
              {pageUrl !== "" && (
                <h5>
                  Your service will be accessible through the following link
                  below:
                </h5>
              )}
              <br></br>

              {pageUrl !== "" &&
                filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Card sx={{ flexGrow: 1 }}>
                      <CardContent>
                        <Typography
                          variant="p1"
                          component="p1"
                          sx={{ wordWrap: "break-word" }}
                        >
                          <a href="#">https://sssp-qa.dj4eixkpal8an.amplifyapp.com/digital-services/portal/{option}</a>
                        </Typography>
                        <Button style={{ float: "right" }}>Select</Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}

              <br></br>
            </div>
          )}
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

export default EnterPortalDomain;
