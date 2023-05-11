import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Divider, TextField } from "@mui/material";
import {
  Button,
  Checkbox,
  Heading,
  InputField,
  TextArea,
  FileUpload,
  Label,
  TopNav,
  MultiChoice,
  Link,
  H3,
  LoadingBox,
  Footer,
  Panel,
} from "govuk-react";
import Select from "@mui/material/Select";
import dayjs from "dayjs";

import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import ReCAPTCHA from "react-google-recaptcha";
import { MainHeading } from "../../../globalStyles";
import { NavbarComponent } from "../../Navbar/NavbarComponent";
import { Container, Nav, Navbar } from "react-bootstrap";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { ArrowForwardIosOutlined } from "@mui/icons-material";
import Banner from "../../../Banner.png";

function DynamicPage() {
  const { pageId, endpoint } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [numberOfElements, setNumberOfElements] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numPages, setNumPages] = useState(1);
  const [buttonIndex, setButtonIndex] = useState(0);
  const [fileData, setFileData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [formData, setFormData] = useState({});
  const [rooms, setRooms] = useState(0);
  const [checkinDate, setCheckinDate] = useState();
  const [checkoutDate, setCheckoutDate] = useState();
  const [guests, setGuests] = useState();

  const { state: locationState } = useLocation();
  const prevData = locationState?.data || {};

  console.log(prevData);
  console.log(rooms);

  const updateData = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
    console.log(formData);
  };

  useEffect(() => {
    fetchData();
  }, []);
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
  async function fetchData() {
    setLoading(true);
    const response = await fetch(
      `https://sssp-378808.nw.r.appspot.com/api/portals/${endpoint}/pages/${pageId}`
    );
    const info = await response.json();
    console.log(info);
    setData(info.fields);
    setLoading(false);
  }

  const nextPage = (event) => {
    event.preventDefault();
    const nextPageId = parseInt(pageId, 10) + 1;
    navigate(`/digital-services/portal/${endpoint}/pages/${nextPageId}`, {
      state: {
        data: { ...prevData, ...formData },
      },
    });
    window.location.reload();
  };

  const previousPage = (event) => {
    event.preventDefault();
    const nextPageId = parseInt(pageId, 10) - 1;
    navigate(`/${endpoint}/pages/${nextPageId}`, {
      state: {
        data: { ...prevData, ...formData },
      },
    });
    window.location.reload();
  };

  const submit = (event) => {
    event.preventDefault();

    const nextPageId = parseInt(pageId, 10) - 1;
    alert(formData);
  };

  const renderForm = () => {
    const fieldsToRender = [];
    let formField = null;

    console.log(data);
    data &&
      data.map((field, index) => {
        const inputFieldStyle = Object.assign(
          {},
          ...(Array.isArray(field.config.input_style) &&
          field.config.input_style.length
            ? field.config.input_style
            : [])
        );
        console.log(field.config.input_style);
        const parentStyle = Object.assign(
          {},
          ...(Array.isArray(field.config.parent_style) &&
          field.config.parent_style.length
            ? field.config.parent_style
            : [])
        );
        switch (field.config?.type) {
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
          case "Input Field":
            formField = (
              <div
                key={index}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  width: "1200px",
                }}
              >
                <InputField
                  input={{
                    type: field.input_type,
                    style: { width: "700px" },
                  }}
                >
                  {field.label}
                </InputField>
                <br />
                <br />
                <br />
                <br />
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
              <div
                key={index}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <br />
                <TextArea
                  style={parentStyle}
                  input={{
                    type: field.type,
                    name: field.label,
                    required: field.required,
                    style: { ...inputFieldStyle, width: "700px" },
                  }}
                >
                  {field.label}
                </TextArea>
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
                <br />
                <input type="file" />
                <br></br>
              </div>
            );
            break;
          case "Image":
            formField = (
              <div key={index} style={parentStyle}>
                <img src={Banner} style={{ width: "1000px" }} />
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
          case "navbar - template":
            formField = (
              <div key={index}>
                <TopNav
                  company={
                    <TopNav.Anchor target="new">ABC Grants</TopNav.Anchor>
                  }
                />
              </div>
            );
            break;

          case "Body":
            formField = (
              <div key={index}>
                <Container>
                  <body
                    input={{
                      type: "text",
                      value: field.config.config.label,
                    }}
                  >
                    {field.config.config.label}
                  </body>
                  <br></br>
                </Container>
              </div>
            );
            break;
          case "Center Component":
            formField = (
              <div key={index}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        label="Check in"
                        variant="outlined"
                        value={dayjs(checkinDate).format("DD-MM-YYYY")}
                        onChange={(event) =>
                          handleCheckinDateChange(new Date(event.target.value))
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
                    onChange={(event) => handleRoomsChange(event.target.value)}
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
                    onChange={(event) => handleGuestsChange(event.target.value)}
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

          case "Heading":
            formField = (
              <div key={index}>
                <center>
                  <Heading style={{ color: "black", fontWeight: "bold" }}>
                    {field.config.label}
                    {console.log(field.config)}
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

          case "Header":
            formField = (
              <div key={index}>
                {field.label === "Overview" && (
                  <Heading
                    size="MEDIUM"
                    input={{
                      type: "text",
                    }}
                  >
                    {field.label}
                  </Heading>
                )}
                {field.label === "Business email address" && (
                  <Heading
                    size="MEDIUM"
                    input={{
                      type: "text",
                    }}
                  >
                    {field.label}
                  </Heading>
                )}
                {field.label === "Applicant name" && (
                  <Heading
                    size="MEDIUM"
                    input={{
                      type: "text",
                    }}
                  >
                    {field.label}
                  </Heading>
                )}
                {field.label === "Registration Form" && (
                  <Heading
                    size="LARGE"
                    input={{
                      type: "text",
                    }}
                  >
                    {field.label}
                  </Heading>
                )}
                {field.label ===
                  "You have successfully registered for the scheme!" && (
                  <>
                    <br></br>
                    <Container>
                      <Panel
                        title="You have successfully registered for the scheme!"
                        style={{ backgroundColor: "#00823B" }}
                      >
                        <br />
                        <strong>
                          Activate your new account to submit an application
                        </strong>
                      </Panel>
                    </Container>
                  </>
                )}
                {field.label === "Register to the ABC Grant" && (
                  <Heading
                    size="LARGE"
                    input={{
                      type: "text",
                    }}
                  >
                    {field.label}
                  </Heading>
                )}
                {field.label === "Contact Support" && (
                  <Heading
                    size="LARGE"
                    input={{
                      type: "text",
                    }}
                  >
                    {field.label}
                  </Heading>
                )}
                {field.label === "Contact Us" && (
                  <Heading
                    size="LARGE"
                    input={{
                      type: "text",
                    }}
                  >
                    {field.label}
                  </Heading>
                )}
                <br></br>
              </div>
            );
            break;
          case "Raised Button":
            formField = (
              <div key={index} style={parentStyle}>
                <br />
                {}
                <Link to={field.button_link}>
                  <Button
                    onClick={nextPage}
                    style={{
                      width: field.width + "px",
                      height: field.height + "px",
                    }}
                  >
                    {field.config.label || field.config.label}
                  </Button>
                </Link>
                {console.log(field)}
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
                {console.log(`process.env.PUBLIC_URL/${field.label}`)}
                <img
                  src={`process.env.PUBLIC_URL/${field.label}`}
                  alt="Logo"
                  width="50"
                  height="50"
                  className="d-inline-block align-top"
                />
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
                    <TopNav.Anchor target="new" style={{ fontSize: "22px" }}>
                      {field.config.config.label}
                    </TopNav.Anchor>
                  }
                />
                <br></br>
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
                        {field.config.label}
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

          case "Captcha":
            formField = (
              <div key={index}>
                <br />
                <br />
                <br />

                <center>
                  <Label
                    input={{
                      type: "text",
                      value: field.label,
                    }}
                  >
                    {field.label}
                  </Label>
                  <ReCAPTCHA
                    sitekey={"6LeiNAclAAAAAImMXqIfk2YOFJF99SD6UVUAqyvd"}
                  />
                </center>
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
    {
      console.log(fieldsToRender.length === 0);
      console.log(fieldsToRender);
    }
    return (
      <div>
        <LoadingBox loading={loading}>{fieldsToRender}</LoadingBox>
      </div>
    );
  };

  return (
    <div style={{ overflowWrap: "break-word", height: "100vh" }}>
      <center> {renderForm()}</center>
    </div>
  );
}

export default DynamicPage;
