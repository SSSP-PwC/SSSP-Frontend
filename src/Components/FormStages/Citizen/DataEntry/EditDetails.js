import React, { useEffect, useState } from "react";

import { Button, H3, H4, Heading, InputField } from "govuk-react";
import { Divider } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function EditDetails() {
  const [citizen, setCitizen] = useState([]);
  const [companyCount, setCompanyCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState([]);
  const id = sessionStorage.getItem("Citizen_ID");
  console.log(citizen)
  const { state } = useLocation();
  console.log(state)
  const [formValues, setFormValues] = useState({
    first_name: state.first_name,
    last_name: state.last_name,
    email: state.email,
      address_line_1: state.address.address_line_1,
      address_line_2: state.address.address_line_2,
      postal_code: state.address.postal_code,
      town_city: state.address.town_city
    
  });
  const handleProfileUpdate = () => {
    const data = {
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      email: formValues.email,
      address: {
        address_line_1: formValues.address_line_1,
        address_line_2: formValues.address_line_2,
        town_city: formValues.town_city,
        postcode: formValues.postal_code,
      },
    };

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
        setData(response)
        console.log(response)
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
     
      })
      .catch((error) => console.log(error));
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

    fetchCitizen();
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
              <H3>Edit Account Details</H3>
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
                    <InputField
                      style={{ margin: "12px" }}
                      input={{
                        name: "first_name",
                        required: true,
                        value: formValues.first_name,
                        onChange: updateData,
                      }}
                    >
                      First Name
                    </InputField>
                  </tr>

                  <tr>
                    <InputField
                      style={{ margin: "12px" }}
                      input={{
                        name: "last_name",
                        required: true,
                        value: formValues.last_name,
                        onChange: updateData,
                      }}
                    >
                      Last Name
                    </InputField>
                  </tr>
                  <tr>
                    <InputField
                      style={{ margin: "12px" }}
                      input={{
                        name: "email",
                        required: true,
                        value: formValues.email,
                        onChange: updateData,
                      }}
                    >
                      Email
                    </InputField>
                  </tr>
                  <tr>
                    <InputField
                      style={{ margin: "12px" }}
                      input={{
                        name: "address_line_1",
                        required: true,
                        value: formValues.address_line_1,
                        onChange: updateData,
                      }}
                    >
                      Address Line 1
                    </InputField>
                  </tr>
                  <tr>
                    <InputField
                      style={{ margin: "12px" }}
                      input={{
                        name: "address_line_2",
                        required: true,
                        value: formValues.address_line_2,
                        onChange: updateData,
                      }}
                    >
                      Address Line 2
                    </InputField>
                  </tr>
                  <tr>
                    <InputField
                      style={{ margin: "12px" }}
                      input={{
                        name: "town_city",
                        required: true,
                        value: formValues.town_city,
                        onChange: updateData,
                      }}
                    >
                      Town/City
                    </InputField>
                  </tr>
                  <tr>
                    <InputField
                      style={{ margin: "12px" }}
                      input={{
                        name: "postal_code",
                        required: true,
                        value: formValues.postal_code,
                        onChange: updateData,
                      }}
                    >
                      Postal Code
                    </InputField>
                  </tr>
                </tbody>
              </table>
              <Button onClick={handleProfileUpdate}>Submit</Button>
              <br></br>
              <br></br>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
