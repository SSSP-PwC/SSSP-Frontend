import { Table } from "react-bootstrap";
import { Caption, Heading, Label } from "govuk-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Divider, ImageList, ImageListItem } from "@mui/material";

export default function DisplayTransactions() {
    const [accountTransactions, setAccountTransactions] = useState([]);
    const [error, setError] = useState(null);
    const { accountId, consentToken } = useParams();

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`/wallet/account_transaction/${accountId}/${consentToken}`);
          const data = await response.json();
          console.log(data)
          setAccountTransactions(data);
        } catch (error) {
          setError(error.message);
        }
      };
  
      fetchData();
    }, [accountId, consentToken]);
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  return (
    <div className="container">
      <br />
      <Heading>Account</Heading>
      <Divider style={{ backgroundColor: "black" }} />
      <br />
      <Caption>Select your account</Caption>
      <div>
        <br />
      </div>
      <br />
    </div>
  );
}
