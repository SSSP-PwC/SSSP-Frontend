import { Divider, TextField } from "@mui/material";
import { Button, Checkbox, Heading, InputField, Select, TextArea } from "govuk-react";
import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { MainHeading } from "../../../globalStyles";
import FormBuilder from "./FormBuilder";
import { useNavigate } from "react-router-dom";
const PageBuilder = () => {
  const [pageElements, setPageElements] = useState([]);
  const [pageTitle, setPageTitle] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [fields, setFields] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [numTabs, setNumTabs] = useState(1);
  const [tabs, setTabs] = useState([
    {
      id: 1,
      title: "Portal",
      content: "",
      fields: [
        {
          label: "",
          type: "string",
          required: false,
          button_link: "",
        },
      ],
    },
  ]);
  const navigate = useNavigate();
  const showPortal = () => {
    setShowForm(true);
  };
  const handleNavigate = () => {
    navigate(`${tabs[activeTab].fields[activeTab].button_link}`);
  };

  const renderForm = () => {
    return (
      <form>
        {tabs[activeTab].fields.map((field, index) => (
          <div key={index}>
            {field.type === "button" && (
              <div>
                <Button
                  onClick={handleNavigate}
                  type={field.type}
                  name={field.label}
                  required={field.required}
                >
                  {field.label}
                </Button>
              </div>
            )}
            {field.type === "string" && (
              <div>
                <label style={{ textAlign: "center" }}>{field.label}</label>
                <br></br>
                <InputField
                  input={{
                    type: field.type,
                    name: field.label,
                    required: field.required,
                  }}
                />
              </div>
            )}
            {field.type === "password" && (
              <div>
                <label style={{ textAlign: "center" }}>{field.label}</label>
                <br></br>
                <InputField
                  input={{
                    type: field.type,
                    name: field.label,
                    required: field.required,
                  }}
                />
              </div>
            )}
            {field.type === "number" && (
              <div>
                <label style={{ textAlign: "center" }}>{field.label}</label>
                <br></br>
                <InputField
                  input={{
                    type: field.type,
                    name: field.label,
                    required: field.required,
                  }}
                />
              </div>
            )}
            {field.type === "checkbox" && (
              <div>
                <label style={{ textAlign: "center" }}>{field.label}</label>
                <br></br>
                <Checkbox name={field.label} required={field.required} />
              </div>
            )}
            {field.type === "textarea" && (
              <div>
                <label style={{ textAlign: "center" }}>{field.label}</label>
                <br></br>
                <TextArea
                  input={{
                    type: field.type,
                    name: field.label,
                    required: field.required,
                  }}
                >
                </TextArea>
              </div>
            )}
          </div>
        ))}
      </form>
    );
  };

  const handleAddTab = () => {
    const newId = numTabs + 1;
    const newTab = {
      id: newId,
      title: pageTitle,
      content: fields[newId],
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
    console.log(currentTab);
    console.log(currentTabFields);

    currentTabFields.push({
      label: "",
      type: "",
      required: false,
      button_link: "",
    });

    const newTabs = [...tabs];
    newTabs[activeTab] = {
      ...currentTab,
      fields: currentTabFields,
    };
    console.log(newTabs);

    setTabs(newTabs);
  };
  const savePage = () => {
    console.log(tabs);
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
          <InputField
            input={{
              label: "Page URL",
              value: pageUrl,
              onChange: (e) => setPageUrl(e.target.value),
            }}
          >
            Page Endpoint
          </InputField>
          <br></br>

          <Button
            variant="contained"
            onClick={handleAddField}
            style={{ margin: "5px" }}
          >
            Add Element
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={savePage}
            style={{ margin: "5px" }}
          >
            Save Page
          </Button>
          <Button onClick={handleAddTab} style={{ margin: "5px" }}>
            + Add Page
          </Button>
          <Button onClick={showPortal} style={{ margin: "5px" }}>
            Preview
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
                {console.log(fields)}
                {tabs[activeTab].fields.map((field, index) => (
                  <div key={`field-${index}`}>
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
                      <option value="string">Text Field</option>
                      <option value="string">Email</option>
                      <option value="textarea">Textbox</option>
                      <option value="number">Number</option>
                      <option value="button">Button</option>
                      <option value="password">Password</option>
                      <option value="checkbox">Checkbox</option>
                    </Select>

                    <br></br>
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
                    <br></br>
                    {field.type === "button" && (
                      <InputField
                        input={{
                          type: "text",
                          value: field.button_link,
                          onChange: (e) =>
                            handleUpdateField(index, {
                              ...field,
                              button_link: e.target.value,
                            }),
                        }}
                      >
                        {" "}
                        Button Link:
                      </InputField>
                    )}
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
      {showForm === true && <div>{renderForm()}</div>}
    </div>
  );
};

export default PageBuilder;
