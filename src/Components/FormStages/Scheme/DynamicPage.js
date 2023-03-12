import React from "react";
import { useParams } from "react-router-dom";
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
  Radio,
  Link,
} from "govuk-react";
import { Tab, Tabs } from "react-bootstrap";
import { MainHeading } from "../../../globalStyles";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";

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

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch(
      `http://127.0.0.1:1000/api/page/${pageId}/${endpoint}`
    );
    const info = await response.json();
    console.log(info);
    setData(info.fields);
  }

  const selectPage = () => {
    const nextPageId = parseInt(pageId, 10) + 1;
    navigate(`/Page/${nextPageId}/${endpoint}`);
  };
  

  const renderForm = () => {
    const fieldsToRender = [];
    let formField = null;

    console.log(numPages);

    data &&
      data.map((field, index) => {
        console.log(field);
        switch (field.type) {
          case "button":
            formField = (
              <div key={index}>
                <Button
                  onClick={selectPage}
                  required={field.required}
                >
                  {field.name}
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
                    value: field.name,
                  }}
                >
                  {" "}
                  {field.name}
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
                      {field.name}
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
                <MultiChoice label={field.label}></MultiChoice>
              </div>
            );
            break;
          case "dropdown":
            formField = (
              <div key={index}>
                <Select id="page-select">
                  <option value="">{field.label}</option>)
                </Select>
              </div>
            );
            break;
          case "website_url":
            formField = (
              <div key={index}>
                <Link href={`${field.label}`}>
                  <Label
                    input={{
                      type: "text",
                      value: field.label,
                    }}
                  >
                    {field.label}
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
                  placeholder={field.label}
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                />
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
