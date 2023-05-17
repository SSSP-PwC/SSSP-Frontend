import { useEffect, useState, useRef, useMemo } from "react";
import { Divider, Switch, TextField, ThemeProvider } from "@mui/material";
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
import { TbLayoutNavbar } from "react-icons/tb";
import { BiDockBottom } from "react-icons/bi";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { IoIosCreate } from "react-icons/io"; //edit icon
import { MdOutlineLogin } from "react-icons/md";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import styled from "styled-components";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import {
  ArrowDropDownCircleOutlined,
  ArrowForwardIosOutlined,
  CropLandscapeOutlined,
  DetailsOutlined,
  DynamicFormOutlined,
  InputOutlined,
  LabelImportantOutlined,
  RadioButtonChecked,
  SmartButtonOutlined,
  SmartToyOutlined,
  TableViewOutlined,
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
import {
  withValidator,
  required,
  min,
  max,
  number,
  minLength,
  maxLength,
  email,
} from "react-constraint-validation";
import { ErrorMessage, Field, Formik } from "formik";
import { notify } from "reapop";
const TextFieldValidation = withValidator({ required, minLength, maxLength })(
  Field//validation for input field component
);
const NumberFieldValidation = withValidator(
  { required, min, max },
  { number }//validation for input field component
)(Field);
const EmailFieldValidation = withValidator({ required }, { email })(Field);//validation for input field component

function InteractivePageBuilderInterface({ link, mode }) {
  const [theme, colorMode] = useMode();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [buttonLink, setButtonLink] = useState();
  const [required, setRequired] = useState();
  const [selectedValue, setSelectedValue] = useState("Blank");
  const id = sessionStorage.getItem("Citizen_ID");
  const [show, setShow] = useState(false); //used for config modal when adding components
  const handleClose = () => setShow(false);
  const [loading, setLoading] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [title, setTitle] = useState("Upload your site icon here");
  const [label, setLabel] = useState("Click here to upload your icon");
  const [preview, setPreview] = useState();
  const [imagePopup, setImagePopup] = useState(false);
  const [sidebar, setSideBar] = useState(false);
  const [imageSource, setImageSource] = useState();
  const handleCloseImagePopup = () => setImagePopup(false);
  const [pageLink, setPageLink] = useState();
  const [showForm, setShowForm] = useState(false);
  const [numberOfElements, setNumberOfElements] = useState(0); //use as index when out of scope
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const [pageCounter, setPageCounter] = useState(1);
  const [numDeletes, setNumDeletes] = useState(0);
  const [deleteIndex, setDeleteIndex] = useState(0);
  const [checked, setChecked] = useState(false);
  const [rooms, setRooms] = useState(0);
  const [checkinDate, setCheckinDate] = useState();
  const [checkoutDate, setCheckoutDate] = useState();
  const [pageBackgrounds, setPageBackgrounds] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dataUrl, setDataUrl] = useState('');
  const [values, setValues] = useState([]);
  const [image, setImage] = useState([]);
  const [imageURL, setImageURL] = useState([]);
  const [constraintValues, setConstraintValues] = useState(
    Array(values.length).fill("")
  );
  const [homepageHospitalityComponent, setHomepageHospitalityComponent] =
    useState([]);
  const [guests, setGuests] = useState();
  const [components, setComponents] = useState({
    "Home Page - Hospitality": [],
    "Home Page - Transport": [],
  });
  const openModal = () => {
    setIsOpen(true); //config modal, opens when component is added
  };
  const closeModal = (event) => {
    event.stopPropagation();//closes config modal
    setIsOpen(false);
  };
  const [formData, setFormData] = useState("");//used to update data of fields that will be rendered
  const [options, setOptions] = useState(); //selected company
  const constraintsList = ["Required", "Min Max", "Length", "Pattern"];
  const isSmallScreen = false;
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [labelValue, setLabelValue] = useState([]); //IMPORTANT, labelvalue[index] is what will be displayed in pagebuilder mode
  const [configuration, setConfiguration] = useState("");//different config options are offered based on type of element. Config is opened when the element is added
  const [selectedValues, setSelectedValues] = useState(Array(values.length).fill(""));
  const [searchText, setSearchText] = useState("");
  const [selected, setSelected] = useState(undefined);
  const [page, setPage] = useState([ {id: 1,fields: [{}],},]);
  const [inputType, setInputType] = useState(numberOfElements);
  const [isEditing, setIsEditing] = useState([]);//this tracks whether an individual element is being added (not whether page is in edit mode)
  const [text, setText] = useState("Hello"); //temp variable used to track user input in text fields
  const [selectedOptionHeading, setSelectedOptionHeading] = useState([]); //array that stores selected heading size at each index
  const [selectedFontSize, setSelectedFontSize] = useState([]); //array that stores selected font size at each index, used for bodies
  const [componentColors, setComponentColors] = useState([]);//array that stores chosen color for components at each index
  const [componentBackgroundColors, setComponentBackgroundColors] = useState([]);//array that stores chosen background color for components at each index
  const [componentWidths, setComponentWidths] = useState([]);//array that stores chosen width in px for components at each index
  const [componentHeights, setComponentHeights] = useState([]);//array that stores chosen height in px for components at each index
  const [componentPercentages, setComponentPercentages] = useState([]);//stores horizontal position in %. 0 = flush left 100 = flush right
  const [componentPercentagesVertical, setComponentPercentagesVertical] = useState([]);//stores vertical position in %. 0 = original position 100 = bottom of page. Use -% to move component up further
  const [componentPixelsVertical, setComponentPixelsVertical] = useState([]);//stores the amount of pixels to move the component by
  const [showButtons, setShowButtons] = useState(false);//Shows editing symbols after edit page button is clicked
  const [minMaxFields, setMinMaxField] = useState(false);//user provided constraint on input fields
  const [min, setMin] = useState(0);//user provided constraint on input fields
  const [length, setLength] = useState(0);//user provided constraint on input fields
  const [errorMessage, setErrorMessage] = useState("");
  const [grandparentHeight, setGrandparentHeight] = useState(0); //contains height of the container div of pagebuilder

  const updateGrandparentHeight = () => {
    setGrandparentHeight((numberOfElements*35));//35 pixels is used as it is the average height per component
  };

  const handlePercentageChangePix = (index, value) => {
    const pixels = (grandparentHeight * value) / 100; //total estimated height of container used with percentage provided by user to determine vertical height in pixels
    const topPosition = value === 0 ? grandparentHeight - pixels: pixels;
    componentPixelsVertical[index] = topPosition;
  };
  const [max, setMax] = useState(0);
  const inputRef = useRef(null);
  const imageUploadOptions = [
    "Upload Image through File System",
    "Upload Image via URL",
  ];//used when adding an image component

  const handleEditPage = () => {
    setShowButtons(true);
  };//global variable that shows edit symbols on ALL elements
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

  const handleDoneEditing = () => {
    setShowButtons(false);
  };//stop showing editing symbols
  const onImageChange = (e) => {
    setImage((prevImage) => [...prevImage, ...e.target.files]);
  };

  const onImageURLChange = (e) => {
    setImageURL((prevImageURL) => [...prevImageURL, e.target.value]);
  };
  useEffect(() => {
    setImageURL([]);
    const newImagesURL = [];
    image.forEach((img) => newImagesURL.push(URL.createObjectURL(img)));
    setImageURL((prevImageURLs) => [...prevImageURLs, ...newImagesURL]);
    setImagePopup(true);
  }, [image]);

  useEffect(() => {
    if (selectedValues[0] === "Required") {
      setRequired(true);
    }
  });

  function NavbarEditor(props) {//displayed when edit icon of a navbar is clicked on
    const index = props.ind;
    return (
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
        <h3 style={{ padding: "10px", paddingBottom: "5px" }}>Edit Navbar</h3>
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
            paddingLeft: "5px",
            paddingRight: "5px",
          }}
          id="labeltext"
          autoFocus="autoFocus"
          type="text"
          value={text}
          onChange={(event) =>
           handleTextChange(event, index)
          }
        />
        <label
          htmlFor="buttoncolor"
          style={{
            color: "#888",
            fontStyle: "italic",
            paddingLeft: "5px",
            marginRight: "5px",
          }}
        >
          Color
        </label>
        <HexColorPicker
          style={{
            padding: "20px",
            paddingTop: "0px",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "40px",
          }}
          id="buttoncolor"
          color={formData.color}
          onChange={(newColor) => handleColorChange(index, newColor)}
        />
        <button
          style={{
            backgroundColor: "#528AAE",
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
    );
  }

  const handleElementClick = (index) => {//called when an editing icon is clicked
    setIsEditing((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = true;
      return newValues;
    });
    setText(labelValue[index]);
  };

  const handleElementClickTemplate = (templateText, index) => {//called when an editing icon is clicked on a template
    setIsEditing((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = true;
      return newValues;
    });
    setText(templateText);
  };
  const handleSelectChange = (size, index) => {//heading size selector. Within header editing popup
    setSelectedOptionHeading((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = size;
      return newValues;
    });
  };
  const handleSelectFontChange = (size, index) => {//used in body components when font size is changed
    setSelectedFontSize((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = size;
      return newValues;
    });
  };
  const handleClickOutside = (index) => {//closes editing pop up when 'save changes' button is clicked
    setIsEditing((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = false;
      return newValues;
    });
  };

  const handleTextChange = (event, index) => {//update temoporary text variable
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
    setSelectedValue(event.target?.value);
    const currentPage = page[0];
    const currentPageFields = currentPage.fields ? [...currentPage.fields] : [];
    for (let i = currentPageFields.length - 1; i >= 0; i--) {
      if (currentPageFields[i] === undefined) {
        currentPageFields.splice(i, 1); 
        setNumberOfElements((prevState) => prevState - 1);
      }//remove undefined fields to prevent index errors
    }
    for (let i = currentPageFields.length - 1; i >= 0; i--) {
      if (currentPageFields[i] && currentPageFields[i].label) {
        currentPageFields.splice(i, 1);
      }//prevents bug where labels of elements were being considered elements on their own, causing each element to add two items to the array
    }
    const field = currentPageFields[fieldIndex];
    let updatedField = { ...field };
    if (field && field.config) {
      updatedField = {
        ...field,
        config: {
          ...field.config,
          [property]: event.target?.value,
        },
      };
    } else if (field) {
      updatedField = {
        ...field,
        [property]: event.target.value,
      };
    } else {
      console.error(`Field at index ${fieldIndex} is undefined`);
    }

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
    if (property === "type") {
      setInputType((prevValues) => {
        const newValues = Array.isArray(prevValues) ? [...prevValues] : [];
        newValues[fieldIndex] = event.target.value;
        return newValues;
      });
    }

    const newFormData = { ...formData };
    if (field && field.name) {
      newFormData[field.name] = updatedField;
    }
    setFormData(newFormData);
  };

  const resetConfiguration = () => {
    setFormData({});
  };
  const handlePageBreakClick = () => {
    setPageCounter(pageCounter + 1);
  };

  const handleConstraint = (event) => {
    setConstraintValues(event.target.value);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    updateData(event.target.value?.toLowerCase());
  };

  const handleChangeData = (event) => {
    setDataUrl(event.target.value);
  };

  const handleConnect = (dataurl) => {
    const url = dataurl;

    // Make the GET request
    fetch(url)
      .then((response) => {
        console.log('Response status:', response.status);
        // Add your logic to handle the response status here
      })
      .catch((error) => {
        console.log('Error:', error);
        // Handle the error if the request fails
      });
  };

  const [citizen, setCitizen] = useState();

  const updatedData = (rowIndex, columnId, value) => {
    setTableData((prevTableData) =>
      prevTableData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...prevTableData[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const handleAddField = (input_value) => {
    setConfiguration("");
    setSelected(input_value);
    const currentPage = page[0];
    const currentPageIndex = pageCounter - 1;

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
    } else if (input_value === "Table") {
      setConfiguration("Table");
      setShow(true);
    } else if (input_value === "Body") {
      setConfiguration("Body");
      setShow(true);
    } else if (input_value === "Label") {
      setConfiguration("Label");
      setShow(true);
    } else if (input_value === "Multi choice") {
      setConfiguration("Multi choice");
      setShow(true);
    } else if (input_value === "Image") {
      setConfiguration("Image");
      setShow(true);
    } else if (input_value === "Navbar") {
      setConfiguration("Navbar");
      setShow(true);
    } else if (input_value === "Header") {
      setConfiguration("Header");
      setShow(true);
    } else if (input_value === "Label") {
      setConfiguration("Label");
      setShow(true);
    } else if (input_value === "Input Field") {
      setConfiguration("Input Field");
      setShow(true);
    } else if (input_value === "Text area") {
      setConfiguration("Text area");
      setShow(true);
    } else if (input_value === "Captcha") {
      setConfiguration("Captcha");
      setShow(true);
    } else if (input_value === "Home Page - Hospitality") {
      setPageBackgrounds((background) => [
        ...background,
        "https://i0.wp.com/www.busiweek.com/wp-content/uploads/2018/07/5-four-seasons-resort-seychelles-WBRESAF0517.jpg?resize=1000%2C625&ssl=1",
      ]);
      const navbarField = {
        type: "Navbar - Bootstrap",
        editing: false,
        label: "Argort Resort",
        config: {
          label: "Argort Resort",
          editing: false,
          src: process.env.PUBLIC_URL + "/img/Hospitality.png",
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
          label: " Resort",
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
        label: " Resort",
        color: "whitesmoke",
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
    } else if (input_value === "Sign Up Form") {
      const navbarField = {
        type: "navbar - template",
        label: "ABC Grants",
      };
      const brField = {
        type: "br",
      };

      const headingField = {
        type: "Heading",
        label: "Register your details",
        input_style: [{ color: "black" }],
      };
      const inputFirstNameField = {
        type: "Input Field",
        input_type: "text",
        label: "Enter First Name",
        parent_style: [
          { justifyContent: "center" },
          { alignItems: "center" },
          { display: "flex" },
        ],
        input_style: [{ width: "700px" }],
      };

      const inputLastNameField = {
        type: "Input Field",
        input_type: "text",
        label: "Enter Last Name",
        parent_style: [
          { justifyContent: "center" },
          { alignItems: "center" },
          { display: "flex" },
        ],
        input_style: [{ width: "700px" }],
      };
      const inputAddressLine1Field = {
        type: "Input Field",
        input_type: "text",
        label: "Enter Address Line 1",
        parent_style: [
          { justifyContent: "center" },
          { alignItems: "center" },
          { display: "flex" },
        ],
        input_style: [{ width: "700px" }],
      };
      const inputAddressLine2Field = {
        type: "Input Field",
        input_type: "text",
        label: "Enter Address Line 2",
        parent_style: [
          { justifyContent: "center" },
          { alignItems: "center" },
          { display: "flex" },
        ],
        input_style: [{ width: "700px" }],
      };
      const inputPostcodeField = {
        type: "Input Field",
        input_type: "text",
        label: "Enter Postcode",
        parent_style: [
          { justifyContent: "center" },
          { alignItems: "center" },
          { display: "flex" },
        ],
        input_style: [{ width: "700px" }],
      };
      const inputEmailField = {
        type: "Input Field",
        input_type: "email",
        label: "Enter Email Address",
        parent_style: [
          { justifyContent: "center" },
          { alignItems: "center" },
          { display: "flex" },
        ],
        input_style: [{ width: "700px" }],
      };
      const inputPasswordField = {
        type: "Input Field",
        input_type: "password",
        label: "Enter a Password",
        parent_style: [
          { justifyContent: "center" },
          { alignItems: "center" },
          { display: "flex" },
        ],
        input_style: [{ width: "700px" }],
      };
      const inputConfirmPasswordField = {
        type: "Input Field",
        input_type: "password",
        label: "Confirm Password",
        parent_style: [
          { justifyContent: "center" },
          { alignItems: "center" },
          { display: "flex" },
        ],
        input_style: [{ width: "700px" }],
      };
      const submitButton = {
        type: "Raised Button",
        label: "Submit",
        width: "100px",
        height: "100px",
        parent_style: [
          { justifyContent: "center" },
          { alignItems: "center" },
          { display: "flex" },
        ],
      };
      const footer = {
        type: "Footer",
        label: "ABC Grants",
        width: "100px",
        height: "100px",
        parent_style: [
          { justifyContent: "center" },
          { alignItems: "center" },
          { display: "flex" },
        ],
      };
      currentPageFields.push(navbarField);
      currentPageFields.push(brField);
      currentPageFields.push(headingField);
      currentPageFields.push(brField);
      currentPageFields.push(inputFirstNameField);
      currentPageFields.push(brField);
      currentPageFields.push(inputLastNameField);
      currentPageFields.push(brField);
      currentPageFields.push(inputAddressLine1Field);
      currentPageFields.push(brField);
      currentPageFields.push(inputAddressLine2Field);
      currentPageFields.push(brField);
      currentPageFields.push(inputPostcodeField);
      currentPageFields.push(brField);
      currentPageFields.push(inputEmailField);
      currentPageFields.push(brField);
      currentPageFields.push(inputPasswordField);
      currentPageFields.push(brField);
      currentPageFields.push(inputConfirmPasswordField);
      currentPageFields.push(brField);
      currentPageFields.push(submitButton);
      currentPageFields.push(brField);
      currentPageFields.push(footer);
      currentPageFields.push(brField);
    } else if (input_value === "Contact Us Form") {
      const navbarField = {
        type: "navbar - template",
        label: "ABC Grants",
      };
      const brField = {
        type: "br",
      };
      const headingField = {
        type: "Heading",
        label: "Contact Us",
        input_style: [{ color: "black" }],
      };
      const imgField = {
        type: "Image",
        src: "https://www.westyorks-ca.gov.uk/media/6198/contact-us-1908763_1920-copy111.png?width=794&height=227&mode=max",
        input_style: [{ maxWidth: "300px" }],
        parent_style: [
          { justifyContent: "center" },
          { alignItems: "center" },
          { display: "flex" },
        ],
      };
      const inputFullNameField = {
        type: "Input Field",
        input_type: "text",
        label: "Enter Full Name",
        parent_style: [
          { justifyContent: "center" },
          { alignItems: "center" },
          { display: "flex" },
        ],
        input_style: [{ width: "700px" }],
      };
      const inputEmailField = {
        type: "Input Field",
        input_type: "email",
        label: "Enter Email Address",
        parent_style: [
          { justifyContent: "center" },
          { alignItems: "center" },
          { display: "flex" },
        ],
        input_style: [{ width: "700px" }],
      };
      const inputMessageField = {
        type: "Text area",
        input_type: "text",
        label: "Message",
        input_style: [{ width: "700px" }],
        parent_style: [
          { justifyContent: "center" },
          { alignItems: "center" },
          { display: "flex" },
        ],
      };

      const submitButton = {
        type: "Raised Button",
        label: "Submit",
        width: "100px",
        height: "100px",
        parent_style: [
          { justifyContent: "center" },
          { alignItems: "center" },
          { display: "flex" },
        ],
      };
      currentPageFields.push(navbarField);
      currentPageFields.push(brField);
      currentPageFields.push(headingField);
      currentPageFields.push(brField);
      currentPageFields.push(imgField);
      currentPageFields.push(brField);
      currentPageFields.push(inputFullNameField);
      currentPageFields.push(brField);
      currentPageFields.push(inputEmailField);
      currentPageFields.push(brField);
      currentPageFields.push(inputMessageField);
      currentPageFields.push(brField);
      currentPageFields.push(submitButton);
      currentPageFields.push(brField);
    } else if (input_value === "Home Page - Transport") {
      const navbarField = {
        type: "Navbar - Bootstrap",
        editing: false,
        input_style: [{ backgroundColor: "#09004a" }],

        config: {
          label: "Y Link Travels",
          editing: false,
          width: "",
          height: "",
          src: process.env.PUBLIC_URL + "/img/Hospitality.png",
        },
      };
      const imgField = {
        type: "Image",
        src: process.env.PUBLIC_URL + "/build/img/Hospitality.png",
        config: {
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

      const centerComponentField = {
        type: "Center Component",
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
      const travellingFromField = {
        type: "Input Field",
        input_type: "text",
        label: "From Location",
        parent_style: [
          { justifyContent: "center" },
          { alignItems: "center" },
          { display: "flex" },
        ],
        input_style: [{ width: "700px" }],
      };
      const travellingToField = {
        type: "Input Field",
        input_type: "text",
        label: "To Location",
        parent_style: [
          { justifyContent: "center" },
          { alignItems: "center" },
          { display: "flex" },
        ],
        input_style: [{ width: "700px" }],
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
      const locationCheck = {
        type: "Location Check",
      };
      currentPageFields.push(background);
      currentPageFields.push(navbarField);
      currentPageFields.push(navbarTogglefield);
      currentPageFields.push(locationCheck);
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
    { name: "Input Field", icon: <InputOutlined /> },
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
  const tableComponent = [{ name: "Table", icon: <SmartToyOutlined /> }];

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
        `${process.env.REACT_APP_BACKEND_URL}/${citizen_id}`
      );
      const data = await response.json();
      setCitizen(data);
    }
    fetchCitizen();
  }, [isSmallScreen]);
  useEffect(() => {
    setLoading(true);
    const getCompanies = () => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/citizen/${id}/companies`)
        .then((response) => response.json())
        .then((data) => setOptions(data));
    };
    const getImage = () => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/`);
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
        `${process.env.REACT_APP_BACKEND_URL}/add-page-elements/${formValues.domain}/${pageCounter}`,
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
          parent_style: [{ color:componentColors[index], backgroundColor: componentBackgroundColors[index], height: componentHeights[index], width: componentWidths[index],  
            position: componentPercentages[index] !== undefined || componentPercentagesVertical[index] !== undefined  ? 'absolute' : 'static',
            left: componentPercentages[index] !== undefined ? `${componentPercentages[index]}%` : 'auto',
            top: componentPixelsVertical[index] ? `${(componentPixelsVertical[index] * numberOfElements)}px` : 'auto',}],fontSize: selectedFontSize[index],
          input_style: field.input_style,
          type: field.type,
          image_source: imageURL,
          button_link: buttonLink,
          config: field.config,
        };
        currentPage.fields.push({ props });
      }
    });

    pages.push(currentPage);

    const requests = pages.map(async (pageData, index) => {
      index += 1;
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/add-page-elements/${formValues.domain}/${index}`,
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
    currentPageFields.splice(index, 1);
    setNumberOfElements((prevState) => prevState - 1);
    labelValue.splice(index, 1);
    componentColors.splice(index, 1);
    componentBackgroundColors.splice(index, 1);
    componentWidths.splice(index, 1);
    componentHeights.splice(index, 1);
    componentPercentages.splice(index, 1);
    componentPercentagesVertical.splice(index, 1);
    componentPixelsVertical.splice(index, 1);
    setIsEditing((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = false;
      return newValues;
    });

    setDeleteIndex(index);
    for (let i = deleteIndex; i < currentPageFields.length; i++) {
      currentPageFields[i] = currentPageFields[i + 1];
    }

    for (let i = 0; i < labelValue.length; i++) {
      if (labelValue[i] === "") {
        labelValue.splice(i, 1);
      }
    }
    for (let i = componentColors.length - 1; i >= 0; i--) {
      if (componentColors[i] === undefined) {
        componentColors.splice(i, 1);
      }
    }
    for (let i = componentBackgroundColors.length - 1; i >= 0; i--) {
      if (componentBackgroundColors[i] === undefined) {
        componentBackgroundColors.splice(i, 1);
      }
    }
    for (let i = componentWidths.length - 1; i >= 0; i--) {
      if (componentWidths[i] === undefined) {
        componentWidths.splice(i, 1);
      }
    }
    for (let i = componentHeights.length - 1; i >= 0; i--) {
      if (componentHeights[i] === undefined) {
        componentHeights.splice(i, 1);
      }
    }
    for (let i = componentPercentages.length - 1; i >= 0; i--) {
      if (componentPercentages[i] === undefined) {
        componentPercentages.splice(i, 1);
      }
    }
    for (let i = componentPercentagesVertical.length - 1; i >= 0; i--) {
      if (componentPercentagesVertical[i] === undefined) {
        componentPercentagesVertical.splice(i, 1);
      }
    }
    for (let i = componentPixelsVertical.length - 1; i >= 0; i--) {
      if (componentPixelsVertical[i] === undefined) {
        componentPixelsVertical.splice(i, 1);
      }
    }
    setNumDeletes(numDeletes + 1);
    const newPages = [...page];
    newPages[0] = {
      ...currentPage,
      fields: currentPageFields,
    };
    setPage(newPages);
    setNumberOfElements(
      currentPageFields.filter((field) => field !== undefined).length
    );
    console.log(currentPageFields);
  };

  const handleRemoveTemplateField = (index) => {
    const currentPage = page[0];
    if (!currentPage) {
      console.error(`Tab ${0} is not defined`);
      return;
    }
    const currentPageFields = [...currentPage.fields];
    currentPageFields.splice(index, 1);
    setNumberOfElements((prevState) => prevState - 1);
    setDeleteIndex(index);
    for (let i = deleteIndex; i < currentPageFields.length; i++) {
      currentPageFields[i] = currentPageFields[i + 1];
    }
    setNumDeletes(numDeletes + 1);
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
  const handleColorChange = (index, newColor) => {
    const newComponentColors = [...componentColors];
    newComponentColors[index] = newColor;
    setComponentColors(newComponentColors);
  };

  const handleBackgroundColorChange = (index, newColor) => {
    const newComponentBackgroundColors = [...componentBackgroundColors];
    newComponentBackgroundColors[index] = newColor;
    setComponentBackgroundColors(newComponentBackgroundColors);
  };

  const handleWidthChange = (event, index) => {
    const newWidth = event.target.value;
    const newComponentWidths = [...componentWidths];
    newComponentWidths[index] = newWidth;
    setComponentWidths(newComponentWidths);
  };

  const handleHeightChange = (event, index) => {
    const newHeight = event.target.value;
    const newComponentHeights = [...componentHeights];
    newComponentHeights[index] = newHeight;
    setComponentHeights(newComponentHeights);
  };

  const handlePercentageChange = (newPercentage, index) => {
    const newComponentPercentages = [...componentPercentages];
    newComponentPercentages[index] = newPercentage;
    setComponentPercentages(newComponentPercentages);
  };

  const handlePercentageChangeVertical = (newPercentage, index) => {
    const newComponentPercentagesVertical = [...componentPercentagesVertical];
    newComponentPercentagesVertical[index] = newPercentage;
    setComponentPercentagesVertical(newComponentPercentagesVertical);
    updateGrandparentHeight();
    handlePercentageChangePix(index, newPercentage);
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
        if (field) {
          let formField = null;
          const parentStyle = Object.assign(
            {},
            ...(Array.isArray(field.parent_style) && field.parent_style.length
              ? field.parent_style
              : [{}])
          );

          const inputFieldStyle = Object.assign(
            {},
            ...(Array.isArray(field.input_style) && field.input_style.length
              ? field.input_style
              : [])
          );

          if (field) {
            switch (field.type) {
              case "navbar - template":
                formField = (
                  <div>
                    {isEditing[index] ? (
                      <NavbarEditor ind={index} />
                    ) : (
                      <div key={index}>
                        <TopNav
                          company={
                            <TopNav.Anchor target="new">
                              ABC Grants
                            </TopNav.Anchor>
                          }
                        />
                        {showButtons && (
                          <IoIosCreate
                            onClick={() => handleElementClick(index)}
                          />
                        )}
                        <br></br>
                      </div>
                    )}
                  </div>
                );
                break;
              case "Input Field":
                formField = (
                  <div key={index} style={{position:'relative', width: '90%'}}>
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
                            backgroundColor: "#528AAE",
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
                      <div key={index} style={{display: "inline-block"}}>
                        <Label
                          style={{position: componentPercentages[index] !== undefined || componentPercentagesVertical[index] !== undefined  ? 'absolute' : 'static',
                          left: componentPercentages[index] !== undefined ? `${componentPercentages[index]}%` : 'auto',
                          top: componentPixelsVertical[index] ? `${(componentPixelsVertical[index] * numberOfElements)}px` : 'auto',}}
                          input={{
                            type: "text",
                            value: field.label,
                          }}
                        >
                          {labelValue[index]}
                        </Label>
                        {showButtons && (
                          <IoIosCreate
                            style={{ transform: "scale(2)" }}
                            onClick={() => handleElementClick(index)}
                          />
                        )}
                      </div>
                    )}
                    <div
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      {inputType[index] === "Phone Number" ? (
                        <div>
                          <PhoneInput
                            placeholder={field.name}
                            value={phoneNumber}
                            required={required}
                            onChange={setPhoneNumber}
                          />
                          {!phoneNumber && required && (
                            <div style={{ color: "red" }}>{errorMessage}</div>
                          )}
                        </div>
                      ) : (
                        <div>
                          {!field.input && required && (
                            <div style={{ color: "red" }}>{errorMessage}</div>
                          )}
                          <InputField
                           
                            input={{
                              type: inputType[index],
                              required: required,
                              style: { ...inputFieldStyle, width: "700px" },
                              value: text,
                              onChange: (event) => {setText(event.target.value)},
                             
                            }}
                          >
                            {field.label}
                          </InputField>
                        </div>
                      )}
                      <br />
                      <br />
                      <br />
                    </div>
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
                      {showButtons && (
                        <IoIosCreate
                          style={{ transform: "scale(2)" }}
                          onClick={() => handleElementClick(index)}
                        />
                      )}
                      <br></br>

                      <center>
                        <Heading>Register your details</Heading>
                        {showButtons && (
                          <IoIosCreate
                            onClick={() => handleElementClick(index)}
                          />
                        )}
                        <br></br>

                        <InputField
                          input={{ type: "email" }}
                          style={{ maxWidth: "700px" }}
                        >
                          Enter First Name
                        </InputField>
                        {showButtons && (
                          <IoIosCreate
                            onClick={() => handleElementClick(index)}
                          />
                        )}
                        <br></br>
                        <InputField
                          input={{ type: "email" }}
                          style={{ maxWidth: "700px" }}
                        >
                          Enter Last Name
                        </InputField>
                        {showButtons && (
                          <IoIosCreate
                            onClick={() => handleElementClick(index)}
                          />
                        )}
                        <br></br>
                        <InputField
                          input={{ type: "" }}
                          style={{ maxWidth: "700px" }}
                        >
                          Enter Address Line 1
                        </InputField>
                        {showButtons && (
                          <IoIosCreate
                            onClick={() => handleElementClick(index)}
                          />
                        )}
                        <br></br>
                        <InputField
                          input={{ type: "email" }}
                          style={{ maxWidth: "700px" }}
                        >
                          Enter Email Address
                        </InputField>
                        {showButtons && (
                          <IoIosCreate
                            onClick={() => handleElementClick(index)}
                          />
                        )}
                        <br></br>
                        <InputField
                          input={{ type: "password" }}
                          style={{ maxWidth: "700px" }}
                        >
                          Enter a Password
                        </InputField>
                        {showButtons && (
                          <IoIosCreate
                            onClick={() => handleElementClick(index)}
                          />
                        )}
                        <br></br>
                        <InputField
                          input={{ type: "password" }}
                          style={{ maxWidth: "700px" }}
                        >
                          Confirm Password
                        </InputField>
                        {showButtons && (
                          <IoIosCreate
                            onClick={() => handleElementClick(index)}
                          />
                        )}
                        <br></br>
                        <Button>Submit</Button>
                        {showButtons && (
                          <IoIosCreate
                            onClick={() => handleElementClick(index)}
                          />
                        )}
                      </center>
                      <Footer
                        licence={
                          <span>
                            All content is available under the{" "}
                            <styled
                              href="https://creativecommons.org/licenses/by/4.0/"
                              rel="license"
                            >
                              {field.config.label}
                            </styled>
                            , except where otherwise stated
                            {showButtons && (
                              <IoIosCreate
                                onClick={() => handleElementClick(index)}
                              />
                            )}
                          </span>
                        }
                      />
                      <br></br>
                    </center>
                  </div>
                );
                break;

              case "Location Check":
                formField = (
                  <div key={index}>
                    <div
                      style={{
                        backgroundImage: `url("https://eu-assets.simpleview-europe.com/birmingham-meet/imageresizer/?image=%2Fdbimgs%2Ftram-victoria-square.jpg&action=MediaGalleryNew")`,
                      }}
                    >
                      <br></br>
                      <div
                        style={{
                          backgroundColor: "#09004a",
                          borderRadius: "12px",
                        }}
                      >
                        <br></br>
                        <TextField
                          label="Location From"
                          variant="outlined"
                          sx={{
                            "& fieldset": {
                              borderColor: "white",
                              color: "white",
                            },
                            input: { color: "white" },
                            svg: { color: "white" },
                            label: { color: "white" },
                            margin: "12px",
                          }}
                          style={{
                            style: { backgroundColor: "white" },
                          }}
                        />
                        <ArrowForwardIosOutlined
                          style={{ margin: "25px", color: "whitesmoke" }}
                        />

                        <TextField
                          label="Location To"
                          variant="outlined"
                          sx={{
                            "& fieldset": { border: "none" },
                            input: { color: "black" },
                            svg: { color: "black" },
                            label: { color: "black" },
                            backgroundColor: "white",
                            margin: "12px",
                          }}
                          style={{
                            style: { backgroundColor: "white" },
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
                          Plan & Buy
                        </Button>
                      </div>
                      <br></br>
                    </div>
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
                        <InputLabel id="demo-select-small-label">
                          Rooms
                        </InputLabel>

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
                        <InputLabel id="demo-select-small-label">
                          Guests
                        </InputLabel>

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
                  </div>
                );
                break;

              case "Toggle Switch":
                formField = (
                  <div style={{position:'relative', width: '90%'}}>
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
                          backgroundColor: "white",
                        }}
                      >
                        <h3 style={{ padding: "10px", paddingBottom: "5px" }}>
                          Edit Switch
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
                            backgroundColor: "#528AAE",
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
                          onClick={() => handleRemoveTemplateField(index)}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div key={index} style={{display: "inline-block"}}>
                        <Switch style={{position: componentPercentages[index] !== undefined || componentPercentagesVertical[index] !== undefined  ? 'absolute' : 'static',
                            left: componentPercentages[index] !== undefined ? `${componentPercentages[index]}%` : 'auto',
                            top: componentPixelsVertical[index] ? `${(componentPixelsVertical[index] * numberOfElements)}px` : 'auto',}} onChange={handleSwitch} checked={checked} />

                        <br />
                        {showButtons && (
                          <IoIosCreate
                            style={{ transform: "scale(2)" }}
                            onClick={() =>
                              handleElementClickTemplate(
                                labelValue[index],
                                index
                              )
                            }
                          />
                        )}
                        <br></br>
                      </div>
                    )}
                  </div>
                );
                break;

              case "Raised Button":
                formField = (
                  <div style={{position:'relative', width: '100%'}}>
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
                            paddingLeft: "5px",
                            paddingRight: "5px",
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                          id="buttontext"
                          autoFocus="autoFocus"
                          type="text"
                          value={text}
                          onChange={(event) => handleTextChange(event, index)}
                        />
                        <div>
                          <label
                            htmlFor="buttoncolor"
                            style={{
                              color: "#888",
                              fontStyle: "italic",
                              paddingLeft: "5px",
                              marginRight: "5px",
                            }}
                          >
                            Color
                          </label>
                          <HexColorPicker
                            style={{
                              padding: "20px",
                              paddingTop: "0px",
                              marginLeft: "auto",
                              marginRight: "auto",
                            }}
                            id="buttoncolor"
                            color={formData.color}
                            onChange={(newColor) =>
                              handleBackgroundColorChange(index, newColor)
                            }
                          />
                          <label
                            htmlFor="buttonwidth"
                            style={{
                              color: "#888",
                              fontStyle: "italic",
                              paddingLeft: "5px",
                            }}
                          >
                            Width (px)
                          </label>
                          <input
                            style={{
                              display: "block",
                              paddingLeft: "5px",
                              paddingRight: "5px",
                              marginLeft: "auto",
                              marginRight: "auto",
                            }}
                            id="buttonwidth"
                            type="text"
                            value={componentWidths[index]}
                            onChange={(event) =>
                              handleWidthChange(event, index)
                            }
                          />
                          <label
                            htmlFor="buttonheight"
                            style={{
                              color: "#888",
                              fontStyle: "italic",
                              paddingLeft: "5px",
                            }}
                          >
                            Height (px)
                          </label>
                          <input
                            style={{
                              display: "block",
                              paddingLeft: "5px",
                              paddingRight: "5px",

                              marginLeft: "auto",
                              marginRight: "auto",

                              marginBottom: "40px",
                            }}
                            id="buttonheight"
                            type="text"
                            value={componentHeights[index]}
                            onChange={(event) =>
                              handleHeightChange(event, index)
                            }
                          />
<label
                          htmlFor="horizontal-position"
                          style={{
                            color: "#888",
                            fontStyle: "italic",
                            paddingLeft: "5px",
                            marginRight: "5px",
                            display: 'block'
                          }}
                        >
                          X Position From Left (%)
                        </label>
                        <input
                         type="text"
                         id="horizontal-position"
                         value={componentPercentages[index]}
                         onChange={(event) =>
                          handlePercentageChange(event.target.value, index)
                        }
                       placeholder="Enter a percentage"
                         />
                         <label
                          htmlFor="vertical-position"
                          style={{
                            color: "#888",
                            fontStyle: "italic",
                            paddingLeft: "5px",
                            marginRight: "5px",
                            display: 'block'
                          }}
                        >
                          Y Position From Top (%)
                        </label>
                        <input
                         type="text"
                         id="vertical-position"
                         style={{marginBottom: '40px'}}
                         value={componentPercentagesVertical[index]}
                         onChange={(event) =>
                          handlePercentageChangeVertical(event.target.value, index)
                        }
                       placeholder="Enter a percentage"
                         />
                        </div>
                        <button
                          style={{
                            backgroundColor: "#528AAE",
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
                      <div key={index} style={{display: "inline-block", paddingBottom: componentPercentages[index] !== undefined || componentPercentagesVertical[index] !== undefined ? '50px' : '0',}}>
                        <br />

                        <Button
                          style={{width: componentWidths[index] + "px",
                          height: componentHeights[index] + "px",
                          backgroundColor: componentBackgroundColors[index],
                          position: componentPercentages[index] !== undefined || componentPercentagesVertical[index] !== undefined  ? 'absolute' : 'static',
                          left: componentPercentages[index] !== undefined ? `${componentPercentages[index]}%` : 'auto',
                          top: componentPixelsVertical[index] ? `${(componentPixelsVertical[index] * numberOfElements)}px` : 'auto',}}
                          input={{
                            type: field.type,
                            name: field.label,
                            required: field.required,
                          }}
                        >
                          {labelValue[index]}
                        </Button>
                        <br></br>
                        {showButtons && (
                          <IoIosCreate
                            style={{ transform: "scale(2)" }}
                            onClick={() => handleElementClick(index)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
                break;
              case "Image":
                formField = (
                  <div key={index} style={parentStyle}>
                    {imageURL.map((url, i) => (
                      <img key={i} src={url} width="200px" />
                    ))}
                  </div>
                );
                break;
              case "Heading":
                formField = (
                  <div>
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
                          backgroundColor: "white",
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
                            backgroundColor: "#528AAE",
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
                        {" "}
                        <Heading
                          style={{
                            color: "whitesmoke",
                            fontWeight: "bold",
                            marginBottom: "0px",
                          }}
                        >
                          {labelValue[index] !== ""
                            ? labelValue[index]
                            : labelValue[index - 1]}
                        </Heading>
                        {showButtons && (
                          <IoIosCreate
                            style={{ transform: "scale(2)", color: "white" }}
                            onClick={() =>
                              handleElementClickTemplate(
                                labelValue[index] || field.label,
                                index
                              )
                            }
                          />
                        )}
                      </div>
                    )}
                  </div>
                );

                break;
              case "Image":
                formField = (
                  <div key={index} style={parentStyle}>
                    {imageURL.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        width="700px"
                        onChange={() => {
                          setImageSource(url);
                        }}
                      />
                    ))}
                  </div>
                );
                break;
              case "Heading":
                formField = (
                  <div>
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
                          backgroundColor: "white",
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
                            backgroundColor: "#528AAE",
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
                          onClick={() => handleRemoveTemplateField(index)}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div key={index}>
                        <center>
                          <Heading>{field.label}</Heading>
                        </center>
                      </div>
                    )}
                  </div>
                );
                break;

              case "H3":
                formField = (
                  <div>
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
                          backgroundColor: "white",
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
                            backgroundColor: "#528AAE",
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
                          onClick={() => handleRemoveTemplateField(index)}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div key={index}>
                        <center>
                          <H3
                            style={{ color: "whitesmoke", marginBottom: "0px" }}
                          >
                            {" "}
                            {labelValue[index] || labelValue[index] === ""
                              ? labelValue[index]
                              : field.label}
                          </H3>
                        </center>
                        {showButtons && (
                          <IoIosCreate
                            style={{ transform: "scale(2)", color: "white" }}
                            onClick={() =>
                              handleElementClickTemplate(
                                labelValue[index] || field.label,
                                index
                              )
                            }
                          />
                        )}
                      </div>
                    )}
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
                  <div>
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
                          Edit File Upload
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
                            backgroundColor: "#528AAE",
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
                        <input type="file" />
                        <br></br>
                        {showButtons && (
                          <IoIosCreate
                            style={{ transform: "scale(2)" }}
                            onClick={() => handleElementClick(index)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
                break;
              case "Label":
                formField = (
                  <div style={{position:'relative', width: '90%'}}>
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
                        <label
                          htmlFor="horizontal-position"
                          style={{
                            color: "#888",
                            fontStyle: "italic",
                            paddingLeft: "5px",
                            marginRight: "5px",
                            display: 'block'
                          }}
                        >
                          X Position From Left (%)
                        </label>
                        <input
                         type="text"
                         id="horizontal-position"
                         value={componentPercentages[index]}
                         onChange={(event) =>
                          handlePercentageChange(event.target.value, index)
                        }
                       placeholder="Enter a percentage"
                         />
                         <label
                          htmlFor="vertical-position"
                          style={{
                            color: "#888",
                            fontStyle: "italic",
                            paddingLeft: "5px",
                            marginRight: "5px",
                            display: 'block'
                          }}
                        >
                          Y Position From Top (%)
                        </label>
                        <input
                         type="text"
                         id="vertical-position"
                         style={{marginBottom: '40px'}}
                         value={componentPercentagesVertical[index]}
                         onChange={(event) =>
                          handlePercentageChangeVertical(event.target.value, index)
                        }
                       placeholder="Enter a percentage"
                         />
                        <button
                          style={{
                            backgroundColor: "#528AAE",
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
                      <div key={index} style={{display: "inline-block", paddingBottom: componentPercentages[index] !== undefined || componentPercentagesVertical[index] !== undefined ? '50px' : '0',}}>
                        <Label
                          style={{position: componentPercentages[index] !== undefined || componentPercentagesVertical[index] !== undefined  ? 'absolute' : 'static',
                          left: componentPercentages[index] !== undefined ? `${componentPercentages[index]}%` : 'auto',
                          top: componentPixelsVertical[index] ? `${(componentPixelsVertical[index] * numberOfElements)}px` : 'auto',}}
                          input={{
                            type: "text",
                            value: field.label,
                          }}
                        >
                          {labelValue[index]}
                        </Label>
                        {showButtons && (
                          <IoIosCreate
                            style={{ transform: "scale(2)" }}
                            onClick={() => handleElementClick(index)}
                          />
                        )}
                        <br></br>
                      </div>
                    )}
                  </div>
                );
                break;

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
                  <div style={{position:'relative', width: '90%'}}>
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
                          Edit Text Area
                        </h3>
                        <label
                          htmlFor="areatext"
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
                          id="areatext"
                          autoFocus="autoFocus"
                          type="text"
                          value={text}
                          onChange={(event) => handleTextChange(event, index)}
                        />
                        <label
                            htmlFor="buttonwidth"
                            style={{
                              color: "#888",
                              fontStyle: "italic",
                              paddingLeft: "5px",
                            }}
                          >
                            Width (px)
                          </label>
                          <input
                            style={{
                              display: "block",
                              paddingLeft: "5px",
                              paddingRight: "5px",
                              marginLeft: "auto",
                              marginRight: "auto",
                            }}
                            id="buttonwidth"
                            type="text"
                            value={componentWidths[index]}
                            onChange={(event) =>
                              handleWidthChange(event, index)
                            }
                          />
                          <label
                            htmlFor="buttonheight"
                            style={{
                              color: "#888",
                              fontStyle: "italic",
                              paddingLeft: "5px",
                            }}
                          >
                            Height (px)
                          </label>
                          <input
                            style={{
                              display: "block",
                              paddingLeft: "5px",
                              paddingRight: "5px",

                              marginLeft: "auto",
                              marginRight: "auto",

                              marginBottom: "40px",
                            }}
                            id="buttonheight"
                            type="text"
                            value={componentHeights[index]}
                            onChange={(event) =>
                              handleHeightChange(event, index)
                            }
                          />
                        <label
                          htmlFor="horizontal-position"
                          style={{
                            color: "#888",
                            fontStyle: "italic",
                            paddingLeft: "5px",
                            marginRight: "5px",
                            display: 'block'
                          }}
                        >
                          X Position From Left (%)
                        </label>
                        <input
                         type="text"
                         id="horizontal-position"
                         value={componentPercentages[index]}
                         onChange={(event) =>
                          handlePercentageChange(event.target.value, index)
                        }
                       placeholder="Enter a percentage"
                         />
                         <label
                          htmlFor="vertical-position"
                          style={{
                            color: "#888",
                            fontStyle: "italic",
                            paddingLeft: "5px",
                            marginRight: "5px",
                            display: 'block'
                          }}
                        >
                          Y Position From Top (%)
                        </label>
                        <input
                         type="text"
                         id="vertical-position"
                         style={{marginBottom: '40px'}}
                         value={componentPercentagesVertical[index]}
                         onChange={(event) =>
                          handlePercentageChangeVertical(event.target.value, index)
                        }
                       placeholder="Enter a percentage"
                         />
                        <button
                          style={{
                            backgroundColor: "#528AAE",
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
                      <div
                        key={index}
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          display: "inline-block",
                        }}
                      >
                        <TextArea
                          style={{
                            width: componentWidths[index] + "px",
                            height: componentHeights[index] + "px",
                            position: componentPercentages[index] !== undefined || componentPercentagesVertical[index] !== undefined ? 'absolute' : 'static',
                            left: componentPercentages[index] !== undefined ? `${componentPercentages[index]}%` : 'auto',
                            top: componentPixelsVertical[index] ? `${componentPixelsVertical[index] * numberOfElements}px` : 'auto',
                          }}
                          input={{
                            type: field.type,
                            name: field.label,
                            required: field.required,
                            style: { ...inputFieldStyle},
                          }}
                        >
                          {field.config.label}
                        </TextArea>
                        {showButtons && (
                          <IoIosCreate
                            style={{ transform: "scale(2)" }}
                            onClick={() => handleElementClick(index)}
                          />
                        )}
                        <br />
                        <br />
                        <br />
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
              case "Body":
                formField = (
                  <div style={{position:'relative', width: '90%'}}>
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
                            paddingLeft: "5px",
                            paddingRight: "5px",
                          }}
                          id="buttontext"
                          autoFocus="autoFocus"
                          type="text"
                          value={text}
                          onChange={(event) => handleTextChange(event, index)}
                        />
                        <label
                                htmlFor="fontsize"
                                style={{
                                  color: "#888",
                                  fontStyle: "italic",
                                  paddingLeft: "5px",
                                  marginRight: "5px",
                                  marginBottom: "40px",
                                }}
                              >
                                Font Size
                              </label>
                              <select
                               id="fontsize"
                               value={selectedFontSize[index]}
                               onChange={(event) => handleSelectFontChange(event.target.value, index)}
                              >
                               <option value="20px">20 px</option>
                               <option value="30px">30 px</option>
                               <option value="40px">40 px</option>
                              </select>
                        <label
                          htmlFor="horizontal-position"
                          style={{
                            color: "#888",
                            fontStyle: "italic",
                            paddingLeft: "5px",
                            marginRight: "5px",
                            display: 'block'
                          }}
                        >
                          X Position From Left (%)
                        </label>
                        <input
                         type="text"
                         id="horizontal-position"
                         value={componentPercentages[index]}
                         onChange={(event) =>
                          handlePercentageChange(event.target.value, index)
                        }
                       placeholder="Enter a percentage"
                         />
                         <label
                          htmlFor="vertical-position"
                          style={{
                            color: "#888",
                            fontStyle: "italic",
                            paddingLeft: "5px",
                            marginRight: "5px",
                            display: 'block'
                          }}
                        >
                          Y Position From Top (%)
                        </label>
                        <input
                         type="text"
                         id="vertical-position"
                         style={{marginBottom: '40px'}}
                         value={componentPercentagesVertical[index]}
                         onChange={(event) =>
                          handlePercentageChangeVertical(event.target.value, index)
                        }
                       placeholder="Enter a percentage"
                         />
                        <button
                          style={{
                            backgroundColor: "#528AAE",
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
                      <div key={index} style={{display: "inline-block"}}>
                        <label
                          style={{ position: componentPercentages[index] !== undefined || componentPercentagesVertical[index] !== undefined  ? 'absolute' : 'static',
                          left: componentPercentages[index] !== undefined ? `${componentPercentages[index]}%` : 'auto',
                          fontSize: selectedFontSize[index],
                          top: componentPixelsVertical[index] ? `${(componentPixelsVertical[index] * numberOfElements)}px` : 'auto', }}
                          input={{
                            type: "text",
                            value: field.config.label,
                          }}
                        >
                          {labelValue[index]}
                        </label>
                        <br></br>
                        {showButtons && (
                          <IoIosCreate
                            style={{ transform: "scale(2)" }}
                            onClick={() => handleElementClick(index)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
                break;
              case "Header":
                formField = (
                  <div style={{position:'relative', width: '90%'}}>
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
                            paddingLeft: "5px",
                            paddingRight: "5px",
                          }}
                          id="headingtext"
                          autoFocus="autoFocus"
                          type="text"
                          value={text}
                          onChange={(event) => handleTextChange(event, index)}
                        />
                        <label
                          htmlFor="headingcolor"
                          style={{
                            color: "#888",
                            fontStyle: "italic",
                            paddingLeft: "5px",
                            marginRight: "5px",
                          }}
                        >
                          Color
                        </label>
                        <HexColorPicker
                          style={{ padding: "20px", paddingTop: "0px" }}
                          id="headingcolor"
                          color={formData.color}
                          onChange={(newColor) =>
                            handleColorChange(index, newColor)
                          }
                        />
                        <label
                          htmlFor="headingsize"
                          style={{
                            color: "#888",
                            fontStyle: "italic",
                            paddingLeft: "5px",
                            marginRight: "5px",
                          }}
                        >
                          Size
                        </label>
                        <select
                          id="headingsize"
                          value={selectedOptionHeading[index]}
                          onChange={(event) =>
                            handleSelectChange(event.target.value, index)
                          }
                        >
                          <option value="SMALL">Small</option>
                          <option value="MEDIUM">Medium</option>
                          <option value="LARGE">Large</option>
                        </select>
                        <label
                          htmlFor="horizontal-position"
                          style={{
                            color: "#888",
                            fontStyle: "italic",
                            paddingLeft: "5px",
                            marginRight: "5px",
                            display: 'block'
                          }}
                        >
                          X Position From Left (%)
                        </label>
                        <input
                         type="text"
                         id="horizontal-position"
                         value={componentPercentages[index]}
                         onChange={(event) =>
                          handlePercentageChange(event.target.value, index)
                        }
                       placeholder="Enter a percentage"
                         />
                         <label
                          htmlFor="vertical-position"
                          style={{
                            color: "#888",
                            fontStyle: "italic",
                            paddingLeft: "5px",
                            marginRight: "5px",
                            display: 'block'
                          }}
                        >
                          Y Position From Top (%)
                        </label>
                        <input
                         type="text"
                         id="vertical-position"
                         style={{marginBottom: '40px'}}
                         value={componentPercentagesVertical[index]}
                         onChange={(event) =>
                          handlePercentageChangeVertical(event.target.value, index)
                        }
                       placeholder="Enter a percentage"
                         />
                        <button
                          style={{
                            backgroundColor: "#528AAE",
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
                      <div key={index} style={{display: "inline-block", backgroundColor: 'white', paddingBottom: componentPercentages[index] !== undefined || componentPercentagesVertical[index] !== undefined ? '50px' : '0',}}>
                        <Heading
                          size={selectedOptionHeading[index]}
                          style={{
                            marginBottom: '40px',
                            display: 'block',
                            color: componentColors[index],
                            position: componentPercentages[index] !== undefined || componentPercentagesVertical[index] !== undefined  ? 'absolute' : 'static',
                            left: componentPercentages[index] !== undefined ? `${componentPercentages[index]}%` : 'auto',
                            top: componentPixelsVertical[index] ? `${(componentPixelsVertical[index] * numberOfElements)}px` : 'auto',
                          }}
                          input={{
                            type: "text",
                          }}
                        >
                          {labelValue[index]}
                        </Heading>
                        {showButtons && (
                          <IoIosCreate
                            style={{ transform: "scale(2)" }}
                            onClick={() => handleElementClick(index)}
                          /> 
                        )}
                        <br></br>
                      </div>
                    )}
                  </div>
                );
                break;
              case "Radio Button":
                formField = (
                  <div style={{position:'relative', width: '90%'}}>
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
                            backgroundColor: "#528AAE",
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
                      <div key={index} style={{display: "inline-block"}}>
                        <Radio
                          style={{
                            width: field.config.width + "px",
                            height: field.config.height + "px",
                            position: componentPercentages[index] !== undefined || componentPercentagesVertical[index] !== undefined  ? 'absolute' : 'static',
                            left: componentPercentages[index] !== undefined ? `${componentPercentages[index]}%` : 'auto',
                            top: componentPixelsVertical[index] ? `${(componentPixelsVertical[index] * numberOfElements)}px` : 'auto',
                          }}
                        >
                          {field.config.label}
                        </Radio>
                        <br />
                        {showButtons && (
                          <IoIosCreate     
                          style={{ transform: "scale(2)" }}
                            onClick={() => handleElementClick(index)}
                          />
                        )}
                        <br></br>
                      </div>
                    )}
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
              case "Navbar":
                formField = (
                  <div>
                    {isEditing[index] ? (
                      <NavbarEditor ind={index} />
                    ) : (
                      <div key={index}>
                        <TopNav
                          style={{
                            width: field.config.width + "px",
                            height: field.config.height + "px",
                          }}
                          company={
                            <TopNav.Anchor
                              style={{
                                fontSize: "22px",
                                color: componentColors[index],
                              }}
                            >
                              {labelValue[index]}
                            </TopNav.Anchor>
                          }
                        />
                        {showButtons && (
                          <IoIosCreate
                            style={{ transform: "scale(2)" }}
                            onClick={() => handleElementClick(index)}
                          />
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
                    <Navbar
                      collapseOnSelect
                      expand="lg"
                      style={inputFieldStyle}
                    >
                      <Container>
                        <Navbar.Brand href="/">
                          <center>
                            <img
                              src={field.config.src}
                              alt="Logo"
                              width="50"
                              height="50"
                              className="d-inline-block align-top"
                            />
                            <br></br>
                            <label
                              style={{
                                color: "whitesmoke",
                                fontWeight: "bold",
                              }}
                            >
                              {field.config.label}
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
                              <Nav.Link
                                href="/"
                                style={{ color: "whitesmoke" }}
                              >
                                Home
                              </Nav.Link>
                              <Nav.Link
                                href="/"
                                style={{ color: "whitesmoke" }}
                              >
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
                  <div>
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
                            backgroundColor: "#528AAE",
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
                            <span>
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
                        {showButtons && (
                          <IoIosCreate
                            style={{ transform: "scale(2)" }}
                            onClick={() => handleElementClick(index)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
                break;
                case "Multi choice":
                  formField = (
                    <div style={{position:'relative', width: '90%'}}>
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
                            Edit Multi-Choice
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
                          <label
                            htmlFor="horizontal-position"
                            style={{
                              color: "#888",
                              fontStyle: "italic",
                              paddingLeft: "5px",
                              marginRight: "5px",
                              display: 'block'
                            }}
                          >
                            X Position From Left (%)
                          </label>
                          <input
                           type="text"
                           id="horizontal-position"
                           value={componentPercentages[index]}
                           onChange={(event) =>
                            handlePercentageChange(event.target.value, index)
                          }
                         placeholder="Enter a percentage"
                           />
                           <label
                            htmlFor="vertical-position"
                            style={{
                              color: "#888",
                              fontStyle: "italic",
                              paddingLeft: "5px",
                              marginRight: "5px",
                              display: 'block'
                            }}
                          >
                            Y Position From Top (%)
                          </label>
                          <input
                           type="text"
                           id="vertical-position"
                           style={{marginBottom: '40px'}}
                           value={componentPercentagesVertical[index]}
                           onChange={(event) =>
                            handlePercentageChangeVertical(event.target.value, index)
                          }
                         placeholder="Enter a percentage"
                           />
                          <button
                            style={{
                              backgroundColor: "#528AAE",
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
                    <Select
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        maxWidth: "1200px",
                        position: componentPercentages[index] !== undefined || componentPercentagesVertical[index] !== undefined  ? 'absolute' : 'static',
                            left: componentPercentages[index] !== undefined ? `${componentPercentages[index]}%` : 'auto',
                            top: componentPixelsVertical[index] ? `${(componentPixelsVertical[index] * numberOfElements)}px` : 'auto',
                      }}
                      value={selectedValue}
                      onClick={handleChange}
                      label="Select Button Click Event"
                    >
                      {values.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                          <br />
                          {showButtons && (
                            <IoIosCreate
                            style={{ transform: "scale(2)" }}
                              onClick={() => handleElementClick(index)}
                            />
                          )}
                          <br></br>
                        </div>
                      )}
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
                      //onChange={(e) => {setPhoneNumber(e)}}
                    />
                    <br></br>
                  </div>
                );
                break;
              case "Page Break":
                formField = (
                  <div key={index} onClick={handlePageBreakClick}>
                    <Divider style={{ backgroundColor: "black" }}></Divider>
                    <br></br>
                  </div>
                );
                break;

              case "Captcha":
                formField = (
                  <div key={index} style={{position:'relative', width: '90%'}}>
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
                        <label
                          htmlFor="horizontal-position"
                          style={{
                            color: "#888",
                            fontStyle: "italic",
                            paddingLeft: "5px",
                            marginRight: "5px",
                            display: 'block'
                          }}
                        >
                          X Position From Left (%)
                        </label>
                        <input
                         type="text"
                         id="horizontal-position"
                         value={componentPercentages[index]}
                         onChange={(event) =>
                          handlePercentageChange(event.target.value, index)
                        }
                       placeholder="Enter a percentage"
                         />
                         <label
                          htmlFor="vertical-position"
                          style={{
                            color: "#888",
                            fontStyle: "italic",
                            paddingLeft: "5px",
                            marginRight: "5px",
                            display: 'block'
                          }}
                        >
                          Y Position From Top (%)
                        </label>
                        <input
                         type="text"
                         id="vertical-position"
                         style={{marginBottom: '40px'}}
                         value={componentPercentagesVertical[index]}
                         onChange={(event) =>
                          handlePercentageChangeVertical(event.target.value, index)
                        }
                       placeholder="Enter a percentage"
                         />
                        <button
                          style={{
                            backgroundColor: "#528AAE",
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
                          style={{position: componentPercentages[index] !== undefined || componentPercentagesVertical[index] !== undefined  ? 'absolute' : 'static',
                          left: componentPercentages[index] !== undefined ? `${componentPercentages[index]}%` : 'auto',
                          top: componentPixelsVertical[index] ? `${(componentPixelsVertical[index] * numberOfElements)}px` : 'auto',}}
                          input={{
                            type: "text",
                            value: field.label,
                          }}
                        >
                          {labelValue[index]}
                        </Label>
                        {showButtons && (
                          <IoIosCreate
                            style={{ transform: "scale(2)" }}
                            onClick={() => handleElementClick(index)}
                          />
                        )}
                      </div>
                    )}
                    <br></br>
                    <center>
                      <ReCAPTCHA
                        sitekey={"6LeiNAclAAAAAImMXqIfk2YOFJF99SD6UVUAqyvd"}
                      />
                    </center>
                    <br></br>
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
          }
        }
      });
    }
    return (
      <div>
        <div
          style={{
            overflowWrap: "break-word",
            background: `url(${pageBackgrounds})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
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
              {configuration === "Image" && (
                <div>
                  <Divider>Image Details</Divider>
                  <br></br>
                  <center>
                    <Label>How would you like to upload the image?</Label>

                    <Select
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        maxWidth: "1200px",
                      }}
                      value={selectedValue}
                      onClick={handleChange}
                    >
                      {imageUploadOptions.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>

                    {selectedValue === imageUploadOptions[0] && (
                      <div>
                        <br></br>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={onImageChange}
                        />

                        {imageURL.length > 0 && (
                          <Modal
                            show={imagePopup}
                            onHide={handleCloseImagePopup}
                          >
                            <br></br>
                            <center>
                              {" "}
                              <label>Image Preview</label>
                            </center>
                            <Modal.Header
                              closeButton
                              onClick={resetConfiguration}
                            >
                              <Modal.Body>
                                <center>
                                  {imageURL.map((imageSrc, index) => (
                                    <img
                                      key={index}
                                      src={imageSrc}
                                      width="200px"
                                    />
                                  ))}
                                </center>
                              </Modal.Body>
                            </Modal.Header>
                          </Modal>
                        )}
                      </div>
                    )}
                    {selectedValue === imageUploadOptions[1] && (
                      <div>
                        <Label>Please provide the image address</Label>
                        <InputField
                          value={imageURL}
                          onChange={onImageURLChange}
                          input={{
                            required: true,
                          }}
                        ></InputField>
                      </div>
                    )}
                  </center>
                </div>
              )}
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
                          wordBreak: "break-word",
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
              {configuration === "Navbar" && (
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
              {configuration === "Header" && (
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
              {configuration === "Text area" && (
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
              {configuration === "Input Field" && (
                <div>
                  <Divider>General Details</Divider>
                  <Label style={{ fontWeight: "bold" }}>Label Name:</Label>
                  <InputField
                    onChange={(event) =>
                      updateData(event, "label", numberOfElements)
                    }
                    input={{
                      name: "label",
                    }}
                  />
                  <br />

                  <Form.Group className="mb-3">
                    <Divider>Field Details</Divider>
                    <Label style={{ fontWeight: "bold" }}>
                      What is the expected input type?
                    </Label>

                    <Select
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                      value={selectedValue}
                      onClick={(event) =>
                        updateData(event, "type", numberOfElements)
                      }
                    >
                      <option value="Email">Email</option>
                      <option value="Phone Number">Phone Number</option>
                      <option value="Text">Text</option>
                      <option value="Number">Number</option>
                      <option value="URL">URL</option>
                    </Select>
                    <br />
                    <Divider>{selectedValue} Contraints</Divider>

                    {values.map((option, index) => (
                      <div key={index}>
                        <Label style={{ fontWeight: "bold" }}>
                          Constraint {index + 1}:
                        </Label>
                        <Select
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                          }}
                          value={selectedValues[index]}
                          onClick={(event) => {
                            const updatedValues = [...selectedValues];
                            updatedValues[index] = event.target.value;
                            setSelectedValues(updatedValues);
                          }}
                        >
                          {constraintsList.map((option, index) => (
                            <option
                              key={index}
                              value={option}
                              style={{
                                padding: "5px",
                                border: "1px solid #ccc",
                              }}
                            >
                              {option}
                            </option>
                          ))}
                        </Select>

                        {selectedValues[index] === "Min Max" && (
                          <div>
                            <br />
                            <Divider>Min Max Constraint</Divider>
                            <br />
                            <Label
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              Please specify the mimimum and maximum amount of
                              characters for the field selected.
                            </Label>
                            <br />
                            <div style={{ maxWidth: "100px", float: "left" }}>
                              <Label style={{ fontWeight: "bold" }}>
                                <center>Minimum</center>
                              </Label>

                              <InputField
                                onChange={(e) => setMin(e.target.value)}
                              ></InputField>
                            </div>
                            <div style={{ maxWidth: "100px", float: "right" }}>
                              <Label style={{ fontWeight: "bold" }}>
                                <center>Maximum</center>
                              </Label>

                              <InputField
                                onChange={(e) => setMax(e.target.value)}
                              ></InputField>
                            </div>

                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <Label
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              Please specify the error message you would like
                              displayed.
                            </Label>

                            <Label style={{ fontWeight: "bold" }}>
                              <center>Error Message</center>
                            </Label>
                            <TextArea
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              onChange={(e) => setMin(e.target.value)}
                            ></TextArea>
                            <br />
                            <Divider>Constraints</Divider>
                          </div>
                        )}

                        {selectedValues[index] === "Required" && (
                          <div>
                            <br />
                            <Divider>Required Constraint</Divider>
                            <Label>
                              Please specify the error message you would like
                              displayed.
                            </Label>
                            <center>
                              <Label style={{ fontWeight: "bold" }}>
                                Error Message
                              </Label>
                              <TextArea
                                style={{
                                  justifyContent: "center",
                                  alignItems: "center",
                                  display: "flex",
                                }}
                                onChange={(e) =>
                                  setErrorMessage(e.target.value)
                                }
                              ></TextArea>
                              <br />
                            </center>
                          </div>
                        )}

                        {selectedValues[index] === "Length" && (
                          <div>
                            <br />
                            <Divider>Length Constraint</Divider>
                            <center>
                              <Label>
                                Please specify the maximum length for this
                                field.
                              </Label>
                              <Label style={{ fontWeight: "bold" }}>
                                Length
                              </Label>
                              <InputField
                                style={{ maxWidth: "200px" }}
                                onChange={(e) => setLength(e.target.value)}
                              ></InputField>
                              <br></br>
                              <Label>
                                Please specify the error message you would like
                                displayed.
                              </Label>
                              <Label style={{ fontWeight: "bold" }}>
                                Error Message
                              </Label>
                              <TextArea
                                style={{
                                  justifyContent: "center",
                                  alignItems: "center",
                                  display: "flex",
                                }}
                                onChange={(e) =>
                                  setErrorMessage(e.target.value)
                                }
                              ></TextArea>
                              <br />
                            </center>
                          </div>
                        )}
                      </div>
                    ))}
                    <br></br>
                    <Form.Group
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <br />
                      <br />
                      <br />
                      <br /> <br />
                      <Button
                        type="button"
                        onClick={() => {
                          setValues((prevValues) => [...prevValues, ""]);
                          setSelectedValues((prevValues) => [
                            ...prevValues,
                            "",
                          ]);
                        }}
                      >
                        Add Constraint
                      </Button>
                    </Form.Group>
                  </Form.Group>
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
              {configuration === "Captcha" && (
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
              {configuration === "Template" && (
                <div>
                  <Divider>General Details</Divider>
                  <br></br>
                  <center>
                    <div></div>
                  </center>
                </div>
              )}
            </Form.Group>

            {configuration === "Navbar" && (
              <div>
                <Divider>Component Adjustments</Divider>
                <br></br>
                <center>
                  <Label>Label Colour:</Label>

                  <HexColorPicker
                    style={{ padding: "20px", paddingTop: "0px" }}
                    color={formData.color}
                    onChange={(newColor) =>
                      handleColorChange(numberOfElements, newColor)
                    }
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
              </div>
            )}
            {configuration === "Button" && (
              <Form.Group className="mb-3">
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
                <br></br>
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
                  onClick={handleChange}
                  label="Select Button Click Event"
                >
                  <option
                    value="Next Page"
                    onClick={() => {
                      setButtonLink("Next Page");
                    }}
                  >
                    Next Page
                  </option>
                  <option
                    value="Previous Page"
                    onClick={() => {
                      setButtonLink("Previous Page");
                    }}
                  >
                    Previous Page
                  </option>
                  <option
                    value="Custom Routing"
                    onClick={() => {
                      setButtonLink("Custom Routing");
                    }}
                  >
                    Custom Routing
                  </option>
                  <option
                    value="Submit Contents"
                    onClick={() => {
                      setButtonLink("Submit Contents");
                    }}
                  >
                    Submit Contents
                  </option>
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
                    <br></br>
                    <br></br>
                    <br></br>
                  </div>
                )}
                {selectedValue === "Previous Page" && (
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
                    <Label>This will navigate to page: {pageCounter - 1}</Label>
                  </div>
                )}
              </Form.Group>
            )}

            {configuration === "Multi choice" && (
              <Form.Group className="mb-3">
                <Divider>Multi choice Configuration</Divider>
                <br />
                {values.map((option, index) => (
                  <div key={index}>
                    <Label>Option {index + 1}:</Label>
                    <InputField
                      value={option}
                      onChange={(event) => {
                        const newValues = [...values];
                        newValues[index] = event.target.value;
                        setValues(newValues);
                      }}
                      input={{
                        name: `option-${index}`,
                      }}
                    />
                  </div>
                ))}
                <Form.Group className="mb-3">
                  <Label>Add option:</Label>
                  <Button
                    type="button"
                    onClick={() => {
                      setValues((prevValues) => [...prevValues, ""]);
                    }}
                  >
                    Add Option
                  </Button>
                </Form.Group>
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
              style={{
                display: "flex",
                position: "relative",
                textAlign: "center",
              }}
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
                                  {homepageComponentDesigns.map(
                                    (component, index) => (
                                      <ListItem
                                        button
                                        key={index}
                                        selected={selected === component.name}
                                        onClick={() =>
                                          handleAddField(component.name)
                                        }
                                      >
                                        <ListItemIcon
                                          style={{ color: "white" }}
                                        >
                                          {component.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                          primary={component.name}
                                        />
                                      </ListItem>
                                    )
                                  )}
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
                                {buttonComponents.map((component, index) => (
                                  <ListItem
                                    button
                                    key={index}
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
                                {textComponents.map((component, index) => (
                                  <ListItem
                                    button
                                    key={index}
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
                                {imageComponent.map((component, index) => (
                                  <ListItem
                                    button
                                    key={index}
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
                                {navbarComponent.map((component, index) => (
                                  <ListItem
                                    button
                                    key={index}
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
                                {footerComponent.map((component, index) => (
                                  <ListItem
                                    button
                                    key={index}
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
                                <SubMenu
                                  style={{ color: "white" }}
                                  title="Table"
                                >
                                  <ListItem button>
                                    <ListItemIcon style={{ color: "white" }}>
                                      <TableViewOutlined />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={"Add Table"}
                                      button
                                      key={"Table"}
                                      selected={selected === "Table"}
                                      onClick={() => handleAddField("Table")}
                                    />
                                  </ListItem>
                                </SubMenu>
                              </List>
                              <List style={{ color: "white" }}>
                                {captchaComponent.map((component, index) => (
                                  <ListItem
                                    key={index}
                                    button
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
                                {multichoiceComponent.map(
                                  (component, index) => (
                                    <ListItem
                                      key={index}
                                      button
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
                                  )
                                )}
                              </List>
                              <List style={{ color: "white" }}>
                                {pageBreakComponent.map((component, index) => (
                                  <ListItem
                                    key={index}
                                    button
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
                              <SubMenu style={{ color: "white" }} title="">
                                {filteredComponents.map((component, index) => (
                                  <ListItem
                                    key={index}
                                    button
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
      position: "relative", // Add position relative to the container
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
                        <div onClick={openModal} style={{marginBottom: '20px', marginLeft: '30px', cursor: 'pointer' }}>
                        <AddCircleOutlineOutlined/> New Data Connector
                        {isOpen && 
                        <div>
                          <label htmlFor="dataUrl" style={{ color: 'white', marginTop: '10px' }}>
                         Data URL:
                         </label>
                         <input
            id="dataUrl"
            style={{ marginTop: '5px' }}
            autoFocus
            value={dataUrl}
            onChange={handleChangeData}
          />
                          <button
                          onClick={(event) => {
                            closeModal(event);
                            handleConnect();
                          }}
              style={{
                borderRadius: "4px",
                backgroundColor: "#528AAE",
                color: "white",
                padding: "4px",
                marginTop: "10px",
              }}
            >
              Connect
            </button>
                        </div>
                        }
                        </div>
                        <div style={{ margin: "20px" }}>
                          <SubMenu style={{ color: "white" }} title="Data">
                            
                          </SubMenu>
                        </div>
                      </Box>
                    )}

                    {isCollapsed && mode !== "Site Home" && (
                      <Box>
                        <div style={{ margin: "20px" }}>
                          <SubMenu style={{ color: "white" }} title="HHH">
                            {filteredComponents.map((component, index) => (
                              <ListItem
                                key={index}
                                button
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
                {showButtons ? (
                  <button
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      fontSize: "24px",
                      padding: "12px",
                      marginTop: "20px",
                      border: "none",
                      borderRadius: "4px",
                    }}
                    onClick={() => handleDoneEditing()}
                  >
                    Done Editing
                  </button>
                ) : (
                  <button
                    style={{
                      backgroundColor: "#528AAE",
                      color: "white",
                      fontSize: "24px",
                      padding: "12px",
                      marginTop: "20px",
                      border: "none",
                      borderRadius: "4px",
                    }}
                    onClick={() => handleEditPage()}
                  >
                    Edit Page
                  </button>
                )}
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
