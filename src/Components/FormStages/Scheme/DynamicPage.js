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
  Footer,
  MultiChoice,
  Link,
} from "govuk-react";

import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import ReCAPTCHA from "react-google-recaptcha";

function DynamicPage() {
  const { pageId, endpoint } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [numberOfElements, setNumberOfElements] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
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
    const response = await fetch(
      `https://sssp-378808.nw.r.appspot.com/api/portals/${endpoint}/pages/${pageId}`
    );
    const info = await response.json();
    console.log(info);
    setData(info.fields);
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

    console.log(numPages);

    data &&
      data.map((field, index) => {
        switch (field.type) {
          case "next-button":
            formField = (
              <div key={index}>
                <Button onClick={nextPage} required={field.required}>
                  {field.label}
                </Button>
                <br></br>
              </div>
            );
            break;
          case "previous-button":
            formField = (
              <div key={index}>
                <Button onClick={previousPage} required={field.required}>
                  {field.label}
                </Button>
                <br></br>
              </div>
            );
            break;
          case "submit-button":
            formField = (
              <div key={index}>
                <Button onClick={submit} required={field.required}>
                  {field.label}
                </Button>
                <br></br>
              </div>
            );
            break;
            case "textfield":
              formField = (
                <div key={index}>
                  <label style={{ textAlign: "center" }}>{field.name}</label>
  
                  <br />
                  <InputField
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
            case "email":
              formField = (
                <div key={index}>
                  <label style={{ textAlign: "center" }}>{field.name}</label>
                  <br />
                  <InputField
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
  
            case "password":
              formField = (
                <div key={index}>
                  <label style={{ textAlign: "center" }}>{field.name}</label>
                  <br />
                  <InputField
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
  
            case "number":
              formField = (
                <div key={index}>
                  <label style={{ textAlign: "center" }}>{field.name}</label>
                  <br />
                  <InputField
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
            case "checkbox":
              formField = (
                <div key={index}>
                  <Checkbox name={field.label} required={field.required} />
                  <label style={{ textAlign: "center" }}>{field.name}</label>
                  <br></br>
                </div>
              );
              break;
            case "textarea":
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
            case "file":
              formField = (
                <div key={index}>
                  {fileData && <img src={fileData} alt="uploaded file" />}
                  <br></br>
                </div>
              );
              break;
            case "label":
              formField = (
                <div key={index}>
                  <Label
                    input={{
                      type: "text",
                      value: field.label,
                    }}
                  >
                    {" "}
                    {field.label}
                  </Label>
                  <br></br>
                </div>
              );
              break;
            case "body":
              formField = (
                <div key={index}>
                  <Label
                    input={{
                      type: "text",
                      value: field.label,
                    }}
                  >
                    {" "}
                    {field.label}
                  </Label>
                  <br></br>
                </div>
              );
              break;
            case "heading":
              formField = (
                <div key={index}>
                  <Heading
                    size="LARGE"
                    input={{
                      type: "text",
                    }}
                  >
                    {field.label}
                  </Heading>
                  <br></br>
                </div>
              );
              break;
            case "navbar":
              formField = (
                <div key={index}>
                  <TopNav
                    company={
                      <TopNav.Anchor href="https://example.com" target="new">
                        {field.label}
                      </TopNav.Anchor>
                    }
                  />
                  <br></br>
                </div>
              );
              break;
            case "footer":
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
            case "multichoice":
              formField = (
                <div key={index}>
                  <MultiChoice label={field.name}></MultiChoice>
                </div>
              );
              break;
            case "dropdown":
              formField = (
                <div key={index}>
                  <Select id="page-select">
                    <option value="">{field.name}</option>)
                  </Select>
                </div>
              );
              break;
            case "website_url":
              formField = (
                <div key={index}>
                  <Link href={`${field.name}`}>
                    <Label
                      input={{
                        type: "text",
                        value: field.name,
                      }}
                    >
                      {field.name}
                    </Label>
                  </Link>
                  <br></br>
                </div>
              );
              break;
            case "phonenumber":
              formField = (
                <div key={index}>
                  <PhoneInput
                    placeholder={field.name}
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                  />
                  <br></br>
                </div>
              );
              break;
            case "captcha":
              formField = (
                <div key={index}>
                  <ReCAPTCHA sitekey={`${field.captcha_key}`} />
                  <br></br>
                </div>
              );
              break;
        }
        if (formField) {
          fieldsToRender.push(formField);
        }
      });

    return (
      <div className="container">
        <form style={{ overflowWrap: "break-word" }}>{fieldsToRender}</form>
      </div>
    );
  };

  return <div>{renderForm()}</div>;
}

export default DynamicPage;
