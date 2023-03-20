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
  Radio,
  Link,
} from "govuk-react";
import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { MainHeading } from "../../../globalStyles";
import { useLocation, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import ReCAPTCHA from "react-google-recaptcha";

const PagePreview = () => {
  const [pageElements, setPageElements] = useState([]);
  const [pageTitle, setPageTitle] = useState("");
  const [selectedPage, setSelectedPage] = useState(null);
  const [pageUrl, setPageUrl] = useState("");
  const [fields, setFields] = useState([]);
  const [numberOfElements, setNumberOfElements] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [numTabs, setNumTabs] = useState(1);
  const [fileData, setFileData] = useState(null);
  const [numberOfRadioButtons, setNumberOfRadioButtons] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState();

  const [tabs, setTabs] = useState([
    {
      id: 1,
      title: "Portal",
      fields: [
        {
          id: 0,
          type: "",
          label: "",
          name: "",
          captcha_key: "",
          required: false,
        },
      ],
    },
  ]);

  const navigate = useNavigate();
  const { state } = useLocation();
  const defaultProps = {
    label: "",
    type: "",

    onChange: () => {},
  };

  const renderForm = () => {
    const fieldsToRender = [];

    // Find the tab for the selected page
    const tab = tabs.find((tab) => tab.title === selectedPage);

    // Render fields for the selected tab
    if (tab) {
      tab.fields.forEach((field, index) => {
        let formField = null;

        // Render the field based on its type
        switch (field.type) {
          case "next-button":
          case "previous-button":
          case "submit-button":
            formField = (
              <div key={index}>
                <Button  required={field.required}>
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
        <form style={{ overflowWrap: "break-word" }}>
          <label htmlFor="page-select">Select a page:</label>
          <Select
            id="page-select"
            value={selectedPage || ""}
          >
            <option value="">-- Select a page --</option>
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.title}>
                {tab.title}
              </option>
            ))}
          </Select>
          <br></br>
          <br></br>
          {fieldsToRender}
        </form>
      </div>
    );
  };

  const handleAddTab = () => {
    const newId = numTabs + 1;
    const newTab = {
      id: newId,
      title: pageTitle,
      fields: [{}],
    };
    setTabs([...tabs, newTab]);
    setNumTabs(newId);
  };
  const handleRemoveTab = (id) => {
    const newTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(newTabs);
    setActiveTab(newTabs[newTabs.length - 1].id);
  };
  const handleAddSummary = () => {
    const newId = numTabs + 1;
    const newTab = {
      id: newId,
      title: `Summary - Stage ${newId}`,
      content: `Summary ${newId} content`,
    };
    setTabs([...tabs, newTab]);
    setNumTabs(newId);
  };

  const handleAddField = () => {
    const currentTab = tabs[activeTab];
    const currentTabFields = currentTab.fields ? [...currentTab.fields] : [];

    setNumberOfElements((prevState) => prevState + 1);

    currentTabFields.push({
      label: `Field ${numberOfElements + 1}`,
      type: "input",
      props: {},
    });

    const newTabs = [...tabs];
    newTabs[activeTab].fields = currentTabFields;
    setTabs(newTabs);
  };
  const handleRemoveField = (index) => {
    const currentTab = tabs[activeTab];
    if (!currentTab) {
      console.error(`Tab ${activeTab} is not defined`);
      return;
    }
    const currentTabFields = [...currentTab.fields];
    currentTabFields.splice(index, 1);
    const newTabs = [...tabs];
    newTabs[activeTab] = {
      ...currentTab,
      fields: currentTabFields,
    };
    setTabs(newTabs);
  };



  return (
    <div className="container">
        <div>
          {renderForm()} <br></br>
        </div>
    
    </div>
  );
};

export default PagePreview;
