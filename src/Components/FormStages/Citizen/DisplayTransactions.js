import { Table } from "react-bootstrap";
import { Caption, Heading, Label } from "govuk-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Divider, ImageList, ImageListItem } from "@mui/material";
import currencyFormatter from "currency-formatter";



export default function DisplayTransactions() {


  const Accounts = () => {
    return (
      <div>
      
      </div>
    );
  };

  return (
    <div className="container">
      <br />
      <Heading>Account</Heading>
      <Divider style={{ backgroundColor: "black" }} />
      <br />
      <Caption>Select your account</Caption>
      <div>
        <br />
        <Accounts />
      </div>
      <br />
    </div>
  );
}
