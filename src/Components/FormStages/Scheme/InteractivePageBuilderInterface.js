import { useEffect, useState, useRef } from "react";
import { Divider, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Modal from "react-bootstrap/Modal";
import {
  Button,
  Checkbox,
  Footer,
  H3,
  Heading,
  InputField,
  Label,
  LoadingBox,
  MultiChoice,
  Select,
  TextArea,
  TopNav,
} from "govuk-react";
import { Container, Form } from "react-bootstrap";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import "react-image-crop/dist/ReactCrop.css";
import React, { useContext } from "react";
import { useMediaQuery } from "@mui/material";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { IoIosCreate } from "react-icons/io";
import { MdOutlineLogin } from "react-icons/md";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { DetailsOutlined } from "@mui/icons-material";
import "react-pro-sidebar/dist/css/styles.css";
import { SearchBox } from "govuk-react";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "react-phone-input-2";
import { HexColorPicker } from "react-colorful";

function InteractivePageBuilderInterface({ link, mode }) {
  const [theme, colorMode] = useMode();
  const id = sessionStorage.getItem("Citizen_ID");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState();
  const [color, setColors] = useState("#bf4040");
  const [selectedFile, setSelectedFile] = useState();
  const [title, setTitle] = useState("Upload your site icon here");
  const [label, setLabel] = useState("Click here to upload your icon");
  const [preview, setPreview] = useState();
  const [sidebar, setSideBar] = useState(false);
  const [numberOfElements, setNumberOfElements] = useState(0);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const [pageCounter, setPageCounter] = useState(1);

  const [formData, setFormData] = useState("");

  const [options, setOptions] = useState();

  const isSmallScreen = false;
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [labelValue, setLabelValue] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [selected, setSelected] = useState(undefined);
  const [data, setData] = useState(selected);
  const [page, setPage] = useState([
    {
      fields: [{}],
    },
  ]);

  const citizen_id = sessionStorage.getItem("Citizen_ID");
  console.log(formData);
  const updateData = (event, property, fieldIndex) => {
    const currentPage = page[0];
    const currentPageFields = currentPage.fields ? [...currentPage.fields] : [];
    const field = currentPageFields[fieldIndex];
    const updatedField = {
      ...field,
      config: {
        ...field.config,
        [property]: event.target.value,
      },
    };
    currentPageFields[fieldIndex] = updatedField;
    const newPage = [{ ...currentPage, fields: currentPageFields }];
    setPage(newPage);

    if (property === "label") {
      setLabelValue((prevValues) => {
        const newValues = [...prevValues];
        newValues[fieldIndex] = event.target.value;
        return newValues;
      });
    }

    const newFormData = { ...formData };
    newFormData[field.name] = updatedField;
    setFormData(newFormData);
  };

  const resetConfiguration = () => {
    setFormData({});

    console.log(formData);
  };
  const handlePageBreakClick = () => {
    setPageCounter(pageCounter + 1);
  };

  const [citizen, setCitizen] = useState();

  const handleAddField = (input_value) => {
    setSelected(input_value);
    const currentPage = page[0];
    const currentPageFields = currentPage.fields ? [...currentPage.fields] : [];
    setNumberOfElements((prevState) => prevState + 1);

    const newField = {
      type: input_value,
      name: input_value,
      config: {
        label: "",
        color: "#000000",
        width: "",
        height: "",
      },
    };
    currentPageFields.push(newField);
    const newPage = [{ ...currentPage, fields: currentPageFields }];
    setPage(newPage);

    setLabelValue((prevValues) => [...prevValues, ""]);
    if (input_value === "Page Break") {
      handlePageBreakClick();
    } else {
      setShow(true);
    }
  };

  const buttonComponents = [
    { name: "Button", icon: <AddCircleOutlineOutlined /> },
  ];

  const componentCategories = [
    { name: "Input Category", icon: <AddCircleOutlineOutlined /> },
  ];

  const componentList = [
    { name: "Header", icon: <AddCircleOutlineOutlined /> },
    { name: "Button", icon: <AddCircleOutlineOutlined /> },
    { name: "Body", icon: <AddCircleOutlineOutlined /> },
    { name: "Image", icon: <AddCircleOutlineOutlined /> },
    { name: "Navbar", icon: <AddCircleOutlineOutlined /> },
    { name: "Footer", icon: <AddCircleOutlineOutlined /> },
    { name: "File Upload", icon: <AddCircleOutlineOutlined /> },
    { name: "Checkbox", icon: <AddCircleOutlineOutlined /> },
    { name: "Captcha", icon: <AddCircleOutlineOutlined /> },
    { name: "Text area", icon: <AddCircleOutlineOutlined /> },
    { name: "Label", icon: <AddCircleOutlineOutlined /> },
    { name: "Multi choice", icon: <AddCircleOutlineOutlined /> },
    { name: "Phone number", icon: <AddCircleOutlineOutlined /> },
    { name: "Page Break", icon: <AddCircleOutlineOutlined /> },
  ];

  const filteredComponents = componentCategories.filter((component) =>
    component.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const Item = ({ title, to, icon, subMenuItems }) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    const handleItemClick = () => {
      setIsSubMenuOpen((prevIsSubMenuOpen) => !prevIsSubMenuOpen);
    };

    return (
      <>
        <MenuItem onClick={handleItemClick} icon={icon}>
          <Typography>{title}</Typography>
          <Link to={to} />
        </MenuItem>
      </>
    );
  };

  useEffect(() => {
    setIsCollapsed(isSmallScreen);
    async function fetchCitizen() {
      const response = await fetch(
        `https://sssp-378808.nw.r.appspot.com/api/${citizen_id}`
      );
      const data = await response.json();
      setCitizen(data);
      console.log(selected);
    }
    fetchCitizen();
  }, [isSmallScreen]);
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
  const createPage = async (pageData) => {
    try {
      const response = await fetch(
        `https://sssp-378808.nw.r.appspot.com/api/add-page-elements/${formValues.domain}/${pageCounter}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: pageData.fields,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async () => {
    let pages = [];
    let currentPage = { fields: [] };

    page[0].fields.forEach((field, index) => {
      if (field.type === "Page Break") {
        pages.push(currentPage);
        currentPage = { fields: [] };
      } else {
        const props = {
          name: field.name,
          label: labelValue[index],
          type: field.type,
          required: field.required,
        };
        currentPage.fields.push({ props });
      }
    });

    pages.push(currentPage);

    for (let i = 0; i < pages.length; i++) {
      const pageData = {
        fields: pages[i].fields,
      };
      console.log(pageData);
      await createPage(pageData);
    }
  };

  const handleRemoveField = (index) => {
    const currentPage = page[0];
    if (!currentPage) {
      console.error(`Tab ${0} is not defined`);
      return;
    }
    const currentPageFields = [...currentPage.fields];
    currentPageFields.splice(index, 1);
    const newPages = [...page];
    newPages[0] = {
      ...currentPage,
      fields: currentPageFields,
    };
    setPage(newPages);
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
  const handleColorChange = (color) => {
    if (typeof color === "string") {
      setFormData({
        ...formData,
        color: color,
      });
    } else if (color && color.target) {
      const { value } = color.target;
      setFormData({
        ...formData,
        color: value,
      });
    } else {
      console.error("Invalid color event:", color);
    }
  };

  const RenderForm = () => {
    const fieldsToRender = [];

    const tab = page;

    if (tab) {
      tab[0].fields.forEach((field, index) => {
        let formField = null;

        switch (field.type) {
          case "Text Field":
            formField = (
              <div key={index}>
                <label style={{ textAlign: "center" }}>
                  {" "}
                  {field.config.label}
                </label>

                <br />
                <InputField
                  style={{
                    width: field.config.width + "px",
                    height: field.config.height + "px",
                  }}
                  input={{
                    type: field.type,
                    name: field.label,
                    required: field.required,
                  }}
                />
                <br></br>
              </div>
            );
            break;
          case "Email":
            formField = (
              <div key={index}>
                <label style={{ textAlign: "center" }}>
                  {field.config.label}
                </label>
                <br />
                <InputField
                  style={{
                    width: field.config.width + "px",
                    height: field.config.height + "px",
                  }}
                  input={{
                    type: field.type,
                    name: field.label,
                    required: field.required,
                  }}
                />
                <br></br>
              </div>
            );
            break;
          case "Text area":
            formField = (
              <div key={index}>
                <label style={{ textAlign: "center" }}>
                  {field.config.label}
                </label>
                <br />
                <TextArea
                  style={{
                    width: field.config.width + "px",
                    height: field.config.height + "px",
                  }}
                  input={{
                    type: field.type,
                    name: field.label,
                    required: field.required,
                  }}
                />
                <br></br>
              </div>
            );
            break;

          case "Password":
            formField = (
              <div key={index}>
                <label style={{ textAlign: "center" }}>
                  {" "}
                  {field.config.label}
                </label>
                <br />
                <InputField
                  style={{
                    width: field.config.width + "px",
                    height: field.config.height + "px",
                  }}
                  input={{
                    type: field.type,
                    name: field.name,
                    required: field.required,
                  }}
                />
                <br></br>
              </div>
            );
            break;

          case "Number":
            formField = (
              <div key={index}>
                <label style={{ textAlign: "center" }}>
                  {" "}
                  {field.config.label}
                </label>
                <br />
                <InputField
                  style={{
                    width: field.config.width + "px",
                    height: field.config.height + "px",
                  }}
                  input={{
                    type: field.type,
                    name: field.label,
                    required: field.required,
                  }}
                />
                <br></br>
              </div>
            );
            break;
          case "Button":
            formField = (
              <div key={index}>
                <br />
                <Button
                  style={{
                    width: field.config.width + "px",
                    height: field.config.height + "px",
                  }}
                  input={{
                    type: field.type,
                    name: field.label,
                    required: field.required,
                  }}
                >
                  {field.config.label}
                </Button>
                <br></br>
              </div>
            );
            break;
          case "Check box":
            formField = (
              <div key={index}>
                <Checkbox name={field.label} required={field.required} />
                <label style={{ textAlign: "center" }}>{field.name}</label>
                <br></br>
              </div>
            );
            break;
          case "Text":
            formField = (
              <div key={index}>
                <label style={{ textAlign: "center" }}>{field.name}</label>
                <br />
                <TextArea
                  name={field.label}
                  required={field.required}
                  multiline
                />
                <br></br>
              </div>
            );
            break;
          case "File Upload":
            formField = (
              <div key={index}>
                <br></br>
              </div>
            );
            break;
          case "Label":
            formField = (
              <div key={index}>
                <Label
                  input={{
                    type: "text",
                    value: field.label,
                  }}
                >
                  {field.config.label}
                </Label>
                <br></br>
              </div>
            );
            break;
          case "Body":
            formField = (
              <div key={index}>
                <Label
                  input={{
                    type: "text",
                    value: field.config.label,
                  }}
                >
                  {field.config.label}
                </Label>
                <br></br>
              </div>
            );
            break;
          case "Header":
            formField = (
              <div key={index}>
                <Heading
                  size="LARGE"
                  input={{
                    type: "text",
                  }}
                >
                  {field.config.label}
                </Heading>
                <br></br>
              </div>
            );
            break;
          case "Navbar":
            formField = (
              <div key={index}>
                <TopNav
                  style={{
                    color: field.color,
                    width: field.config.width + "px",
                    height: field.config.height + "px",
                    backgroundColor: formData.color,
                  }}
                  company={
                    <TopNav.Anchor target="new">
                      {field.config.label}
                    </TopNav.Anchor>
                  }
                />
                <br></br>
              </div>
            );
            break;
          case "coming-soon":
            formField = (
              <div>
                <div
                  style={{
                    height: "100vh",
                    backgroundImage: `url("https://pbs.twimg.com/ext_tw_video_thumb/1274020389501485057/pu/img/VkWNp99xjlTc_Q5d.jpg:large")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "calc(100vh - 140px)",
                  }}
                >
                  <Heading
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      color: "white",
                    }}
                  >
                    Site Coming Soon!
                  </Heading>
                  <img
                    src={process.env.PUBLIC_URL + "/img/AnimatedLogo.gif"}
                    style={{ maxWidth: "350px", maxHeight: "300px" }}
                  />
                  <br></br>
                  <br></br>

                  <H3 style={{ color: "white", fontWeight: "normal" }}>
                    This site is currently under development.
                  </H3>
                  <H3 style={{ color: "white", fontWeight: "normal" }}>
                    Please check back later.
                  </H3>

                  <br></br>
                </div>
              </div>
            );
            break;
          case "Footer":
            formField = (
              <div key={index}>
                <Footer
                  licence={
                    <span>
                      All content is available under the{" "}
                      <styled
                        href="https://creativecommons.org/licenses/by/4.0/"
                        rel="license"
                      >
                        Creative Commons Attribution 4.0 International Licence{" "}
                      </styled>
                      , except where otherwise stated
                    </span>
                  }
                />
              </div>
            );
            break;
          case "Multi choice":
            formField = (
              <div key={index}>
                <MultiChoice label={field.config.label}></MultiChoice>
              </div>
            );
            break;
          case "Drop-down":
            formField = (
              <div key={index}>
                <Select id="page-select">
                  <option value=""> {field.config.label}</option>
                </Select>
              </div>
            );
            break;
          case "Website URL":
            formField = (
              <div key={index}>
                <Link href={`${field.name}`}>
                  <Label
                    input={{
                      type: "text",
                      value: field.name,
                    }}
                  >
                    {field.config.label}
                  </Label>
                </Link>
                <br></br>
              </div>
            );
            break;
          case "Phone number":
            formField = (
              <div key={index}>
                <PhoneInput
                  placeholder={field.name}
                  //value={phoneNumber}
                  //onChange={setPhoneNumber}
                />
                <br></br>
              </div>
            );
            break;
          case "Page Break":
            formField = (
              <div key={index} onClick={handlePageBreakClick}>
                <Divider></Divider>
                <br></br>
              </div>
            );
            break;

          case "Captcha":
            formField = (
              <div key={index}>
                <ReCAPTCHA
                  sitekey={"6LeiNAclAAAAAImMXqIfk2YOFJF99SD6UVUAqyvd"}
                />
                <br></br>
              </div>
            );
          default:
            break;
        }

        if (formField) {
          fieldsToRender.push(formField);
        }
      });
    }

    return (
      <div className="container">
        <form style={{ overflowWrap: "break-word" }}>{fieldsToRender}</form>
      </div>
    );
  };

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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={resetConfiguration}>
          <Modal.Title>Component Configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Divider>Label Details</Divider>
              <br></br>
              <center>
                <Label>Label Name:</Label>
                <InputField
                  onChange={(event) =>
                    updateData(event, "label", numberOfElements)
                  }
                  input={{
                    name: "label",
                  }}
                />
              </center>
            </Form.Group>
            <Divider>Component Adjustments</Divider>
            <br></br>
            <center>
              <Label>Label Colour:</Label>

              <HexColorPicker
                color={formData.color}
                onChange={handleColorChange}
              />
            </center>
            <br></br>
            <br></br>
            <Form.Group
              className="mb-3"
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                display: "flex",
                marginLeft: "50px",
                marginRight: "50px",
              }}
            >
              <InputField
                style={{ maxWidth: "100px", float: "left" }}
                onChange={(e) => updateData(e, "width", numberOfElements)}
                input={{
                  name: "width",
                  required: true,
                }}
              >
                <center>Width (px)</center>
              </InputField>

              <InputField
                style={{ maxWidth: "100px", float: "right" }}
                onChange={(e) => updateData(e, "height", numberOfElements)}
                input={{
                  name: "height",
                  required: true,
                }}
              >
                <center>Height (px)</center>
              </InputField>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
      <LoadingBox loading={loading}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <div
              className="screen"
              style={{ display: "flex", position: "relative" }}
            >
              {isSmallScreen === true ? (
                <div></div>
              ) : (
                <div>
                  <Box
                    style={{ height: "100%" }}
                    sx={{
                      "& .pro-sidebar-inner": {
                        bgcolor: "#212529",
                      },
                      "& .pro-icon-wrapper": {
                        backgroundColor: "transparent !important",
                      },
                      "& .pro-inner-item": {
                        padding: "5px 35px 5px 20px !important",
                      },
                      "& .pro-inner-item:hover": {
                        color: "#868dfb !important",
                      },
                      "& .pro-menu-item.active": {
                        color: "#6870fa !important",
                      },
                    }}
                  >
                    <ProSidebar
                      collapsed={isCollapsed}
                      style={{
                        backgroundColor: "#212529",
                        border: "none",
                        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                        borderRadius: "20px",
                        overflow: "hidden",
                        margin: "3px",
                        marginTop: "0px",
                      }}
                    >
                      <Menu iconShape="square">
                        <MenuItem
                          onClick={() => setIsCollapsed(!isCollapsed)}
                          icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                          style={{
                            margin: "10px 0 20px 0",
                          }}
                        >
                          {!isCollapsed && (
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              ml="15px"
                            >
                              <Typography
                                variant="h3"
                                color={colors.primary[900]}
                              >
                                Site Builder
                              </Typography>
                              <IconButton
                                onClick={() => setIsCollapsed(!isCollapsed)}
                              >
                                <MenuOutlinedIcon
                                  style={{ color: colors.primary[900] }}
                                />
                              </IconButton>
                            </Box>
                          )}
                        </MenuItem>

                        {!isCollapsed && (
                          <Box mb="25px">
                            <Box textAlign="center">
                              <Typography
                                variant="h2"
                                sx={{ m: "10px 0 0 0" }}
                              ></Typography>
                            </Box>
                          </Box>
                        )}
                        {mode === "Site Home" && (
                          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                            <Item
                              title="My Home"
                              to="/site-home"
                              icon={<DetailsOutlined />}
                              selected={selected}
                              setSelected={setSelected}
                            />

                            <Typography
                              variant="h6"
                              sx={{ m: "15px 0 5px 20px" }}
                            >
                              Details
                            </Typography>
                            <Item
                              title="Site Details"
                              to="/team"
                              icon={<DetailsOutlined />}
                              selected={selected}
                              setSelected={setSelected}
                            />

                            <Typography
                              variant="h6"
                              sx={{ m: "15px 0 5px 20px" }}
                            >
                              Pages
                            </Typography>
                            <Item
                              title="Create Pages"
                              to={`/page-builder-interface/?domain=${link}`}
                              icon={<AutoStoriesIcon />}
                              selected={selected}
                              setSelected={setSelected}
                            />
                          </Box>
                        )}
                        {!isCollapsed && mode !== "Site Home" && (
                          <Box>
                            <div style={{ margin: "20px" }}>
                              <SearchBox
                                value={searchText}
                                onChange={(event) =>
                                  setSearchText(event.target.value)
                                }
                                fullWidth
                                sx={{ mb: 2 }}
                              >
                                <SearchBox.Input placeholder="Search element" />
                                <SearchBox.Button />
                              </SearchBox>
                              <br></br>
                              <SubMenu
                                style={{ color: "white" }}
                                title="Button"
                              >
                                {buttonComponents.map((component) => (
                                  <ListItem
                                    button
                                    key={component.name}
                                    selected={selected === component.name}
                                    onClick={() =>
                                      handleAddField(component.name)
                                    }
                                  >
                                    <ListItemIcon style={{ color: "white" }}>
                                      {component.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={component.name} />
                                  </ListItem>
                                ))}
                              </SubMenu>
                            </div>
                          </Box>
                        )}

                        {isCollapsed && mode !== "Site Home" && (
                          <Box>
                            <div style={{ margin: "20px" }}>
                              <SubMenu style={{ color: "white" }} title="HHH">
                                {filteredComponents.map((component) => (
                                  <ListItem
                                    button
                                    key={component.name}
                                    selected={selected === component.name}
                                    onClick={() => setSelected(component.name)}
                                  >
                                    <ListItemIcon style={{ color: "white" }}>
                                      {component.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={component.name} />
                                  </ListItem>
                                ))}
                              </SubMenu>
                            </div>
                          </Box>
                        )}
                      </Menu>
                    </ProSidebar>
                  </Box>
                </div>
              )}

              <Container style={{ padding: "20px" }}>
                <Heading
                  style={{
                    fontWeight: "lighter",
                    fontSize: "40px",
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
                <Button style={{ float: "right" }} onClick={handleRemoveField}>
                  Preview site
                </Button>

                <Button onClick={submit}>Launch site</Button>
                <div>
                  <RenderForm />
                </div>
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