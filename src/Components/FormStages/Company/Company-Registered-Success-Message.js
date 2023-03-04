import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCollapse from "react-collapsed";
import { Form } from "react-bootstrap";
import { BarLoader } from "react-spinners";
import { Panel, PhaseBanner } from "govuk-react";

export const CompanyRegisteredSuccessMessage = ({ }) => {

  return (
    <div style={{ display: "inline-block" }}>
        <div>
       
          <Panel
            title="Company registration complete"
            style={{ backgroundColor: "#00823B" }}
          >
            Activate your new account to subscribe to schemes.
            <br />
          </Panel>
        </div>
    </div>
  );
};
