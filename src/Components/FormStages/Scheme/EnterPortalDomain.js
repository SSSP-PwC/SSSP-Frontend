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

const EnterPortalDomain = () => {
  const [pageTitle, setPageTitle] = useState("");
  const [pageUrl, setPageUrl] = useState("");

  const [portalExists, setPortalExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);

  const navigate = useNavigate();

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
        `https://sssp-378808.nw.r.appspot.com/api/domain-similar-match/${searchTerm}`
      );
      const data = await response.json();
      const similarDomains = data["Similar domains"];
      console.log(similarDomains);
      setFilteredOptions(similarDomains);
    }
  };
  const handleSelect = (domain) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        domain_name: domain,
      }),
    };
    fetch(`https://sssp-378808.nw.r.appspot.com/api/register-domain`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Domain name already exists") {
          alert("Please select a different domain");
        } else {
          navigate(
            `/site-home/https://sssp-qa.dj4eixkpal8an.amplifyapp.com/digital-services/portal/?domain=${domain}`,
            {
              state: {
                domain: `${domain}`,
              },
            }
          );
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
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
                        <Button
                          style={{ float: "right" }}
                          onClick={() => handleSelect(index)}
                        >
                          Select
                        </Button>
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
                <SearchBox.Button onClick={() => alert("H")} />
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
                          <a href="#">
                            https://sssp-qa.dj4eixkpal8an.amplifyapp.com/digital-services/portal/
                            {option}
                          </a>
                        </Typography>
                        <Button
                          style={{ float: "right" }}
                          onClick={() => handleSelect(option)}
                        >
                          Select
                        </Button>
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
