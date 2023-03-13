import { Divider } from "@mui/material";
import { Button, InputField } from "govuk-react";
import React, { useState } from "react";
import { MainHeading } from "../../../globalStyles";
import { useNavigate } from "react-router-dom";

const RegisterPortal = () => {
  const [pageTitle, setPageTitle] = useState("");
  const [pageUrl, setPageUrl] = useState("");

  const [portal_id, setPortalID] = useState();
  const [tabs, setTabs] = useState([
    {
      title: "Portal",
      endpoint: "/",
    },
  ]);

  const navigate = useNavigate();
  const defaultProps = {
    label: "",
    type: "",

    onChange: () => {},
    // Add all other expected properties here
  };
  const createPortal = async () => {
    try {
      // Check if endpoint already exists
      const response = await fetch(
        `https://sssp-378808.nw.r.appspot.com/api/portals/${pageUrl}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const existingPortal = data.endpoint === pageUrl;
      if (existingPortal) {
        console.log("Portal endpoint already exists");
        return;
      }

      // Create new portal
    } catch (error) {
      console.log(error);
      const response2 = await fetch("https://sssp-378808.nw.r.appspot.com/api/portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: pageTitle,
          endpoint: pageUrl,
        }),
      });
      if (!response2.ok) {
        throw new Error("Network response was not ok");
      }
      const data2 = await response2.json();
      console.log(data2);
      setPortalID(data2.id);
      navigate("/Page-Builder", {
        state: {
            portal_endpoint: pageUrl,
            portal_id: data2.id
        }
      })
      return data2.id;
    }
  };

  return (
    <div className="container">
      <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
        Page Builder
      </MainHeading>
      <p style={{ color: "#505a5f" }}>
        Use this service to build your own pages.
      </p>
      <Divider style={{ background: "black" }}></Divider>
      <br></br>
      <InputField
        input={{
          label: "Page Title",
          value: pageTitle,
          onChange: (e) => setPageTitle(e.target.value),
        }}
      >
        Page Title
      </InputField>
      <br></br>
      <InputField
        input={{
          label: "Page URL",
          value: pageUrl,
          onChange: (e) => setPageUrl(e.target.value),
        }}
      >
        Page URL
      </InputField>
      <br></br>
      <Button onClick={() => createPortal()}>Create Portal</Button>

      <br></br>
    </div>
  );
};

export default RegisterPortal;
