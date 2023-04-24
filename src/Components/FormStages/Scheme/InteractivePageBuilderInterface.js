import { useEffect, useState, useRef } from "react";
import { Divider, Switch, ThemeProvider } from "@mui/material";
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
  Radio,
  TextArea,
  TopNav,
} from "govuk-react";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import FormControl from "@mui/material/FormControl";
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
import { TbLayoutNavbar } from "react-icons/tb";
import { BiDockBottom } from "react-icons/bi";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { IoIosCreate } from "react-icons/io";
import { MdOutlineLogin } from "react-icons/md";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import {
  ArrowDropDownCircleOutlined,
  CropLandscapeOutlined,
  DetailsOutlined,
  DynamicFormOutlined,
  LabelImportantOutlined,
  RadioButtonChecked,
  SmartButtonOutlined,
  SmartToyOutlined,
  TitleOutlined,
  ToggleOnOutlined,
  WysiwygOutlined,
} from "@mui/icons-material";
import "react-pro-sidebar/dist/css/styles.css";
import { SearchBox } from "govuk-react";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "react-phone-input-2";
import { HexColorPicker } from "react-colorful";
import { style } from "@mui/system";

function InteractivePageBuilderInterface({ link, mode }) {
  const [theme, colorMode] = useMode();
  const [buttonLink, setButtonLink] = useState();

  const [selectedValue, setSelectedValue] = useState("Blank");
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
  const [showForm, setShowForm] = useState(false);
  const [numberOfElements, setNumberOfElements] = useState(0);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const [pageCounter, setPageCounter] = useState(1);
  const [numDeletes, setNumDeletes] = useState(0);
  const [deleteIndex, setDeleteIndex] = useState(0);
  const [checked, setChecked] = useState(false);
  const [rooms, setRooms] = useState(0);
  const [checkinDate, setCheckinDate] = useState();
  const [checkoutDate, setCheckoutDate] = useState();
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [pageBackgrounds, setPageBackgrounds] = useState([
    "https://i0.wp.com/www.busiweek.com/wp-content/uploads/2018/07/5-four-seasons-resort-seychelles-WBRESAF0517.jpg?resize=1000%2C625&ssl=1",
  ]);
  const [pageBackgroundIndex, setPageBackgroundIndex] = useState();
  const [homepageHospitalityComponent, setHomepageHospitalityComponent] =
    useState([]);
  const [guests, setGuests] = useState();
  const [components, setComponents] = useState({
    "Home Page - Hospitality": [],
    "Home Page - Transport": [],
    "Home Page - Consulting": [],
    "Home Page - Real Estate": [],
  });
  const selectedTemplateComponents = components[0];

  const [formData, setFormData] = useState("");

  const [options, setOptions] = useState();

  const isSmallScreen = false;
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [labelValue, setLabelValue] = useState([]);
  const [buttonConfiguration, setButtonConfiguration] = useState(false);
  const [configuration, setConfiguration] = useState("");

  const [searchText, setSearchText] = useState("");
  const [selected, setSelected] = useState(undefined);
  const [data, setData] = useState(selected);
  const [page, setPage] = useState([
    {
      id: 1,
      fields: [{}],
    },
  ]);

  const [isEditing, setIsEditing] = useState([]);
  const [text, setText] = useState("Hello");
  const [showButtons, setShowButtons] = useState([]);
  const inputRef = useRef(null);

  const handleMouseEnter = (index) => {
    setShowButtons((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = true;
      return newValues;
    });
  };
  const handleCheckinDateChange = (date) => {
    setCheckinDate(date);
  };
  const handleCheckoutDateChange = (date) => {
    setCheckoutDate(date);
  };
  const handleRoomsChange = (room) => {
    setRooms(room);
  };
  const handleGuestsChange = (guest) => {
    setGuests(guest);
  };

  const handleMouseLeave = (index) => {
    setShowButtons((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = false;
      return newValues;
    });
  };

  const handleElementClick = (index) => {
    setIsEditing((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = true;
      return newValues;
    });
    setText(labelValue[index]);
  };

  const handleClickOutside = (index) => {
    setIsEditing((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = false;
      return newValues;
    });
  };

  const handleTextChange = (event, index) => {
    setText(event.target.value);
    setLabelValue((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = event.target.value;
      return newValues;
    });
  };

  const handleSwitch = (checked) => {
    setChecked(checked);
  };

  const citizen_id = sessionStorage.getItem("Citizen_ID");
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
    if (property === "editing") {
      setIsEditing((prevValues) => {
        const newValues = [...prevValues];
        newValues[fieldIndex] = false;
        return newValues;
      });
    }
    const newFormData = { ...formData };
    newFormData[field.name] = updatedField;
    setFormData(newFormData);
  };

  const resetConfiguration = () => {
    setFormData({});
  };
  const handlePageBreakClick = () => {
    setPageBackgroundIndex(-1);

    setPageCounter(pageCounter + 1);
    //setPageBackgrounds((prevBackgrounds) => [...prevBackgrounds, ""]);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [citizen, setCitizen] = useState();

  const handleAddField = (input_value) => {
    setConfiguration("");
    setSelected(input_value);
    const currentPage = page[0];
    const currentPageIndex = pageCounter - 1;
    console.log(currentPageIndex);
    const currentPageBackground = pageBackgrounds[currentPageIndex];
    const currentPageFields = currentPage.fields ? [...currentPage.fields] : [];
    setNumberOfElements((prevState) => prevState + 1);

    const newField = {
      type: input_value,
      name: input_value,
      editing: false,
      config: {
        label: "",
        editing: false,
        color: "#000000",
        width: "",
        height: "",
      },
    };
    currentPageFields.push(newField);
    const newPage = [{ ...currentPage, fields: currentPageFields }];
    setPage(newPage);
    console.log(currentPageFields);
    setLabelValue((prevValues) => [...prevValues, ""]);
    setIsEditing((prevValues) => [...prevValues, false]);
    if (input_value === "Page Break") {
      handlePageBreakClick();
    } else if (
      input_value === "Raised Button" ||
      input_value === "Radio Button" ||
      input_value === "Toggle Switch"
    ) {
      setConfiguration("Button");
      setShow(true);
    } else if (input_value === "Body") {
      setConfiguration("Body");
      setShow(true);
    } else if (input_value === "Label") {
      setConfiguration("Label");
      setShow(true);
    } else if (input_value === "Home Page - Hospitality") {
      const navbarField = {
        type: "Navbar - Bootstrap",
        editing: false,
        config: {
          label: "",
          editing: false,
          color: "#000000",
          width: "",
          height: "",
        },
      };

      const containerField = {
        type: "container",
      };

      const imgField = {
        type: "img",
        config: {
          label: "img/Hospitality.png",
          alt: "Logo",
          width: "50",
          height: "50",
          className: "d-inline-block align-top",
          style: `{{justifyContent: "center", alignItems: "center", display: "flex"}}`,
        },
      };
      const brField = {
        type: "br",
      };
      const labelField = {
        type: "label",
        config: {
          label: "Argort Resort",
          style: `{{justifyContent: "center", alignItems: "center", display: "flex"}}`,
        },
      };
      const navbarTogglefield = {
        type: "Navbar-Toggle",
      };
      const h3Field = {
        type: "H3",
        label: "Welcome to",
      };
      const headingField = {
        type: "Heading",
        label: "Argort Resort",
      };
      const centerComponentField = {
        type: "Center Component",
      };
      const dateCheckInField = {
        type: "Date - Check In",
      };
      const dateCheckOutField = {
        type: "Date - Check Out",
      };
      const roomsField = {
        type: "Rooms",
      };
      const guestsField = {
        type: "Guests",
      };
      const promoCodeField = {
        type: "Promo Code",
      };
      const bookButtonField = {
        type: "Book Button",
      };

      const newField2 = {
        type: "Footer",
        name: input_value,
        editing: false,
        config: {
          label: "",
          editing: false,
          color: "#000000",
          width: "",
          height: "",
        },
      };

      const background = {
        type: "Background",
      };
      currentPageFields.push(background);
      currentPageFields.push(navbarField);
      currentPageFields.push(containerField);
      currentPageFields.push(brField);
      currentPageFields.push(labelField);
      currentPageFields.push(navbarTogglefield);
      currentPageFields.push(h3Field);
      currentPageFields.push(headingField);
      currentPageFields.push(brField);
      currentPageFields.push(centerComponentField);
      currentPageFields.push(roomsField);
      currentPageFields.push(guestsField);
      currentPageFields.push(promoCodeField);
      currentPageFields.push(bookButtonField);
    } else if (
      input_value === "Sign Up Form" ||
      input_value === "Contact Us Form" ||
      input_value === "Application Form" ||
      input_value === "Home Page - Transport" ||
      input_value === "Home Page - Consulting" ||
      input_value === "Home Page - Real Estate"
    ) {
      //setShow(true);

      setConfiguration("Template");
    } else {
      setShow(true);
    }
    if (currentPageBackground !== undefined) {
      setPageBackgrounds((prevBackgrounds) => {
        const updatedBackgrounds = [...prevBackgrounds];
        updatedBackgrounds[currentPage] = currentPageBackground;
        return updatedBackgrounds;
      });
    }
  };

  const buttonComponents = [
    { name: "Raised Button", icon: <SmartButtonOutlined /> },
    { name: "Radio Button", icon: <RadioButtonChecked /> },
    { name: "Toggle Switch", icon: <ToggleOnOutlined /> },
  ];

  const textComponents = [
    { name: "Header", icon: <TitleOutlined /> },
    { name: "Body", icon: <WysiwygOutlined /> },
    { name: "Text area", icon: <CropLandscapeOutlined /> },
    { name: "Label", icon: <LabelImportantOutlined /> },
  ];

  const navbarComponent = [{ name: "Navbar", icon: <TbLayoutNavbar /> }];
  const footerComponent = [{ name: "Footer", icon: <BiDockBottom /> }];

  const multichoiceComponent = [
    { name: "Multi choice", icon: <ArrowDropDownCircleOutlined /> },
  ];

  const pageBreakComponent = [
    { name: "Page Break", icon: <AddCircleOutlineOutlined /> },
  ];
  const captchaComponent = [{ name: "Captcha", icon: <SmartToyOutlined /> }];

  const imageComponent = [
    { name: "File Upload", icon: <AddCircleOutlineOutlined /> },
    { name: "Image", icon: <AddCircleOutlineOutlined /> },
  ];
  const phoneNumberComponent = [
    { name: "Phone number", icon: <AddCircleOutlineOutlined /> },
  ];

  const formsComponent = [
    {
      name: "Sign Up Form",
      icon: <DynamicFormOutlined />,
    },
    {
      name: "Contact Us Form",
      icon: <DynamicFormOutlined />,
    },
    {
      name: "Application Form",
      icon: <DynamicFormOutlined />,
    },
  ];

  const homepageComponentDesigns = [
    {
      name: "Home Page - Hospitality",
      icon: <DynamicFormOutlined />,
    },
    {
      name: "Home Page - Transport",
      icon: <DynamicFormOutlined />,
    },
    {
      name: "Home Page - Consulting",
      icon: <DynamicFormOutlined />,
    },
    {
      name: "Home Page - Real Estate",
      icon: <DynamicFormOutlined />,
    },
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

  const filteredComponents = componentList.filter((component) =>
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
          editing: isEditing[index],
          type: field.type,
          required: field.required,
        };
        currentPage.fields.push({ props });
      }
    });

    pages.push(currentPage);

    const requests = pages.map(async (pageData, index) => {
      index += 1;
      try {
        const response = await fetch(
          `https://sssp-378808.nw.r.appspot.com/api/add-page-elements/${formValues.domain}/${index}`,
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
    });

    await Promise.all(requests);
  };

  const handleRemoveField = (index) => {
    const currentPage = page[0];
    if (!currentPage) {
      console.error(`Tab ${0} is not defined`);
      return;
    }
    const currentPageFields = [...currentPage.fields];
    console.log(currentPageFields[index]);
    currentPageFields.splice(index, 1);
    setDeleteIndex(index);
    setNumDeletes(numDeletes + 1);
    setShowButtons((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = false;
      return newValues;
    });
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
    const backgroundImage =
      "https://images.robertharding.com/preview/RF/MI/HORIZONTAL/1174-4517.jpg";
    const fieldsToRender = [];

    if (selectedValue === "Home Page") {
      fieldsToRender.push(
        <div
          key="background"
          style={{
            backgroundImage: "url(" + backgroundImage + ")",
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "0",
            width: "100%",
            height: "400px",
          }}
        >
          <h1
            style={{ color: "white", marginLeft: "20px", paddingTop: "20px" }}
          >
            Your Site Title
          </h1>
          <div style={{ textAlign: "center", alignItems: "center" }}>
            <p
              style={{
                fontSize: "60px",
                fontWeight: "bold",
                color: "white",
                marginTop: "80px",
              }}
            >
              Page Builder
            </p>
          </div>
          <a href={backgroundImage} target="_blank" rel="noopener norefferer">
            <img src={backgroundImage} alt="bkg" style={{ display: "none" }} />
          </a>
        </div>
      );

      fieldsToRender.push(
        <div
          key="content"
          style={{ width: "100%", height: "400px", backgroundColor: "white" }}
        >
          <div style={{ textAlign: "center", alignItems: "center" }}>
            <p style={{ fontSize: "35px", fontWeight: "bold" }}>
              Add Your Content
            </p>
            <p>
              Lorem ipsum dolor sit amet, saepe viderer noluisse ex sit, vel ut
              utinam appareat partiendo. Dicant consectetuer id pro. Ex nec
              autem percipit convenire, dicam omnium sensibus eos in. Ne
              forensibus appellantur eos, tantas mediocritatem at ius. Ex pro
              prima illud nominavi, ea audire temporibus neglegentur eos,
              nostrud eligendi pro in.
            </p>
          </div>
        </div>
      );
    }

    if (page) {
      page[0].fields.forEach((field, index) => {
        let formField = null;
        switch (field.type) {
          case "Sign Up Form":
            formField = (
              <div key={index}>
                <TopNav
                  style={{
                    color: field.color,
                    width: field.config.width + "px",
                    height: field.config.height + "px",
                    backgroundColor: formData.color,
                  }}
                  company={<TopNav.Anchor>ABC Grants</TopNav.Anchor>}
                />
                <br></br>
                <center>
                  <Heading>Register your details</Heading>
                  <br></br>

                  <InputField
                    input={{ type: "email" }}
                    style={{ maxWidth: "700px" }}
                  >
                    Enter First Name
                  </InputField>
                  <br></br>
                  <InputField
                    input={{ type: "email" }}
                    style={{ maxWidth: "700px" }}
                  >
                    Enter Last Name
                  </InputField>
                  <br></br>
                  <InputField
                    input={{ type: "" }}
                    style={{ maxWidth: "700px" }}
                  >
                    Enter Address Line 1
                  </InputField>
                  <br></br>
                  <InputField
                    input={{ type: "email" }}
                    style={{ maxWidth: "700px" }}
                  >
                    Enter Email Address
                  </InputField>
                  <br></br>
                  <InputField
                    input={{ type: "password" }}
                    style={{ maxWidth: "700px" }}
                  >
                    Enter a Password
                  </InputField>
                  <br></br>
                  <InputField
                    input={{ type: "password" }}
                    style={{ maxWidth: "700px" }}
                  >
                    Confirm Password
                  </InputField>
                  <br></br>
                  <Button>Submit</Button>
                </center>
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
                <br></br>
              </div>
            );
            break;

          case "Contact Us Form":
            formField = (
              <div key={index}>
                <TopNav
                  style={{
                    color: field.color,
                    width: field.config.width + "px",
                    height: field.config.height + "px",
                    backgroundColor: formData.color,
                  }}
                  company={<TopNav.Anchor>ABC Grants</TopNav.Anchor>}
                />
                <br></br>
                <center>
                  <Heading>Contact Us</Heading>

                  <img
                    style={{ maxWidth: "300px" }}
                    src="https://www.westyorks-ca.gov.uk/media/6198/contact-us-1908763_1920-copy111.png?width=794&height=227&mode=max"
                  />
                  <br></br>
                  <br></br>
                  <br></br>
                  <InputField
                    input={{ type: "email" }}
                    style={{ maxWidth: "700px" }}
                  >
                    Enter Full Name
                  </InputField>
                  <br></br>

                  <InputField
                    input={{ type: "email" }}
                    style={{ maxWidth: "700px" }}
                  >
                    Enter Email Address
                  </InputField>
                  <br></br>

                  <TextArea
                    style={{
                      maxWidth: "930px",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    Message
                  </TextArea>
                  <br></br>

                  <Button>Submit</Button>
                </center>
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
                <br></br>
              </div>
            );
            break;

          case "Application Form":
            formField = (
              <div key={index}>
                <TopNav
                  style={{
                    color: field.color,
                    width: field.config.width + "px",
                    height: field.config.height + "px",
                    backgroundColor: formData.color,
                  }}
                  company={<TopNav.Anchor>ABC Grants</TopNav.Anchor>}
                />
                <br></br>
                <center>
                  <Heading>Application Form</Heading>

                  <img
                    style={{ maxWidth: "300px" }}
                    src="https://www.westyorks-ca.gov.uk/media/6198/contact-us-1908763_1920-copy111.png?width=794&height=227&mode=max"
                  />
                  <br></br>
                  <br></br>
                  <br></br>
                  <InputField
                    input={{ type: "email" }}
                    style={{ maxWidth: "700px" }}
                  >
                    Enter Full Name
                  </InputField>
                  <br></br>

                  <InputField
                    input={{ type: "email" }}
                    style={{ maxWidth: "700px" }}
                  >
                    Enter Email Address
                  </InputField>
                  <br></br>

                  <TextArea
                    style={{
                      maxWidth: "930px",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    Message
                  </TextArea>
                  <br></br>

                  <Button>Submit</Button>
                </center>
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
                <br></br>
              </div>
            );
            break;
          case "Center Component":
            formField = (
              <div key={index}>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          label="Check in"
                          variant="outlined"
                          value={dayjs(checkinDate).format("DD-MM-YYYY")}
                          onChange={(event) =>
                            handleCheckinDateChange(
                              new Date(event.target.value)
                            )
                          }
                          sx={{
                            "& fieldset": { border: "none" },
                            input: { color: "whitesmoke" },
                            svg: { color: "whitesmoke" },
                            label: { color: "whitesmoke" },
                          }}
                          style={{
                            backgroundColor: "#242226",
                            opacity: "0.9",
                            margin: "5px",
                            borderRadius: "5px",
                          }}
                        />
                      )}
                      value={checkinDate}
                      onChange={(date) => handleCheckinDateChange(date)}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          label="Check out"
                          variant="outlined"
                          value={dayjs(checkoutDate).format("DD-MM-YYYY")}
                          onChange={(event) =>
                            handleCheckoutDateChange(
                              new Date(event.target.value)
                            )
                          }
                          sx={{
                            "& fieldset": { border: "none" },
                            input: { color: "whitesmoke" },
                            svg: { color: "whitesmoke" },
                            label: { color: "whitesmoke" },
                          }}
                          style={{
                            backgroundColor: "#242226",
                            opacity: "0.9",
                            margin: "5px",
                            borderRadius: "5px",
                          }}
                        />
                      )}
                      value={checkoutDate}
                      onChange={(date) => handleCheckoutDateChange(date)}
                    />
                  </LocalizationProvider>
                  <FormControl
                    sx={{
                      "& fieldset": { border: "none" },
                      input: { color: "whitesmoke" },
                      svg: { color: "whitesmoke" },
                      label: { color: "whitesmoke" },
                      minWidth: 120,
                    }}
                    style={{
                      backgroundColor: "#242226",
                      opacity: "0.9",
                      margin: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <InputLabel id="demo-select-small-label">Rooms</InputLabel>

                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      variant="outlined"
                      style={{ color: "whitesmoke" }}
                      value={rooms || 1}
                      onChange={(event) =>
                        handleRoomsChange(event.target.value)
                      }
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    sx={{
                      "& fieldset": { border: "none" },
                      input: { color: "whitesmoke" },
                      svg: { color: "whitesmoke" },
                      label: { color: "whitesmoke" },
                      minWidth: 120,
                    }}
                    style={{
                      backgroundColor: "#242226",
                      opacity: "0.9",
                      margin: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <InputLabel id="demo-select-small-label">Guests</InputLabel>

                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      variant="outlined"
                      style={{ color: "whitesmoke" }}
                      value={guests || 1}
                      onChange={(event) =>
                        handleGuestsChange(event.target.value)
                      }
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="Promo/Corp code"
                    variant="outlined"
                    sx={{
                      "& fieldset": { border: "none" },
                      input: { color: "whitesmoke" },
                      svg: { color: "whitesmoke" },
                      label: { color: "whitesmoke" },
                    }}
                    style={{
                      backgroundColor: "#242226",
                      opacity: "0.9",
                      margin: "5px",
                      borderRadius: "5px",
                    }}
                  />
                  <Button
                    style={{
                      backgroundColor: "whitesmoke",
                      opacity: "0.9",
                      margin: "5px",
                      borderRadius: "5px",
                      color: "black",
                      width: "100px",
                      height: "54px",
                    }}
                  >
                    Book
                  </Button>
                </div>
                <br></br>
              </div>
            );
            break;
          case "Date - Check In":
            formField = (
              <div key={index}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        label="Check out"
                        variant="outlined"
                        value={dayjs(checkoutDate).format("DD-MM-YYYY")}
                        onChange={(event) =>
                          handleCheckoutDateChange(new Date(event.target.value))
                        }
                        sx={{
                          "& fieldset": { border: "none" },
                          input: { color: "whitesmoke" },
                          svg: { color: "whitesmoke" },
                          label: { color: "whitesmoke" },
                        }}
                        style={{
                          backgroundColor: "#242226",
                          opacity: "0.9",
                          margin: "5px",
                          borderRadius: "5px",
                        }}
                      />
                    )}
                    value={checkoutDate}
                    onChange={(date) => handleCheckoutDateChange(date)}
                  />
                </LocalizationProvider>
              </div>
            );
            break;
          case "Toggle Switch":
            formField = (
              <div key={index}>
                <Switch onChange={handleSwitch} checked={checked} />

                <br />

                <br></br>
              </div>
            );
            break;
          case "Raised Button":
            formField = (
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {isEditing ? (
                  <div ref={inputRef}>
                    <input
                      autoFocus="autoFocus"
                      type="text"
                      value={text}
                      onChange={handleTextChange}
                    />
                  </div>
                ) : (
                  <div key={index}>
                    <br />
                    <Link to={buttonLink}>
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
                        {text}
                      </Button>
                    </Link>
                    {showButtons && (
                      <IoIosCreate onClick={handleElementClick} />
                    )}
                    <br></br>
                  </div>
                )}
              </div>
            );
            break;

          case "Heading":
            formField = (
              <div key={index}>
                <center>
                  {" "}
                  <Heading style={{ color: "whitesmoke", fontWeight: "bold" }}>
                    {field.label}
                  </Heading>
                </center>
              </div>
            );
            break;
          case "H3":
            formField = (
              <div key={index}>
                <center>
                  <H3 style={{ color: "whitesmoke" }}>{field.label}</H3>
                </center>
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
              <div onMouseLeave={() => handleMouseLeave(index)}>
                {isEditing[index] ? (
                  <div
                    ref={inputRef}
                    style={{
                      position: "relative",
                      display: "inline-block",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2",
                      transition: "transform 0.3s ease-in-out",
                      marginTop: "10px",
                    }}
                  >
                    <h3 style={{ padding: "10px", paddingBottom: "5px" }}>
                      Edit Button
                    </h3>
                    <label
                      htmlFor="buttontext"
                      style={{
                        color: "#888",
                        fontStyle: "italic",
                        paddingLeft: "5px",
                      }}
                    >
                      Text
                    </label>
                    <input
                      style={{
                        display: "block",
                        marginBottom: "40px",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                      }}
                      id="buttontext"
                      autoFocus="autoFocus"
                      type="text"
                      value={text}
                      onChange={(event) => handleTextChange(event, index)}
                    />
                    <button
                      style={{
                        backgroundColor: "blueviolet",
                        color: "white",
                        borderRadius: "4px",
                        display: "block",
                        position: "absolute",
                        bottom: "5px",
                        right: "10px",
                      }}
                      onClick={() => handleClickOutside(index)}
                    >
                      Save Changes
                    </button>
                    <button
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "4px",
                        display: "block",
                        position: "absolute",
                        bottom: "5px",
                        left: "10px",
                      }}
                      onClick={() => handleRemoveField(index)}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <div key={index}>
                    <br />
                    <Button
                      onMouseEnter={() => handleMouseEnter(index)}
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
                      {labelValue[index]}
                    </Button>
                    {showButtons[index] && (
                      <IoIosCreate onClick={() => handleElementClick(index)} />
                    )}
                    <br></br>
                  </div>
                )}
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
          case "br":
            formField = (
              <div key={index}>
                <br></br>
              </div>
            );
            break;

          case "img":
            formField = (
              <div key={index}>
                <img
                  src={process.env.PUBLIC_URL + "/img/Hospitality.png"}
                  alt="Logo"
                  width="50"
                  height="50"
                  className="d-inline-block align-top"
                />
              </div>
            );
            break;
          case "File Upload":
            formField = (
              <div key={index}>
                <input type="file" />
                <br></br>
              </div>
            );
            break;
          case "Label":
            formField = (
              <div onMouseLeave={() => handleMouseLeave(index)}>
                {isEditing[index] ? (
                  <div
                    ref={inputRef}
                    style={{
                      position: "relative",
                      display: "inline-block",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2",
                      transition: "transform 0.3s ease-in-out",
                      marginTop: "10px",
                    }}
                  >
                    <h3 style={{ padding: "10px", paddingBottom: "5px" }}>
                      Edit Label
                    </h3>
                    <label
                      htmlFor="labeltext"
                      style={{
                        color: "#888",
                        fontStyle: "italic",
                        paddingLeft: "5px",
                      }}
                    >
                      Text
                    </label>
                    <input
                      style={{
                        display: "block",
                        marginBottom: "40px",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                      }}
                      id="labeltext"
                      autoFocus="autoFocus"
                      type="text"
                      value={text}
                      onChange={(event) => handleTextChange(event, index)}
                    />
                    <button
                      style={{
                        backgroundColor: "blueviolet",
                        color: "white",
                        borderRadius: "4px",
                        display: "block",
                        position: "absolute",
                        bottom: "5px",
                        right: "10px",
                      }}
                      onClick={() => handleClickOutside(index)}
                    >
                      Save Changes
                    </button>
                    <button
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "4px",
                        display: "block",
                        position: "absolute",
                        bottom: "5px",
                        left: "10px",
                      }}
                      onClick={() => handleRemoveField(index)}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <div key={index}>
                    <Label
                      onMouseEnter={() => handleMouseEnter(index)}
                      input={{
                        type: "text",
                        value: field.label,
                      }}
                    >
                      {labelValue[index]}
                    </Label>
                    {showButtons[index] && (
                      <IoIosCreate onClick={() => handleElementClick(index)} />
                    )}
                    <br></br>
                  </div>
                )}
              </div>
            );
            break;
          case "Body":
            formField = (
              <div onMouseLeave={() => handleMouseLeave(index)}>
                {isEditing[index] ? (
                  <div
                    ref={inputRef}
                    style={{
                      position: "relative",
                      display: "inline-block",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2",
                      transition: "transform 0.3s ease-in-out",
                      marginTop: "10px",
                    }}
                  >
                    <h3 style={{ padding: "10px", paddingBottom: "5px" }}>
                      Edit Body
                    </h3>
                    <label
                      htmlFor="headingtext"
                      style={{
                        color: "#888",
                        fontStyle: "italic",
                        paddingLeft: "5px",
                      }}
                    >
                      Text
                    </label>
                    <input
                      style={{
                        display: "block",
                        minHeight: "80px",
                        marginBottom: "40px",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                      }}
                      id="buttontext"
                      autoFocus="autoFocus"
                      type="text"
                      value={text}
                      onChange={(event) => handleTextChange(event, index)}
                    />
                    <button
                      style={{
                        backgroundColor: "blueviolet",
                        color: "white",
                        borderRadius: "4px",
                        display: "block",
                        position: "absolute",
                        bottom: "5px",
                        right: "10px",
                      }}
                      onClick={() => handleClickOutside(index)}
                    >
                      Save Changes
                    </button>
                    <button
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "4px",
                        display: "block",
                        position: "absolute",
                        bottom: "5px",
                        left: "10px",
                      }}
                      onClick={() => handleRemoveField(index)}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <div key={index}>
                    <label
                      onMouseEnter={() => handleMouseEnter(index)}
                      input={{
                        type: "text",
                        value: field.config.label,
                      }}
                    >
                      {labelValue[index]}
                    </label>
                    {showButtons[index] && (
                      <IoIosCreate onClick={() => handleElementClick(index)} />
                    )}
                    <br></br>
                  </div>
                )}
              </div>
            );
            break;
          case "Header":
            formField = (
              <div onMouseLeave={() => handleMouseLeave(index)}>
                {isEditing[index] ? (
                  <div
                    ref={inputRef}
                    style={{
                      position: "relative",
                      display: "inline-block",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2",
                      transition: "transform 0.3s ease-in-out",
                      marginTop: "10px",
                    }}
                  >
                    <h3 style={{ padding: "10px", paddingBottom: "5px" }}>
                      Edit Heading
                    </h3>
                    <label
                      htmlFor="headingtext"
                      style={{
                        color: "#888",
                        fontStyle: "italic",
                        paddingLeft: "5px",
                      }}
                    >
                      Text
                    </label>
                    <input
                      style={{
                        display: "block",
                        marginBottom: "40px",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                      }}
                      id="headingtext"
                      autoFocus="autoFocus"
                      type="text"
                      value={text}
                      onChange={(event) => handleTextChange(event, index)}
                    />
                    <button
                      style={{
                        backgroundColor: "blueviolet",
                        color: "white",
                        borderRadius: "4px",
                        display: "block",
                        position: "absolute",
                        bottom: "5px",
                        right: "10px",
                      }}
                      onClick={() => handleClickOutside(index)}
                    >
                      Save Changes
                    </button>
                    <button
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "4px",
                        display: "block",
                        position: "absolute",
                        bottom: "5px",
                        left: "10px",
                      }}
                      onClick={() => handleRemoveField(index)}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <div key={index}>
                    <Heading
                      onMouseEnter={() => handleMouseEnter(index)}
                      size="LARGE"
                      style={{ display: "block" }}
                      input={{
                        type: "text",
                      }}
                    >
                      {labelValue[index]}
                    </Heading>
                    {showButtons[index] && (
                      <IoIosCreate onClick={() => handleElementClick(index)} />
                    )}
                    <br></br>
                  </div>
                )}
              </div>
            );
            break;
          case "Navbar":
            formField = (
              <div onMouseLeave={() => handleMouseLeave(index)}>
                {isEditing[index] ? (
                  <div
                    ref={inputRef}
                    style={{
                      position: "relative",
                      display: "inline-block",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2",
                      transition: "transform 0.3s ease-in-out",
                      marginTop: "10px",
                    }}
                  >
                    <h3 style={{ padding: "10px", paddingBottom: "5px" }}>
                      Edit Navbar
                    </h3>
                    <label
                      htmlFor="labeltext"
                      style={{
                        color: "#888",
                        fontStyle: "italic",
                        paddingLeft: "5px",
                      }}
                    >
                      Text
                    </label>
                    <input
                      style={{
                        display: "block",
                        marginBottom: "40px",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                      }}
                      id="labeltext"
                      autoFocus="autoFocus"
                      type="text"
                      value={text}
                      onChange={(event) => handleTextChange(event, index)}
                    />
                    <button
                      style={{
                        backgroundColor: "blueviolet",
                        color: "white",
                        borderRadius: "4px",
                        display: "block",
                        position: "absolute",
                        bottom: "5px",
                        right: "10px",
                      }}
                      onClick={() => handleClickOutside(index)}
                    >
                      Save Changes
                    </button>
                    <button
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "4px",
                        display: "block",
                        position: "absolute",
                        bottom: "5px",
                        left: "10px",
                      }}
                      onClick={() => handleRemoveField(index)}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <div key={index}>
                    <TopNav
                      style={{
                        color: field.color,
                        width: field.config.width + "px",
                        height: field.config.height + "px",
                        backgroundColor: formData.color,
                      }}
                      onMouseEnter={() => handleMouseEnter(index)}
                      company={
                        <TopNav.Anchor target="new">
                          {labelValue[index]}
                        </TopNav.Anchor>
                      }
                    />
                    {showButtons[index] && (
                      <IoIosCreate onClick={() => handleElementClick(index)} />
                    )}
                    <br></br>
                  </div>
                )}
              </div>
            );
            break;
          case "coming-soon":
            formField = (
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
                  width: "100%",
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
            );
            break;
          case "Navbar - Bootstrap":
            formField = (
              <div key={index}>
                <Navbar collapseOnSelect expand="lg" bg="transparent">
                  <Container>
                    <Navbar.Brand href="/">
                      <center>
                        <img
                          src={process.env.PUBLIC_URL + "/img/Hospitality.png"}
                          alt="Logo"
                          width="50"
                          height="50"
                          className="d-inline-block align-top"
                        />
                        <br></br>
                        <label
                          style={{ color: "whitesmoke", fontWeight: "bold" }}
                        >
                          Argort Resort
                        </label>
                      </center>
                      x
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                    <div
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                          <Nav.Link href="/" style={{ color: "whitesmoke" }}>
                            Home
                          </Nav.Link>
                          <Nav.Link href="/" style={{ color: "whitesmoke" }}>
                            Book
                          </Nav.Link>
                        </Nav>
                      </Navbar.Collapse>
                    </div>
                  </Container>
                </Navbar>
              </div>
            );

            break;

          case "Footer":
            formField = (
              <div onMouseLeave={() => handleMouseLeave(index)}>
                {isEditing[index] ? (
                  <div
                    ref={inputRef}
                    style={{
                      position: "relative",
                      display: "inline-block",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2",
                      transition: "transform 0.3s ease-in-out",
                      marginTop: "10px",
                    }}
                  >
                    <h3 style={{ padding: "10px", paddingBottom: "5px" }}>
                      Edit Label
                    </h3>
                    <label
                      htmlFor="labeltext"
                      style={{
                        color: "#888",
                        fontStyle: "italic",
                        paddingLeft: "5px",
                      }}
                    >
                      Text
                    </label>
                    <input
                      style={{
                        display: "block",
                        marginBottom: "40px",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                      }}
                      id="labeltext"
                      autoFocus="autoFocus"
                      type="text"
                      value={text}
                      onChange={(event) => handleTextChange(event, index)}
                    />
                    <button
                      style={{
                        backgroundColor: "blueviolet",
                        color: "white",
                        borderRadius: "4px",
                        display: "block",
                        position: "absolute",
                        bottom: "5px",
                        right: "10px",
                      }}
                      onClick={() => handleClickOutside(index)}
                    >
                      Save Changes
                    </button>
                    <button
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "4px",
                        display: "block",
                        position: "absolute",
                        bottom: "5px",
                        left: "10px",
                      }}
                      onClick={() => handleRemoveField(index)}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <div key={index}>
                    <Footer
                      licence={
                        <span onMouseEnter={() => handleMouseEnter(index)}>
                          All content is available under the{" "}
                          <styled
                            href="https://creativecommons.org/licenses/by/4.0/"
                            rel="license"
                          >
                            {labelValue[index]}
                          </styled>
                          , except where otherwise stated
                        </span>
                      }
                    />
                    {showButtons[index] && (
                      <IoIosCreate onClick={() => handleElementClick(index)} />
                    )}
                  </div>
                )}
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
          case "Background":
            setPageBackgroundIndex(0);
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
                <Divider style={{ color: "black" }}>Page Break</Divider>
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
      <div>
        <div
          style={{
            overflowWrap: "break-word",
            backgroundImage: `url(${pageBackgrounds[pageBackgroundIndex]})`,
          }}
        >
          {fieldsToRender}
        </div>
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
            <option value="blank">Blank</option>
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
            <select
              id="temp"
              value={selectedValue}
              onChange={handleChange}
              style={{ marginRight: "10px" }}
            >
              <option value="blank">Blank</option>
              <option value="blank">Blank</option>
              <option value="Home Page">Home Page</option>
            </select>
            <button
              onClick={submit}
              style={{
                borderRadius: "4px",
                backgroundColor: "#528AAE",
                color: "white",
                padding: "4px",
              }}
            >
              Publish
            </button>
            <button
              style={{
                borderRadius: "4px",
                backgroundColor: "#528AAE",
                color: "white",
                padding: "4px",
                marginLeft: "10px",
              }}
            >
              Preview
            </button>
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
          <Modal.Title>Configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              {configuration === "Body" && (
                <div>
                  <Divider>General Details</Divider>
                  <br></br>
                  <center>
                    <div>
                      <TextArea
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                        }}
                        onChange={(event) =>
                          updateData(event, "label", numberOfElements)
                        }
                        input={{
                          name: "label",
                        }}
                      >
                        Body Content
                      </TextArea>
                    </div>
                  </center>
                </div>
              )}
              {configuration === "Template" && (
                <div>
                  <Divider>General Details</Divider>
                  <br></br>
                  <center>
                    <div></div>
                  </center>
                </div>
              )}

              {configuration === "Label" && (
                <div>
                  <Divider>General Details</Divider>

                  <Label>Label Name:</Label>
                  <InputField
                    onChange={(event) =>
                      updateData(event, "label", numberOfElements)
                    }
                    input={{
                      name: "label",
                    }}
                  />
                </div>
              )}
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
            {configuration === "Button" && (
              <Form.Group className="mb-3">
                <Divider>Button Configuration</Divider>
                <br></br>
                <Select
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    maxWidth: "1200px",
                  }}
                  value={selectedValue}
                  onChange={handleChange}
                  label="Select Button Click Event"
                >
                  <option>Next Page</option>
                  <option>Previous Page</option>
                  <option>Custom Routing</option>
                  <option>Submit Contents</option>
                </Select>
                {selectedValue === "Next Page" && (
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <br></br>
                    <br></br>
                    <br></br>
                    <Label>This will navigate to page: {pageCounter + 1}</Label>
                  </div>
                )}
              </Form.Group>
            )}
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
                    style={{ float: "left", padding: "20px" }}
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
                                title="Templates"
                              >
                                <SubMenu
                                  style={{ color: "white" }}
                                  title="Homepage"
                                >
                                  {homepageComponentDesigns.map((component) => (
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

                                <SubMenu
                                  style={{ color: "white" }}
                                  title="Forms"
                                >
                                  {formsComponent.map((component) => (
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
                              </SubMenu>
                              <SubMenu
                                style={{ color: "white" }}
                                title="Button Category"
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
                              <SubMenu
                                style={{ color: "white" }}
                                title="Text Category"
                              >
                                {textComponents.map((component) => (
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
                              <SubMenu
                                style={{ color: "white" }}
                                title="Image Category"
                              >
                                {imageComponent.map((component) => (
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
                              <List style={{ color: "white" }}>
                                {navbarComponent.map((component) => (
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
                              </List>
                              <List style={{ color: "white" }}>
                                {footerComponent.map((component) => (
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
                              </List>
                              <List style={{ color: "white" }}>
                                {captchaComponent.map((component) => (
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
                              </List>

                              <List style={{ color: "white" }}>
                                {multichoiceComponent.map((component) => (
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
                              </List>
                              <List style={{ color: "white" }}>
                                {pageBreakComponent.map((component) => (
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
                              </List>
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
              {page[0].fields.length > 1 ? (
                <Container
                  style={{
                    backgroundColor: "#212529",
                    border: "none",
                    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                    borderRadius: "25px",
                    overflow: "hidden",
                    padding: "20px",
                    marginTop: "30px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                    }}
                  >
                    <RenderForm />
                  </div>
                </Container>
              ) : (
                <Container>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <Heading>Start adding elements to get started.</Heading>
                </Container>
              )}
              <Box
                style={{ height: "100%", float: "right", padding: "20px" }}
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
                          <Typography variant="h3" color={colors.primary[900]}>
                            Connect Data
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

                        <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
                          Details
                        </Typography>
                        <Item
                          title="Site Details"
                          to="/team"
                          icon={<DetailsOutlined />}
                          selected={selected}
                          setSelected={setSelected}
                        />

                        <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
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

                          <SubMenu style={{ color: "white" }} title="Data">
                            <SubMenu
                              style={{ color: "white" }}
                              title="Data"
                            ></SubMenu>
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
          </ThemeProvider>
        </ColorModeContext.Provider>
      </LoadingBox>
      <br></br>
    </div>
  );
}

export default InteractivePageBuilderInterface;
