import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import {
  Button,
  Checkbox,
  Heading,
  InputField,
  Select,
  TextArea,
  FileUpload,
  Label,
  TopNav,
  MultiChoice,
  Link,
  H3,
  LoadingBox,
  Footer,
} from "govuk-react";

import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import ReCAPTCHA from "react-google-recaptcha";
import { MainHeading } from "../../../globalStyles";
import { NavbarComponent } from "../../Navbar/NavbarComponent";

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

  const { state: locationState } = useLocation();
  const prevData = locationState?.data || {};

  console.log(prevData);

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
    navigate(`/${endpoint}/pages/${nextPageId}`, {
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
    data &&
      data.map((field, index) => {
        switch (field.config?.type) {
          case "Single Stage Sign Up Form":
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
          case "Single Stage Contact Us Form":
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
          case "Multi Stage Sign Up Form":
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
                <input type="file" />
                <br></br>
              </div>
            );
            break;
          case "Image":
            formField = (
              <div key={index}>
                <input type="file" />
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
                <body
                  input={{
                    type: "text",
                    value: field.config.label,
                  }}
                >
                  {field.config.label}
                </body>
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
      {renderForm()}
    </div>
  );
}

export default DynamicPage;
