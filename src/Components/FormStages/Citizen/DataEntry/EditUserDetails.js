import React, { useEffect, useState } from "react";
import {
  Button,
  Heading,
  InputField,
} from "govuk-react";
import { Divider } from "@mui/material";

export default function EditUserDetails() {
  const [loaded, setLoaded] = useState(false);



  //
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    citizen_address: {
      address_line_1: "",
      address_line_2: "",
      postcode: "",
      town_city: ""
    }
  });
  const queryParameters = new URLSearchParams(window.location.search);
  const email = queryParameters.get("email");
  useEffect(() => {
    async function fetchCitizen() {
      const response = await fetch(
        `http://172.20.10.2:2000/api/citizen/${email}`
      );
      const data = await response.json();
      setData(data);
      setLoaded(true);
    }

    fetchCitizen();
  }, []);
  const updateData = (event) => {
    const { name, value } = event.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setData((prevState) => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value,
        },
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

  };
  
  return (
    <div className="container">
      <br></br>
      <Heading>User Details</Heading>
      <Divider style={{ backgroundColor: "black" }}></Divider>
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
                onChange: updateData,
                value: data.first_name,
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
                onChange: updateData,
                value: data.last_name,
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
                onChange: updateData,
                value: data.email,
              }}
            >
              Email
            </InputField>
          </tr>
          <tr>
            <InputField
              style={{ margin: "12px" }}
              input={{
                name: "citizen_address.address_line_1",
                onChange: updateData,
                value: data.citizen_address.address_line_1,
              }}
            >
              Address Line 1
            </InputField>
          </tr>
          <tr>
            <InputField
              style={{ margin: "12px" }}
              input={{
                name: "citizen_address.address_line_2",
                onChange: updateData,
                value: data.citizen_address.address_line_2,
              }}
            >
              Address Line 2
            </InputField>
          </tr>
          <tr>
            <InputField
              style={{ margin: "12px" }}
              input={{
                name: "citizen_address.town_city",
                onChange: updateData,
                value: data.citizen_address.town_city,
              }}
            >
              Town/City
            </InputField>
          </tr>
          <tr>
            <InputField
              style={{ margin: "12px" }}
              input={{
                name: "citizen_address.postcode",
                onChange: updateData,
                value: data.citizen_address.postcode,
              }}
            >
              Postal Code
            </InputField>
          </tr>
        </tbody>
      </table>
      <Button>Submit</Button>
      <br></br>
      <br></br>
    </div>
  );
}
