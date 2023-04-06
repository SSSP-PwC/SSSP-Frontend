import { useEffect, useState, useRef } from "react";
import Sidebar from "./Sidebar";
import "./SiteBuilder.css";
import { Divider, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Modal from "react-bootstrap/Modal";
import { Button, Heading, InputField, LoadingBox, Select } from "govuk-react";
import { Container, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { IoIosCreate } from "react-icons/io";
import { MdOutlineLogin } from "react-icons/md";

function InteractivePageBuilderInterface() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const id = sessionStorage.getItem("Citizen_ID");
  const [portalExists, setPortalExists] = useState();
  const [selectedOption, setSelectedOption] = useState(0 + 1);
  const [loading, setLoading] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [imageUri, setImageURI] = useState({ icon: "" });
  const [selectedFile, setSelectedFile] = useState();
  const [title, setTitle] = useState("Upload your site icon here");
  const [label, setLabel] = useState("Click here to upload your icon");
  const [preview, setPreview] = useState();
  const [sidebar, setSideBar] = useState(false);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const [renderAdditionalSiteNameFields, setRenderAdditionalSiteNameFields] =
    useState(false);
  const [options, setOptions] = useState();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const getCompanies = () => {
      fetch(`https://sssp-378808.nw.r.appspot.com/api/citizen/${id}/companies`)
        .then((response) => response.json())
        .then((data) => setOptions(data));
    };
    const getImage = () => {
      fetch(`ttps://sssp-378808.nw.r.appspot.com/api/`);
    };
    getCompanies();
    setLoading(false);
  }, [id]);

  const [formValues, setFormValues] = useState({
    domain: urlParams.get("domain"),
    site_name: "",
    company_id: options,
  });

  const visitSite = () => {
    window.open(`/digital-services/portal/${formValues.domain}/pages/1`);
  };
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    console.log(selectedFile.type.split("/").pop());

    console.log(objectUrl);
    setPreview(objectUrl);

    setLabel(selectedFile.name);
    setTitle("Your image has been uploaded!");

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const PageBuilderNavbar = () => {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        style={{
          backgroundColor: "#212529",
          border: "none",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          borderRadius: "10px",
          overflow: "hidden",
          margin: "3px",
        }}
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              src={process.env.PUBLIC_URL + "/img/city.png"}
              alt="Logo"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => {
                  setSideBar(true);
                }}
              >
                <span style={{ fontSize: "25px" }}>
                  <IoIosCreate />
                </span>
                Add element
              </Nav.Link>
            </Nav>

            <Nav>
              <NavDropdown
                title={
                  <>
                    <MdOutlineLogin style={{ fontSize: "25px" }} /> Profile
                  </>
                }
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="/personal-profile">
                  Account Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/services">
                  Digital Services
                </NavDropdown.Item>
                <NavDropdown.Item href="/personal-profile">
                  Credential Management
                </NavDropdown.Item>
                <NavDropdown.Item href="/register-company-landing">
                  Register Company
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };
  return (
    <div>
      <PageBuilderNavbar />
      <LoadingBox loading={loading}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <div
              className="screen"
              style={{ display: "flex", position: "relative" }}
            >
                {sidebar === true && (
  <ColorModeContext.Provider value={colorMode}>
  <ThemeProvider theme={theme}>
    <div
      className="screen"
      style={{ display: "flex", position: "relative" }}
    >
      <Sidebar isSidebar={isSidebar} link={formValues.domain} />
    </div>{" "}
  </ThemeProvider>
</ColorModeContext.Provider>
                )}
            
              <Container style={{ padding: "20px" }}>
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
                  Page Builder
                </Heading>
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
                  Start creating your first website now.
                </p>
                <br></br>
                <Container>
                  <div
                    style={{
                      float: "right",
                    }}
                  ></div>
                  <br></br>
                </Container>
                <br></br>
                <br></br>
              </Container>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </LoadingBox>
      <br></br>
    </div>
  );
}

export default InteractivePageBuilderInterface;
