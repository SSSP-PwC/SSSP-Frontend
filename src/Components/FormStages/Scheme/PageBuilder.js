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
} from "govuk-react";
import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { MainHeading } from "../../../globalStyles";
import { useNavigate } from "react-router-dom";
const PageBuilder = () => {
  const [pageElements, setPageElements] = useState([]);
  const [pageTitle, setPageTitle] = useState("");
  const [selectedPage, setSelectedPage] = useState(null);

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

  const handlePageSelect = (event) => {
    setSelectedPage(event.target.value);
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
          case "button":
            formField = (
              <div key={index}>
                <Button
                  onClick={() => {
                    navigate(field.button_link);
                  }}
                  name={field.label}
                  required={field.required}
                >
                  {field.label}
                </Button>
                <br></br>
              </div>
            );
            break;

          case "string":
          case "password":
          case "number":
            formField = (
              <div key={index}>
                <label style={{ textAlign: "center" }}>{field.label}</label>
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
                <label style={{ textAlign: "center" }}>{field.label}</label>
                <br></br>
              </div>
            );
            break;

          case "textarea":
            formField = (
              <div key={index}>
                <label style={{ textAlign: "center" }}>{field.label}</label>
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
                <FileUpload
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
                  {field.label}
                </FileUpload>
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
                    onChange: (e) =>
                      handleUpdateField(index, {
                        ...field,
                        button_link: e.target.value,
                      }),
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
                    onChange: (e) =>
                      handleUpdateField(index, {
                        ...field,
                        button_link: e.target.value,
                      }),
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
        <form style={{overflowWrap: "break-word"}}>
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
                      <option value="file">File</option>
                      <option value="button">Button</option>
                      <option value="heading">Heading</option>
                      <option value="navbar">Navbar</option>

                      <option value="password">Password</option>
                      <option value="checkbox">Checkbox</option>
                      <option value="label">Label</option>
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
      {showForm === true && (
        <div>
          {renderForm()} <br></br>
        </div>
      )}
    </div>
  );
};

export default PageBuilder;
