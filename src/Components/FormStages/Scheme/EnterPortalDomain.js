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
  const id = sessionStorage.getItem("Citizen_ID");
  const [pageUrl, setPageUrl] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(0 + 1);
  const [portalExists, setPortalExists] = useState(false);
  const [companyExists, setCompanyExists] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://sssp-378808.nw.r.appspot.com/api/citizen/${id}/companies`)
      .then((response) => response.json())
      .then((data) => {
        if (data?.message?.includes("No companies found for this citizen.")) {
          setCompanyExists(false);
          setLoading(false);
        } else {
          setLoading(false);
          setCompanyExists(true);
          setOptions(data);
          setFilteredOptions(data);
        }
      });
  }, [id]);

  const search = async (query) => {
    const id = 'c55b5b2a672b84a6e';
    const apiKey = 'AIzaSyBI3PQW7W-wfJMWcY_lF4M1VZkGQflXLB0';
    const endpoint = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${id}&q=${query}`;
  
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
  const handleSearchBoxChange = async (e) => {
    const searchTerm = e.target.value;
    const filtered = options?.filter((option) =>
      option?.domain?.includes(searchTerm)
    );
    setFilteredOptions(filtered);
    setPageUrl(searchTerm);
    setPageTitle(
      searchTerm
        ? `https://marcas.dj4eixkpal8an.amplifyapp.com/digital-services/portal/${searchTerm}`
        : ""
    );
  
    if (searchTerm) {
      try {
        const data = await search(searchTerm);
        console.log(data); // handle the response data here
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  return (
    <div className="container">
      <LoadingBox loading={loading}>
        {companyExists === true && (
          <div>
            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              Enter a domain name
            </MainHeading>

            <br></br>
            {portalExists === true && (
              <div>
                <Caption>
                  Enter some descriptive keywords to get started
                </Caption>
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
                {pageUrl !== "" && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Card sx={{ flexGrow: 1 }}>
                      <CardContent>
                        {pageTitle && (
                          <Typography
                            variant="p1"
                            component="p1"
                            sx={{ wordWrap: "break-word" }}
                          >
                            <a href="#">{pageTitle}</a>
                          </Typography>
                        )}
                        <Button style={{ float: "right" }}>Select</Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
                <br></br>
              </div>
            )}
            {portalExists === false && (
              <div>
                <Caption>
                  Enter some descriptive keywords to get started
                </Caption>

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

                {pageUrl !== "" && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Card sx={{ flexGrow: 1 }}>
                      <CardContent>
                        {pageTitle && (
                          <Typography
                            variant="p1"
                            component="p1"
                            sx={{ wordWrap: "break-word" }}
                          >
                            <a href="#">{pageTitle}</a>
                          </Typography>
                        )}
                        <Button style={{ float: "right" }}>Select</Button>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <br></br>
              </div>
            )}
          </div>
        )}

        {companyExists === false && (
          <div>
            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              No companies associated with citizen account
            </MainHeading>
            <Divider style={{ background: "black" }}></Divider>
            <br></br>
            <p style={{ color: "#505a5f" }}>
              Would you like to associate a company with your account?
            </p>
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

            <br></br>
          </div>
        )}
      </LoadingBox>
    </div>
  );
};

export default EnterPortalDomain;
