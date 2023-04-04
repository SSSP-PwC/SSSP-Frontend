import { useState } from "react";
import Sidebar from "./Sidebar";
import "./SiteBuilder.css";
import { Divider, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Button, Heading, InputField } from "govuk-react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function SiteHome() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [nameField, setNameField] = useState(true);
  const { state } = useLocation();
  console.log(state);
  const [formValues, setFormValues] = useState({
    domain: state.domain,
    site_name: "",
  });

  const updateData = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    console.log(formValues);
  };
  const nameSite = () => {
    setNameField(true);
  };

  const visitSite = () => {
    window.open(`${formValues.domain}/pages/1`);
  };
  return (
    <div>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <div
            className="screen"
            style={{ display: "flex", position: "relative" }}
          >
            <Sidebar isSidebar={isSidebar} />

            <Container style={{ padding: "10px" }}>
              <Heading
                style={{
                  fontWeight: "lighter",
                  fontSize: "35px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  margin: "0px",
                }}
              >
                Home
              </Heading>
              <br></br>
              <Button onClick={() => visitSite()} style={{ float: "right" }}>
                Visit site
              </Button>
              <br></br>
              <p
                style={{
                  color: "#505a5f",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  margin: "10px",
                }}
              >
                Use this service to create, manage, and publish your sites.
              </p>

              <Container
                style={{
                  borderStyle: "solid",
                  borderRadius: "20px",
                  borderWidth: "1px",
                }}
              >
                <br></br>
                <Divider>Site name</Divider>
                <br></br>
                <Heading
                  style={{
                    fontWeight: "lighter",
                    fontSize: "35px",
                    margin: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  Add a site name
                </Heading>
                <br></br>
                <p
                  style={{
                    color: "#505a5f",
                    margin: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  This is how your service will appear in the services page so
                  it's important that people know what your site is about.
                </p>
                <br></br>
                {nameField === false ? (
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Button onClick={() => nameSite()}>Name site</Button>
                  </div>
                ) : (
                  <div>
                    <InputField
                      input={{
                        name: "site_name",
                        required: true,
                        value: formValues.site_name,
                        onChange: updateData,
                      }}
                    >
                      <div
                        style={{
                          margin: "5px",
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        Site name:
                      </div>
                    </InputField>
                    <br></br>
                    <div
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Button onClick={() => nameSite()}>Submit</Button>
                    </div>
                  </div>
                )}
              </Container>
              <br></br>

              <Container
                style={{
                  borderStyle: "solid",
                  borderRadius: "20px",
                  borderWidth: "1px",
                }}
              >
                <br></br>
                <Divider>Edit your domain</Divider>
                <br></br>
                <Heading
                  style={{
                    fontWeight: "lighter",
                    fontSize: "35px",
                    margin: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  Rename your domain
                </Heading>
                <br></br>
                <p
                  style={{
                    color: "#505a5f",
                    margin: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  Create a domain that is easily accessible to all users across
                  the web.
                </p>
                <InputField
                  input={{
                    name: "domain",
                    required: true,
                    value: formValues.domain,
                    onChange: updateData,
                  }}
                >
                  <div
                    style={{
                      margin: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    Domain Name:
                  </div>
                </InputField>
                <br></br>

                <br></br>
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Button style={{ margin: "5px" }}>Search domain </Button>
                  <Button style={{ margin: "5px" }}>Save domain</Button>
                </div>
                <br></br>
              </Container>
            </Container>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default SiteHome;
