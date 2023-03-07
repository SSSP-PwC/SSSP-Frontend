import React, { useState } from "react";
import { Button, Heading, Checkbox, InputField, Select } from "govuk-react";
import { MainHeading } from "../../../globalStyles";
import { Divider } from "@mui/material";
const FormBuilder = () => {
  const [fields, setFields] = useState([]);

  const handleAddField = () => {
    const newFields = [...fields];
    newFields.push({
      label: "",
      type: "",
      required: false,
      displayOnSeparatePage: false,
      name: "",
      endpoint: "",
    });
    setFields(newFields);
  };

  const handleRemoveField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleUpdateField = (index, field) => {
    const newFields = [...fields];
    newFields[index] = field;
    setFields(newFields);
  };

  const handleFormState = () => {
    console.log(fields);
  };

  const renderForm = () => {
    return (
      <form>
        {fields.map((field, index) => (
          <div key={index}>
            {field.type === "button" && (
              <div>
                <Button
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
          </div>
        ))}
      </form>
    );
  };

  return (
    <div className="container">
      <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
        Form Field Creator
      </MainHeading>
      <Divider style={{ background: "black" }}></Divider>
      <br></br>
      <div style={{ float: "right" }}>
        <Heading>Preview</Heading>
        {renderForm()}
      </div>
      <div>
        <Button onClick={handleAddField}>Add Field</Button>
        <br></br>
        {fields.map((field, index) => (
          <div key={index}>
            <label>
              Label:
              <InputField
                onChange={(e) =>
                  handleUpdateField(index, { ...field, label: e.target.value })
                }
                input={{
                  type: "text",
                  value: field.label,
                }}
              />
            </label>
            <br></br>
            <label>
              Type:
              <Select
                style={{ minWidth: "180px", maxWidth: "480px" }}
                value={field.type}
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
            </label>

            <br></br>
            <label>
              Name:
              <InputField
                onChange={(e) =>
                  handleUpdateField(index, { ...field, name: e.target.value })
                }
                input={{
                  type: "text",
                  value: field.name,
                }}
              />
            </label>
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
            <label>
              Display on Separate Page:
              <Checkbox
                onChange={(e) =>
                  handleUpdateField(index, {
                    ...field,
                    displayOnSeparatePage: e.target.checked,
                  })
                }
                input={{
                  type: "checkbox",
                  checked: field.displayOnSeparatePage,
                }}
              />
            </label>
            <br></br>
            <label>
              Endpoint:
              <InputField
                onChange={(e) =>
                  handleUpdateField(index, {
                    ...field,
                    endpoint: e.target.value,
                  })
                }
                input={{
                  type: "text",
                  value: field.endpoint,
                }}
              />
            </label>
            <br></br>
            <br></br>
            <Button  onClick={() => handleRemoveField(index)}>Remove</Button>
          </div>
        ))}
        <br></br>

        <Button onClick={handleFormState}>Continue</Button>
      </div>
    </div>
  );
};

export default FormBuilder;
