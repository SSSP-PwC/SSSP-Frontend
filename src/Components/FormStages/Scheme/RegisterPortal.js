import { Divider } from "@mui/material";
import {
  Button,
  ErrorText,
  InputField,
  Label,
  Radio,
  Select,
  ErrorSummary,
  LoadingBox,
} from "govuk-react";
import React, { useEffect, useState } from "react";
import { MainHeading } from "../../../globalStyles";
import { useNavigate } from "react-router-dom";

const RegisterPortal = () => {
  const [pageTitle, setPageTitle] = useState("");
  const id = sessionStorage.getItem("Citizen_ID");
  const [pageUrl, setPageUrl] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(0 + 1);
  const [portalExists, setPortalExists] = useState(false);
  const [companyExists, setCompanyExists] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoading(true)
    fetch(`https://sssp-378808.nw.r.appspot.com/api/citizen/${id}/companies`)
      .then((response) => response.json())
      .then((data) => {
        if (data?.message?.includes("No companies found for this citizen.")) {
          setCompanyExists(false);
          setLoading(false)
        } else {          
          setLoading(false)
          setCompanyExists(true);
          setOptions(data);
        }
      });

  }, [id]);

  const navigate = useNavigate();
  const hasWhiteSpace = (s) => {
    return /\s/.test(s);
  };
  const handleClick = (value) => {
    if (value === "Yes") {
      navigate("/register-company-landing", {
        state: {
            portal_creation_flag: true,
        },
      });
    } else if (value === "No") {
      setError(true);
      setTimeout(() => {
        setLoading(true);
        setTimeout(() => {
          setError(false);
          setLoading(false);
          navigate("/List-Applications");
        }, 1000);
      }, 3000);
    }
  };

  const createPortal = async () => {
    if (hasWhiteSpace(pageUrl) === true) {
      alert("URL cannot be processed");
    } else {
      try {
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
              company_id: selectedOption,
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
      <LoadingBox loading={loading}>
        {companyExists === true && (
          <div>
            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              Register Portal
            </MainHeading>
            <p style={{ color: "#505a5f" }}>
              Use this service to build your own web applications.
            </p>

            <Divider style={{ background: "black" }}></Divider>
            <br></br>
            <p style={{ color: "#505a5f" }}>
              Start by configuring basic details about the portal.
            </p>
            <br></br>
            <InputField
              input={{
                label: "Page Title",
                value: pageTitle,
                onChange: (e) => setPageTitle(e.target.value),
              }}
            >
              Portal Title
              <p style={{ color: "#505a5f" }}>
                This is a global title that uniquely identifies your web
                application.
              </p>
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
                  Portal Endpoint{" "}
                  <p style={{ color: "#505a5f" }}>
                    This is the URL where your portal can be accessed.
                  </p>
                </InputField>
                <br></br>
                <Label style={{ fontSize: "20px" }}>
                  Company
                  <p style={{ color: "#505a5f" }}>
                    Choose the company for which you are developing the web
                    application.
                  </p>
                  <Select
                    input={{
                      name: "group1",
                      onChange: (event) => {
                        setSelectedOption(event.target.value);
                      },
                    }}
                  >
                    {options?.map((option, index) => (
                      <option value={index} key={index}>
                        {option.company_name}
                      </option>
                    ))}
                  </Select>
                </Label>
              </div>
            )}

            <br></br>
            <Button onClick={() => createPortal()}>Create Portal</Button>

            <br></br>
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
            <Radio value="Yes" onClick={(e) => handleClick(e.target.value)}>
              Yes
            </Radio>
            <Radio value="No" onClick={(e) => handleClick(e.target.value)}>
              No
            </Radio>
            <br></br>
          </div>
        )}
      </LoadingBox>
    </div>
  );
};

export default RegisterPortal;
