import React, { useState } from "react";
import { Button, Heading, Checkbox, InputField, Select } from "govuk-react";
import { MainHeading } from "../../../globalStyles";
import { Divider } from "@mui/material";
const RenderForm = () => {
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

export default RenderForm;
