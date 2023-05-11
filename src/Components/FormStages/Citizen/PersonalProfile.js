import React, { useEffect, useState } from "react";

import { Button, H3, H4, Heading, InputField } from "govuk-react";

import { Divider } from "@mui/material";
import { Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/edit-details", {
      state: {
        first_name: citizen.first_name,
        last_name: citizen.last_name,
        email: citizen.email,
        address: {
          address_line_1: citizen.citizen_address.address_line_1,
          address_line_2: citizen.citizen_address.address_line_2,
          town_city: citizen.citizen_address.town_city,
          postal_code: citizen.citizen_address.postcode,
        },
      },
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

  const BankAccountDetails = () => {
    const navigate = useNavigate();
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Bank Name</th>
            <th>Bank Account Number</th>
          </tr>
        </thead>
        <tbody>
          {data.map((company, index) => (
            <tr key={company.company_id}>
              <td>{index + 1}</td>
              <td>
                <Link
                  to={`/company-details/${index + 1}`}
                  onClick={() => navigate(`/company-details/${index + 1}`)}
                >
                  {company.company_name}
                </Link>
              </td>
              <td>{company.company_registration_number}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const Companies = () => {
    const navigate = useNavigate();
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
              <td>
                <Link
                  to={`/company-details/${index + 1}`}
                  onClick={() => navigate(`/company-details/${index + 1}`)}
                >
                  {company.company_name}
                </Link>
              </td>
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
    async function fetchCompanyData() {
      const response = await fetch(
        `https://sssp-378808.nw.r.appspot.com/api/company/${citizen_id}/companies`
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
          <div>
            <br></br>
            <Heading>Account</Heading>
            <Divider style={{ backgroundColor: "black" }}></Divider>
            <br></br>
            <H3 style={{ fontWeight: "normal" }}>Hi, {citizen.first_name}.</H3>
            <br></br>
            <br></br>
            <H3>Account Details</H3>
            <br />
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
                <label onClick={handleEditProfile}>
                  {" "}
                  <Link>here</Link>
                </label>
                .
              </small>
            </Form.Group>
            <br></br>

            <H3>Companies</H3>
            <br></br>
            <Companies />
            <br></br>

            <H3>Bank Account Details</H3>
            <BankAccountDetails />

            <br></br>
          </div>
        </div>
      )}
    </div>
  );
}
