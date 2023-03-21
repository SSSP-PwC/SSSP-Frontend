import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Button, Heading, InputField } from "govuk-react";
import { Divider } from "@mui/material";
export default function PersonalProfile() {
  const [citizen, setCitizen] = useState(null);
  const [companyCount, setCompanyCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState("");
  const id = sessionStorage.getItem("Citizen_ID");
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address_line_1: "",
    address_line_2: "",
    postal_code: "",
    town_city: "",
    
  });
  const handleProfileUpdate = () => {
    const data = {
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      email: formValues.email,
      citizen_address: {
        address_line_1: formValues.address_line_1,
        address_line_2: formValues.address_line_2,
        town_city: formValues.town_city,
        postcode: formValues.postal_code
      }
      
    };
        console.log(data)

    fetch(`https://sssp-378808.nw.r.appspot.com/api/edit_citizen/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Profile updated successfully:', data);
    })
    .catch(error => {
      console.error('Error updating profile:', error);
    });
  }
  
  const updateData = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    console.log(formValues);
  };

  const citizen_id = sessionStorage.getItem("Citizen_ID");

  useEffect(() => {
    async function fetchCitizen() {
      const response = await fetch(
        `https://sssp-378808.nw.r.appspot.com/api/${citizen_id}`
      );
      const data = await response.json();
      setCitizen(data);
      setLoaded(true);
    }
    async function fetchCompanies() {
      const response = await fetch(
        `https://sssp-378808.nw.r.appspot.com/api/citizen/${citizen_id}/companies`
      );
      const data = await response.json();
      if (data.message?.includes("No companies found for this citizen.")) {
        setCompanyCount(0);
        setLoaded(true);
      } else {
        setCompanyCount(data.length);
        setLoaded(true);
      }
    }

    fetchCitizen();
    fetchCompanies();
  }, [1]);
  const toggleEditing = () => {
    setEditing(!editing);
  };

  return (
    <section>
      {loaded === false ? (
        <div>Loading...</div>
      ) : (
        <div>
          {editing === false && (
            <MDBContainer className="py-5 h-100">
              <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol lg="10" xl="0">
                  <MDBCard>
                    <div style={{ height: "200px" }}>
                      <div
                        style={{
                          marginTop: "50px",
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                      >
                        <Heading>Profile</Heading>
                        <Divider style={{ background: "black" }}></Divider>
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <MDBRow>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Name</MDBTypography>
                          <MDBCardText className="text-muted">
                            {citizen.first_name} {citizen.last_name}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Email</MDBTypography>
                          <MDBCardText className="text-muted">
                            {citizen.email}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Address Line 1</MDBTypography>
                          <MDBCardText className="text-muted">
                            {citizen.citizen_address.address_line_1}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Address Line 2</MDBTypography>
                          <MDBCardText className="text-muted">
                            {citizen.citizen_address.address_line_2}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Postcode</MDBTypography>
                          <MDBCardText className="text-muted">
                            {citizen.citizen_address.postcode}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Town/City</MDBTypography>
                          <MDBCardText className="text-muted">
                            {citizen.citizen_address.town_city}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </div>
                    <div
                      className="ms-4 mt-5 d-flex flex-column"
                      style={{
                        width: "150px",

                        position: "relative",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <br></br>
                      <br></br>
                      <Button
                        onClick={toggleEditing}
                        outline
                        color="dark"
                        style={{ height: "36px", overflow: "visible" }}
                      >
                        Edit profile
                      </Button>
                    </div>
                    <div
                      className="p-4 text-black"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <div className="d-flex justify-content-end text-center py-1">
                        <div>
                          <MDBCardText className="mb-1 h5">
                            {companyCount}
                          </MDBCardText>
                          <MDBCardText className="small text-muted mb-0">
                            Companies
                          </MDBCardText>
                        </div>
                        <div className="px-3">
                          <MDBCardText className="mb-1 h5">0</MDBCardText>
                          <MDBCardText className="small text-muted mb-0">
                            Schemes
                          </MDBCardText>
                        </div>
                      </div>
                    </div>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          )}
          {editing === true && (
            <MDBContainer className="py-5 h-100">
              <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol lg="10" xl="0">
                  <MDBCard>
                    <div style={{ height: "200px" }}>
                      <div
                        style={{
                          marginTop: "50px",
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                      >
                        <Heading>Profile</Heading>
                        <Divider style={{ background: "black" }}></Divider>
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <MDBRow>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">First Name</MDBTypography>
                          <InputField
                            style={{ margin: "12px" }}
                            input={{
                              name: "first_name",
                              required: true,
                              value: formValues.first_name,
                              onChange: updateData,
                            }}
                          ></InputField>
                          <br></br>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Last Name</MDBTypography>
                          <InputField
                            style={{ margin: "12px" }}
                            input={{
                              name: "last_name",
                              required: true,
                              value: formValues.last_name,
                              onChange: updateData,
                            }}
                          ></InputField>
                          <br></br>
                        </MDBCol>{" "}
                        <MDBRow>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Email</MDBTypography>
                            <MDBCardText className="text-muted">
                              <InputField
                                style={{ margin: "12px" }}
                                input={{
                                  name: "email",
                                  required: true,
                                  onChange: updateData,
                                }}
                              ></InputField>
                              <br></br>
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">
                              Address Line 1
                            </MDBTypography>
                            <InputField
                              style={{ margin: "12px" }}
                              input={{
                                name: "address_line_1",
                                required: true,
                                onChange: updateData,
                              }}
                            ></InputField>
                            <br></br>
                          </MDBCol>{" "}
                        </MDBRow>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Address Line 2</MDBTypography>
                          <InputField
                            style={{ margin: "12px" }}
                            input={{
                              name: "address_line_2",
                              required: true,
                              onChange: updateData,
                            }}
                          ></InputField>
                          <br></br>
                        </MDBCol>
                    
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Postcode</MDBTypography>
                          <InputField
                            style={{ margin: "12px" }}
                            input={{
                              name: "postal_code",
                              required: true,
                              onChange: updateData,
                            }}
                          ></InputField>
                          <br></br>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Town/City</MDBTypography>
                          <InputField
                            style={{ margin: "12px" }}
                            input={{
                              name: "town_city",
                              required: true,
                              onChange: updateData,
                            }}
                          ></InputField>
                          <br></br>
                        </MDBCol>
                      </MDBRow>
                    </div>
                    <div
                      className="ms-4 mt-5 d-flex flex-column"
                      style={{
                        width: "150px",

                        position: "relative",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <br></br>
                      <br></br>
                      <Button
                      onClick={handleProfileUpdate}
                        outline
                        color="dark"
                        style={{ height: "36px", overflow: "visible" }}
                      >
                        Submit
                      </Button>
                    </div>
                    <div
                      className="p-4 text-black"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <div className="d-flex justify-content-end text-center py-1">
                        <div>
                          <MDBCardText className="mb-1 h5">
                            {companyCount}
                          </MDBCardText>
                          <MDBCardText className="small text-muted mb-0">
                            Companies
                          </MDBCardText>
                        </div>
                        <div className="px-3">
                          <MDBCardText className="mb-1 h5">0</MDBCardText>
                          <MDBCardText className="small text-muted mb-0">
                            Schemes
                          </MDBCardText>
                        </div>
                      </div>
                    </div>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          )}
        </div>
      )}
    </section>
  );
}
