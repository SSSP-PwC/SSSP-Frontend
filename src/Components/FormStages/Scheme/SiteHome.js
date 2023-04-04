import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import "./SiteBuilder.css";
import { CssBaseline, Divider, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Button, Heading } from "govuk-react";
import { Container } from "react-bootstrap";

function SiteHome() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <div
            className="screen"
            style={{ display: "flex", position: "relative" }}
          >
            <Sidebar isSidebar={isSidebar} />
            <Container style={{ padding: "25px" }}>
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
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Button>Name site</Button>
                </div>
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
                  Attach a custom domain to your site
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
                  the web
                </p>
                <br></br>
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Button style={{margin: "5px"}}>Search domain </Button>
                  <Button style={{margin: "5px"}}>Save domain</Button>
                </div>
                <br></br>

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
                  Attach a custom domain to your site
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
                  the web
                </p>
                <br></br>
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Button style={{margin: "5px"}}>Search domain </Button>
                  <Button style={{margin: "5px"}}>Save domain</Button>
                </div>
                <br></br>

              </Container>
              <br></br>
            </Container>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default SiteHome;
