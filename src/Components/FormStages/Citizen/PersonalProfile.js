import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Button, H3, H4, Heading, InputField } from "govuk-react";
import { Divider } from "@mui/material";
import { Container, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
export default function PersonalProfile() {
  const [citizen, setCitizen] = useState(null);
  const [companyCount, setCompanyCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState([]);
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
        postcode: formValues.postal_code,
      },
    };
    console.log(data);

    fetch(`https://sssp-378808.nw.r.appspot.com/api/edit_citizen/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Profile updated successfully:", data);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };
  const fetchCompany = () => {
    fetch(`https://sssp-378808.nw.r.appspot.com/api/citizen/${id}/companies`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const Companies = () => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Company Name</th>
            <th>Company Number</th>
          </tr>
        </thead>
        <tbody>
          {data.map((company, index) => (
            <tr key={company.company_id}>
              <td>{index + 1}</td>
              <td>{company.company_name}</td>
              <td>{company.company_registration_number}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

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
    fetchCompany();
  }, []);
  const toggleEditing = () => {
    setEditing(!editing);
  };

  return (
    <div className="container">
      {loaded === false ? (
        <div>Loading...</div>
      ) : (
        <div>
          {editing === false && (
            <div>
              <br></br>
              <Heading>Account</Heading>
              <Divider style={{ backgroundColor: "black" }}></Divider>
              <br></br>
              <H3 style={{ fontWeight: "normal" }}>
                Hi, {citizen.first_name}.
              </H3>
              <br></br>
              <br></br>
              <H3>Account Details</H3>
              <br></br>
              <table
                style={{
                  borderSpacing: 0,
                  borderCollapse: "collapse",
                  width: "100%",
                  marginBottom: "20px",
                }}
              >
                <tbody>
                  <tr>
                    <th
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      First Name:
                    </th>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {citizen.first_name}
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      Last Name:
                    </th>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {citizen.last_name}
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      Email:
                    </th>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {citizen.email}
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      Address Line 1:
                    </th>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {citizen.citizen_address.address_line_1}
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      Address Line 2:
                    </th>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {citizen.citizen_address.address_line_2}
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      Town/City:
                    </th>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {citizen.citizen_address.town_city}
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      Postal Code:
                    </th>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {citizen.citizen_address.postcode}
                    </td>
                  </tr>
                </tbody>
              </table>
              <Form.Group>
                <small>
                  Edit your account details{" "}
                  <Link to="/register-citizen-landing">here</Link>.
                </small>
              </Form.Group>
              <br></br>

              <H3>Companies</H3>
              <br></br>
              <Companies />
    
              <br></br>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
