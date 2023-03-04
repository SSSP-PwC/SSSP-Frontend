import React, { useState } from "react";
import { Button } from "govuk-react";
import { MainHeading } from "../../../globalStyles";
import { Divider } from "@mui/material";
const FormBuilder = () => {
  const [fields, setFields] = useState([]);

  const handleAddField = () => {
    const newFields = [...fields];
    newFields.push({ label: "New Field", type: "text", required: false });
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

  return (
    <div className="container">
      <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
        Form Field Creator
      </MainHeading>
      <Divider style={{ background: "black" }}></Divider>
      <br></br>
      <Button onClick={handleAddField}>Add Field</Button>
      <br></br>
      {fields.map((field, index) => (
        <div key={index}>
          <label>
            Label:
            <input
              type="text"
              value={field.label}
              onChange={(e) =>
                handleUpdateField(index, { ...field, label: e.target.value })
              }
            />
          </label>
          <label>
            Type:
            <select
              value={field.type}
              onChange={(e) =>
                handleUpdateField(index, { ...field, type: e.target.value })
              }
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="checkbox">Checkbox</option>
            </select>
          </label>
          <label>
            Required:
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) =>
                handleUpdateField(index, {
                  ...field,
                  required: e.target.checked,
                })
              }
            />
          </label>
          <label>
            Display on Separate Page:
            <input
              type="checkbox"
              checked={field.displayOnSeparatePage}
              onChange={(e) =>
                handleUpdateField(index, {
                  ...field,
                  displayOnSeparatePage: e.target.checked,
                })
              }
            />
          </label>
          <button onClick={() => handleRemoveField(index)}>Remove</button>
        </div>
      ))}
      <br></br>

      <Button onClick={handleFormState}>Continue</Button>
    </div>
  );
};

export default FormBuilder;
