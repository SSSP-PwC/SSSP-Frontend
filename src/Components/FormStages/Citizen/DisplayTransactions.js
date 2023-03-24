import { Table } from "react-bootstrap";
import { Caption, Heading, Label } from "govuk-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Divider, ImageList, ImageListItem } from "@mui/material";

export default function DisplayTransactions() {
    const [transactions, setAccountTransactions] = useState([]);
    const [error, setError] = useState(null);
    const { accountId, consentToken } = useParams();

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://sssp-378808.nw.r.appspot.com/api/wallet/account_transaction/${accountId}/${consentToken}`);
          const data = await response.json();
          console.log(data)
          setAccountTransactions(response.data.data);
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
      <Heading>Transaction History</Heading>
      <Divider style={{ backgroundColor: "black" }} />
      <br />
      <Caption>Your transactions</Caption>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <p>
              Date: {new Date(transaction.date).toLocaleDateString()}
            </p>
            <p>Amount: {transaction.amount}</p>
            <p>Description: {transaction.description}</p>
            <p>Currency: {transaction.currency}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}