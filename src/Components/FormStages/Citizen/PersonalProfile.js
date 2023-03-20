import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Button, Heading } from "govuk-react";
import { Divider } from "@mui/material";
export default function PersonalProfile() {
  const [citizen, setCitizen] = useState(null);
  const [companyCount, setCompanyCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchCitizen() {
      const response = await fetch(`http://192.168.68.119:1000/api/1`);
      const data = await response.json();
      setCitizen(data);
      console.log(data);
      setLoaded(true);
    }
    async function fetchCompanies() {
      const response = await fetch(
        `http://192.168.68.119:1000/api/citizen/1/companies`
      );
      const data = await response.json();
      setCompanyCount(data.length);
      setLoaded(true);
    }

    fetchCitizen();
    fetchCompanies();
  }, [1]);
  return (
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
      {loaded === false ? (
        <div>Loading...</div>
      ) : (
        <div className="gradient-custom-2">
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol lg="9" xl="7">
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
                    <Button
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
        </div>
      )}
    </section>
  );
}
