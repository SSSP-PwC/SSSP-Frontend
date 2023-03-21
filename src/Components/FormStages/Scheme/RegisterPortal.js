import { Divider } from "@mui/material";
import { Button, ErrorText, InputField, Select } from "govuk-react";
import React, { useEffect, useState } from "react";
import { MainHeading } from "../../../globalStyles";
import { useNavigate } from "react-router-dom";

const RegisterPortal = () => {
  const [pageTitle, setPageTitle] = useState("");
  const id = sessionStorage.getItem("Citizen_ID");
  const [pageUrl, setPageUrl] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [portalExists, setPortalExists] = useState(false);

  useEffect(() => {
    fetch(`https://sssp-378808.nw.r.appspot.com/api/citizen/${id}/companies`)
      .then((response) => response.json())
      .then((data) => setOptions(data));
  }, [id]);

  const navigate = useNavigate();
  const hasWhiteSpace = (s) => {
    return /\s/.test(s);
  };

  const createPortal = async () => {
    if (hasWhiteSpace(pageUrl) === true) {
      alert("URL cannot be processed");
    } else {
      try {
        // Check if endpoint already exists
        const response = await fetch(
          `https://sssp-378808.nw.r.appspot.com/api/portals/${pageUrl}`
        );
        const data = await response.json();

        if (!response.ok) {
          setPortalExists(true);
        }

        const existingPortal =
          data.endpoint.toUpperCase() === pageUrl.toUpperCase();
        if (existingPortal) {
          setPortalExists(true);
          return;
        }

        // Create new portal
      } catch (error) {
        console.log(error);
        const response2 = await fetch(
          "https://sssp-378808.nw.r.appspot.com/api/portal",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: pageTitle,
              endpoint: pageUrl,
            }),
          }
        );
        if (!response2.ok) {
        }
        const data2 = await response2.json();
        console.log(data2);
        navigate("/Page-Builder", {
          state: {
            portal_endpoint: pageUrl,
            portal_id: data2.id,
          },
        });
        return data2.id;
      }
    }
  };

  return (
    <div className="container">
      <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
        Page Builder
      </MainHeading>
      <p style={{ color: "#505a5f" }}>
        Use this service to build your own pages.
      </p>
      <Divider style={{ background: "black" }}></Divider>
      <br></br>
      <InputField
        input={{
          label: "Page Title",
          value: pageTitle,
          onChange: (e) => setPageTitle(e.target.value),
        }}
      >
        Portal Title
      </InputField>
      <br></br>
      {portalExists === true && (
        <div>
          <InputField
            input={{
              label: "Page URL",
              value: pageUrl,
              onChange: (e) => setPageUrl(e.target.value),
            }}
          >
            {" "}
            <ErrorText>Portal Endpoint already exists</ErrorText>
            Portal Endpoint
          </InputField>
        </div>
      )}
      {portalExists === false && (
        <div>
          <InputField
            input={{
              label: "Page URL",
              value: pageUrl,
              onChange: (e) => setPageUrl(e.target.value),
            }}
          >
            Portal Endpoint
          </InputField>
          <br></br>

          <Select
            input={{
              name: "group1",
              onChange: (event) => {
                setSelectedOption(event.target.value);
              },
            }}
            label="Company"
          >
            {options.map((option, index) => (
              <option value={index} key={index}>
                {option.company_name}
              </option>
            ))}
          </Select>
        </div>
      )}

      <br></br>
      <Button onClick={() => createPortal()}>Create Portal</Button>

      <br></br>
    </div>
  );
};

export default RegisterPortal;
