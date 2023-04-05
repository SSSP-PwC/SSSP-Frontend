import { useEffect, useState, useRef } from "react";
import Sidebar from "./Sidebar";
import "./SiteBuilder.css";
import { Divider, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Modal from "react-bootstrap/Modal";
import { Button, Heading, InputField, LoadingBox, Select } from "govuk-react";
import { Container, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";


function SiteHome() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const id = sessionStorage.getItem("Citizen_ID");
  const [portalExists, setPortalExists] = useState();
  const [selectedOption, setSelectedOption] = useState(0 + 1);
  const [loading, setLoading] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [imageUri, setImageURI] = useState({ icon: "" });
  const [selectedFile, setSelectedFile] = useState();
  const [title, setTitle] = useState("Upload your site icon here");
  const [label, setLabel] = useState("Click here to upload your icon");
  console.log(imageUri);
  const [preview, setPreview] = useState();
  console.log(selectedFile);

  const [renderAdditionalSiteNameFields, setRenderAdditionalSiteNameFields] =
    useState(false);
  const [options, setOptions] = useState();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const getCompanies = () => {
      fetch(`https://sssp-378808.nw.r.appspot.com/api/citizen/${id}/companies`)
        .then((response) => response.json())
        .then((data) => setOptions(data));
    };
    const getImage = () => {
      fetch(`ttps://sssp-378808.nw.r.appspot.com/api/`);
    };
    getCompanies();
    setLoading(false);
  }, [id]);

  const [formValues, setFormValues] = useState({
    domain: state.domain,
    site_name: "",
    company_id: options,
  });
  const [imageIcon, setImageIcon] = useState();

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e;
    const base64 = await convertToBase64(file);
    

    setImageURI({ ...imageUri, icon: base64 });
    console.log(imageUri.icon)
  };

  const setIcon = async (image) => {
    const file = await convertToBase64(image);
    console.log(file)
    setImageIcon(image);
    setLoading(true)
    const requestOptions = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        portal_endpoint: formValues.domain ,
        data_uri: file,
      })
    };
    fetch(
      `https://sssp-378808.nw.r.appspot.com/api/upload-image`,
      requestOptions
    )
    .then((res) => res.json())
    .then((data) => {
        setLoading(false)
        console.log(data)
    })    
    setModalShow(false);
  };

  const updateData = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    console.log(formValues);
  };
  const renderNameField = () => {
    setRenderAdditionalSiteNameFields(true);
  };


  const visitSite = () => {
    window.open(`${formValues.domain}/pages/1`);
  };
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    console.log(selectedFile.type.split("/").pop());

    console.log(objectUrl);
    setPreview(objectUrl);

    setLabel(selectedFile.name);
    setTitle("Your image has been uploaded!");

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const FileUploadModel = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Site Icon
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
            <h4>{title}</h4>
            <Divider style={{ backgroundColor: "black" }}></Divider>
          </center>
          <br></br>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label
                style={{
                  backgroundColor: "#00703c",
                  padding: "10px",
                  color: "white",
                }}
              >
                {label}
              </Form.Label>
              <Form.Control
                type="file"
                onChange={onSelectFile}
                style={{ display: "none" }}
              />
            </Form.Group>
          </div>
          <br></br>
          <br></br>
          <br></br>
          {selectedFile !== undefined && (
            <center>
              <h4>Preview</h4>
              <Divider style={{ backgroundColor: "black" }}></Divider>
              <br></br>
            </center>
          )}
          {selectedFile && (
            <center>
              <img
                src={preview}
                style={{ maxHeight: "275px", maxWidth: "275px" }}
              />
            </center>
          )}
        </Modal.Body>
        <br></br>
        {selectedFile !== undefined && (
          <Modal.Footer
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Button onClick={() => setIcon(selectedFile)}>Set Image</Button>
          </Modal.Footer>
        )}
      </Modal>
    );
  };
  return (
    <div>
      <LoadingBox loading={loading}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <div
              className="screen"
              style={{ display: "flex", position: "relative" }}
            >
              <Sidebar isSidebar={isSidebar} />

              <Container style={{ padding: "20px" }}>
                <Heading
                  style={{
                    fontWeight: "lighter",
                    fontSize: "35px",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    margin: "0px",
                  }}
                >
                  Home
                </Heading>
                <br></br>

                <p
                  style={{
                    color: "#505a5f",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    margin: "10px",
                  }}
                >
                  Use this service to create, manage, and publish your sites.
                </p>
                <br></br>
                <Container>
                  <div
                    style={{
                      float: "right",
                    }}
                  >
                    <Button onClick={() => visitSite()}>Publish site</Button>
                  </div>
                  <div
                    style={{
                      float: "left",
                    }}
                  >
                    <Button onClick={() => visitSite()}>Preview site</Button>
                  </div>
                  <br></br>
                </Container>
                <br></br>
                <br></br>

                {options !== undefined && (
                  <Container
                    style={{
                      borderStyle: "solid",
                      borderRadius: "20px",
                      borderWidth: "1px",
                    }}
                  >
                    <br></br>
                    <Divider>Select Company</Divider>
                    <br></br>
                    <Heading
                      style={{
                        fontWeight: "lighter",
                        fontSize: "35px",
                        margin: "5px",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      Link Company to Web Application
                    </Heading>
                    <br></br>
                    <p
                      style={{
                        color: "#505a5f",
                        margin: "5px",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      In order for you to publish this site, you must select a
                      company from your profile.
                    </p>

                    <Select
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                      input={{
                        name: "group1",
                        onChange: (event) => {
                          setSelectedOption(event.target.value);
                        },
                      }}
                      label="Company"
                    >
                      {options?.map((option, index) => (
                        <option value={index} key={index}>
                          {option.company_name}
                        </option>
                      ))}
                    </Select>
                    <br></br>
                    <br></br>
                    <div
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    ></div>
                    <br></br>
                  </Container>
                )}
                <br></br>

                <Container
                  style={{
                    borderStyle: "solid",
                    borderRadius: "20px",
                    borderWidth: "1px",
                  }}
                >
                  <br></br>
                  <Divider>Site Details</Divider>
                  <br></br>
                  <Heading
                    style={{
                      fontWeight: "lighter",
                      fontSize: "35px",
                      margin: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    Add your site details
                  </Heading>
                  <br></br>
                  <p
                    style={{
                      color: "#505a5f",
                      margin: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    This is how your service will appear in the services page so
                    it's important that people know what your site is about.
                  </p>

                  <br></br>

                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    {renderAdditionalSiteNameFields === false ? (
                      <Button onClick={() => renderNameField()}>
                        Add site details
                      </Button>
                    ) : (
                      <Container>
                        <InputField
                          input={{
                            name: "domain",
                            required: true,
                            //value: formValues.domain,
                            //onChange: updateData,
                          }}
                        >
                          <div
                            style={{
                              margin: "5px",
                              justifyContent: "center",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            Site Name
                          </div>
                        </InputField>
                        <br></br>

                        <div
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <center>
                            <p
                              style={{
                                color: "#505a5f",
                                margin: "5px",
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              This is your site icon that will appear in the
                              application list.
                            </p>
                            <br></br>
                            <Button onClick={() => setModalShow(true)}>
                              Upload Site Icon
                            </Button>
                            {imageIcon !== undefined ? (
                              <center>
                                <p>Image Preview:</p>

                                <img
                                  src={preview}
                                  style={{
                                    maxHeight: "275px",
                                    maxWidth: "275px",
                                  }}
                                />
                              </center>
                            ) : (
                              <div></div>
                            )}
                            <FileUploadModel
                              show={modalShow}
                              onHide={() => setModalShow(false)}
                            />
                          </center>
                        </div>
                      </Container>
                    )}
                  </div>
                  <br></br>
                </Container>
                <br></br>

                <Container
                  style={{
                    borderStyle: "solid",
                    borderRadius: "20px",
                    borderWidth: "1px",
                  }}
                >
                  <br></br>
                  <Divider>Edit your domain</Divider>
                  <br></br>
                  <Heading
                    style={{
                      fontWeight: "lighter",
                      fontSize: "35px",
                      margin: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    Rename your domain
                  </Heading>
                  <br></br>
                  <p
                    style={{
                      color: "#505a5f",
                      margin: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    Create a domain that is easily accessible to all users
                    across the web.
                  </p>
                  <InputField
                    input={{
                      name: "domain",
                      required: true,
                      value: formValues.domain,
                      onChange: updateData,
                    }}
                  >
                    <div
                      style={{
                        margin: "5px",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      Domain Name:
                    </div>
                  </InputField>
                  <br></br>

                  <br></br>
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Button style={{ margin: "5px" }}>Search domain </Button>
                    <Button style={{ margin: "5px" }}>Save domain</Button>
                  </div>
                  <br></br>
                </Container>
              </Container>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </LoadingBox>
    </div>
  );
}

export default SiteHome;
