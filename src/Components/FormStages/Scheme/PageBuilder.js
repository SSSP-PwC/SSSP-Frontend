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

const PageBuilder = () => {
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
  console.log(state.portal_id);
  const defaultProps = {
    label: "",
    type: "",

    onChange: () => {},
  };

  const createPage = async (tabData) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:1000/api/page",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: tabData.title,
            fields: tabData.fields,
            portal_id: state.portal_id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async () => {
    try {
      for (let i = 0; i < numTabs; i++) {
        const tabFields = tabs[i].fields;
        const fieldsData = [];

        for (let j = 0; j < tabFields.length; j++) {
          const fieldData = {
            id: j + 1,
            props: {
              name: tabFields[j].name,
              label: tabFields[j].label,
              type: tabFields[j].type,
              required: tabFields[j].required,
            },
          };

          fieldsData.push(fieldData);
        }

        const tabData = {
          title: tabs[i].title,
          fields: fieldsData,
        };

        await createPage(tabData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const showPortal = () => {
    setShowForm(true);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileData(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePageSelect = (event) => {
    setSelectedPage(event.target.value);
  };

  const incrementNumberOfButtons = () => {
    setNumberOfRadioButtons(numberOfRadioButtons + 1);
  };
  const RenderRadioButtons = () => {
    const fieldsToRender = [];
    let formField = null;
    for (let i = 0; i < numberOfRadioButtons; i++) {
      formField = <Radio inline name="group1"></Radio>;

      if (formField) {
        fieldsToRender.push(formField);
      }
    }
    return (
      <div className="container">
        <form style={{ overflowWrap: "break-word" }}>
          <br></br>
          {fieldsToRender}
        </form>
      </div>
    );
  };
  const handleClick = (event) => {
    event.preventDefault();

    alert("Button event does not work in preview mode");
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
                <Button onClick={handleClick} required={field.required}>
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
            onChange={handlePageSelect}
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

  const handleUpdateField = (index, field) => {
    const currentTabFields = [...tabs[activeTab].fields];
    currentTabFields[index] = field;
    const newTabs = [...tabs];
    newTabs[activeTab] = {
      ...tabs[activeTab],
      fields: currentTabFields,
    };
    setTabs(newTabs);
  };

  const handleFormState = () => {
    console.log(fields);
  };

  return (
    <div className="container">
      <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
        Page Builder
      </MainHeading>
      <p style={{ color: "#505a5f" }}>
        Use this service to build your own pages.
      </p>
      <Divider style={{ background: "black" }}></Divider>
      <br></br>
      {showForm === false && (
        <div>
          <InputField
            input={{
              label: "Page Title",
              value: pageTitle,
              onChange: (e) => setPageTitle(e.target.value),
            }}
          >
            Page Title
          </InputField>
          <br></br>

          <Button
            variant="contained"
            onClick={handleAddField}
            style={{ margin: "5px" }}
          >
            Add Element
          </Button>

          <Button onClick={handleAddTab} style={{ margin: "5px" }}>
            + Add Page
          </Button>
          <Button onClick={showPortal} style={{ margin: "5px" }}>
            Preview
          </Button>
          <Button onClick={submit} style={{ margin: "5px" }}>
            Publish Portal
          </Button>
          <br></br>
          {pageElements.map((element) => {
            if (element.type === "text") {
              return <div key={`element-${element.id}`}>{element.text}</div>;
            } else if (element.type === "image") {
              return (
                <img
                  key={element.id}
                  src={element.imageUrl}
                  alt={element.altText}
                />
              );
            } else if (element.type === "link") {
              return (
                <a key={`element${element.id}`} href={element.linkUrl}>
                  {element.linkText}
                </a>
              );
            }
          })}
          <br></br>

          <Tabs activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
            {tabs.map((tab, index) => (
              <Tab
                key={`tab-${index}`}
                eventKey={index}
                title={
                  <>
                    <p>{tab.title}</p>
                  </>
                }
                disabled={tab.disabled}
              >
                <br></br>
                {tabs[activeTab].fields.map((field, index) => (
                  <div key={`field-${index}`}>
                    <p>Element</p>
                    <Divider style={{ background: "black" }}></Divider>
                    <br></br>
                    {field.type === "textfield" ||
                    field.type === "email" ||
                    field.type === "textarea" ||
                    field.type === "number" ||
                    field.type === "file" ||
                    field.type === "password" ||
                    field.type === "checkbox" ||
                    field.type === "multichoice" ||
                    field.type === "dropdown" ||
                    field.type === "website_url" ||
                    field.type === "phonenumber" ? (
                      <InputField
                        input={{
                          type: "text",
                          value: field.name,
                          onChange: (e) =>
                            handleUpdateField(index, {
                              ...field,
                              name: e.target.value,
                            }),
                        }}
                      >
                        Input Name:
                      </InputField>
                    ) : (
                      <div></div>
                    )}
                    <br></br>
                    {field.type === "textfield" ||
                    field.type === "email" ||
                    field.type === "textarea" ||
                    field.type === "number" ||
                    field.type === "file" ||
                    field.type === "next-button" ||
                    field.type === "previous-button" ||
                    field.type === "submit-button" ||
                    field.type === "heading" ||
                    field.type === "navbar" ||
                    field.type === "footer" ||
                    field.type === "password" ||
                    field.type === "checkbox" ||
                    field.type === "label" ||
                    field.type === "multichoice" ||
                    field.type === "dropdown" ||
                    field.type === "website_url" ||
                    field.type === "phonenumber" ||
                    field.type === "captcha" ? (
                      <InputField
                        input={{
                          type: "text",
                          value: field.label,
                          onChange: (e) =>
                            handleUpdateField(index, {
                              ...field,
                              label: e.target.value,
                            }),
                        }}
                      >
                        Label:
                      </InputField>
                    ) : (
                      <div></div>
                    )}
                    {field.type === "body" && (
                      <TextArea
                        input={{
                          type: "text",
                          value: field.label,
                          onChange: (e) =>
                            handleUpdateField(index, {
                              ...field,
                              label: e.target.value,
                            }),
                        }}
                      >
                        Label:
                      </TextArea>
                    )}
                    <br></br>

                    <Select
                      value={field.type}
                      label="Type:"
                      onChange={(e) =>
                        handleUpdateField(index, {
                          ...field,
                          type: e.target.value,
                        })
                      }
                    >
                      <option value="textfield">Text Field</option>
                      <option value="email">Email</option>
                      <option value="textarea">Textbox</option>
                      <option value="number">Number</option>
                      <option value="file">File</option>
                      <option value="next-button">Next Button</option>
                      <option value="previous-button">Previous Button</option>
                      <option value="submit-button">Submit Button</option>
                      <option value="heading">Heading</option>
                      <option value="navbar">Navbar</option>
                      <option value="footer">Footer</option>
                      <option value="password">Password</option>
                      <option value="checkbox">Checkbox</option>
                      <option value="label">Label</option>
                      <option value="multichoice">Multi-choice</option>
                      <option value="dropdown">Dropdown</option>
                      <option value="website_url">Website URL</option>
                      <option value="phonenumber">Phone number</option>
                      <option value="body">Body</option>
                      <option value="captcha">Captcha</option>
                    </Select>

                    <br></br>
                    {field.type === "textfield" ||
                    field.type === "email" ||
                    field.type === "textarea" ||
                    field.type === "number" ||
                    field.type === "file" ||
                    field.type === "password" ||
                    field.type === "checkbox" ||
                    field.type === "multichoice" ||
                    field.type === "dropdown" ||
                    field.type === "website_url" ||
                    field.type === "phonenumber" ? (
                      <label>
                        Required:
                        <Checkbox
                          onChange={(e) =>
                            handleUpdateField(index, {
                              ...field,
                              required: e.target.checked,
                            })
                          }
                          input={{
                            type: "checkbox",
                            checked: field.required,
                          }}
                        />
                      </label>
                    ) : (
                      <div></div>
                    )}
                    <br></br>

                    {field.type === "multichoice" && (
                      <Button
                        onClick={incrementNumberOfButtons}
                        input={{
                          type: "number",
                          value: field.number_of_radio_buttons,
                        }}
                      >
                        Add Radio Button
                      </Button>
                    )}
                    {field.type === "file" && (
                      <FileUpload
                        onChange={handleFileChange}
                        input={{
                          type: "file",
                        }}
                      >
                        {" "}
                      </FileUpload>
                    )}
                    {field.type === "captcha" && (
                      <InputField
                        input={{
                          type: "text",
                          value: field.captcha_key,
                          onChange: (e) =>
                            handleUpdateField(index, {
                              ...field,
                              captcha_key: e.target.value,
                            }),
                        }}
                      >
                        reCAPTCHA key from Google:
                      </InputField>
                    )}
                    <br></br>
                    <br></br>
                    <br></br>
                    <Button onClick={() => handleRemoveField(index)}>
                      Remove
                    </Button>
                  </div>
                ))}
              </Tab>
            ))}
          </Tabs>

          <br></br>
        </div>
      )}
      {showForm === true && (
        <div>
          {renderForm()} <br></br>
        </div>
      )}
    </div>
  );
};

export default PageBuilder;
