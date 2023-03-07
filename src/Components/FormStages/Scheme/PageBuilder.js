import { Divider, TextField } from "@mui/material";
import { Button, Checkbox, Heading, InputField, Select } from "govuk-react";
import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { MainHeading } from "../../../globalStyles";
import FormBuilder from "./FormBuilder";

const PageBuilder = () => {
  const [pageElements, setPageElements] = useState([]);
  const [pageTitle, setPageTitle] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [navbarTitle, setNavbarTitle] = useState("");

  const [activeTab, setActiveTab] = useState(1);
  const [numTabs, setNumTabs] = useState(0);
  const [tabs, setTabs] = useState({
   1: { id: 1, title: "Homepage", content: "Page 1", fields : [] },
});
  const [fields, setFields] = useState(tabs[activeTab].fields);

    tabs= Array.from(tabs[1])
  const handleAddTab = () => {
    const newId = numTabs + 1;
    const newTab = {
      id: newId,
      title: `Form  - Stage ${newId}`,
      content: `Form - Stage ${newId} content`,
      fields: [],
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
      fields: [],
    };
    setTabs([...tabs, newTab]);
    setNumTabs(newId);
  };
  const handleAddField = () => {
    const newFields = [...fields];
    newFields.push({
      label: "",
      type: "",
      required: false,
      button_link: "",
    });
    setFields(newFields);
  };

  const savePage = () => {
    const data = {
      title: pageTitle,
      url: pageUrl,
      tabs: tabs,
    };
    console.log(data);
  };
  const handleRemoveField = (index) => {
    const newTabs = [...tabs];
    const tabIndex = newTabs.findIndex((tab) => tab.id === activeTab);
    const newFields = [...newTabs[tabIndex].fields];
    newFields.splice(index, 1);
    newTabs[tabIndex].fields = newFields;
    setTabs(newTabs);
  };

  const handleUpdateField = (index, field) => {
    const newTabs = [...tabs];
    const tabIndex = newTabs.findIndex((tab) => tab.id === activeTab);
    const newFields = [...newTabs[tabIndex].fields];
    newFields[index] = field;
    newTabs[tabIndex].fields = newFields;
    setTabs(newTabs);
  };

  const handleFormState = () => {
    console.log(fields);
  };

  return (
    <div className="container">
      <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
        Page Builder
      </MainHeading>{" "}
      <p style={{ color: "#505a5f" }}>
        Use this service to build your own pages.
      </p>
      <Divider style={{ background: "black" }}></Divider>
      <br></br>
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
      <InputField
        input={{
          label: "Navbar title",
          value: navbarTitle,
          onChange: (e) => setNavbarTitle(e.target.value),
        }}
      >
        Navbar title
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
      <Button onClick={handleAddSummary} style={{ margin: "5px" }}>
        Submit
      </Button>
      <Button onClick={handleRemoveTab} style={{ margin: "5px" }}>
        Delete tab
      </Button>
      <br></br>
      {pageElements.map((element) => {
        if (element.type === "text") {
          return <div key={element.id}>{element.text}</div>;
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
            <a key={element.id} href={element.linkUrl}>
              {element.linkText}
            </a>
          );
        }
      })}
      <br></br>
      <Tabs activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            eventKey={tab.id}
            title={
              <>
                
                <p>{tab.title}</p>
                <Button  onClick={() => handleRemoveTab(tab.id)}> x</Button>
              </>
            }
            disabled={tab.disabled}
          >
            <br></br>
            {fields.map((field, index) => (
              <div key={index}>
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
                    handleUpdateField(index, { ...field, type: e.target.value })
                  }
                >
                  <option value="string">Text</option>
                  <option value="string">Email</option>
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
                <Button onClick={() => handleRemoveField(index)}>Remove</Button>
              </div>
            ))}
          </Tab>
        ))}
      </Tabs>
      <br></br>
    </div>
  );
};

export default PageBuilder;
