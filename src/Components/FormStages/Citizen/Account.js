import { Table } from "react-bootstrap";
import { Caption, Heading, Label } from "govuk-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Divider, ImageList, ImageListItem } from "@mui/material";
import currencyFormatter from "currency-formatter";

function SortCode({ code }) {
  let result = "";
  for (let i = 0; i < code.length; i += 2) {
    result += code.substring(i, i + 2);
    if (i + 2 < code.length) result += "-";
  }
  return <span>{result}</span>;
}

function DisplayBalance({ currency, balance }) {
  const formattedBalance = currencyFormatter.format(balance, {
    code: currency,
  });
  return <div>{formattedBalance}</div>;
}
function AccountItem({ item, index }) {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <tr key={item.id}>
      <td>{index + 1}</td>
      <Link
        to={`/wallet/account_transactions/${item.id}/${state.consent_token}`}
        onClick={() => navigate(`/wallet/account_transactions/${item.id}/${state.consent_token}`)}
      >
        {item.accountType}
      </Link>

      <td>
        {item.accountIdentifications.map((account, account_index) => (
          <span key={account_index}>
            {account.type === "SORT_CODE" ? (
              <>
                <SortCode code={account.identification} />
            <br></br>

              </>
            ) : (
             <>{account.identification}<br></br></> 
            )}
          </span>
        ))}
      </td>
      <td>
        <DisplayBalance currency={item.currency} balance={item.balance} />
      </td>
    </tr>
  );
}

export default function Account() {
  const { state } = useLocation();


  const Accounts = () => {
    const navigate = useNavigate();
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Account Type </th>
              <th>Account Identifiers</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {state.response.map((item, index) => (
              <AccountItem key={item.id} item={item} index={index} />
            ))}
          </tbody>
        </Table>
        <Label>
          Now that you have granted us access to your accounts, please select
          which one you want to view a transaction analysis for. We only request
          30 days of transactions.
        </Label>
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
