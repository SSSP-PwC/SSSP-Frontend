import { Divider } from "@mui/material";
import currencyFormatter from "currency-formatter";
import { Caption, Heading } from "govuk-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



export default function DisplayTransactions() {
    const [transactions, setAccountTransactions] = useState([]);
    const [error, setError] = useState(null);
    const { accountId, consentToken } = useParams();

    function DisplayBalance({ currency, balance }) {
        const formattedBalance = currencyFormatter.format(balance, {
          code: currency,
        });
        return <div>{formattedBalance}</div>;
      }
  
    const fetchData = async () => {
      try {
        const response = await fetch(`https://sssp-378808.nw.r.appspot.com/api/wallet/account_transaction/${accountId}/${consentToken}`);
        const data = await response.json();
        setAccountTransactions(data.data);
      } catch (error) {
        setError(error.message);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, [accountId, consentToken]);
  
    return (
      <div className="container">
        <br></br>
        <Heading>Transaction History</Heading>
        <Divider style={{ backgroundColor: "black" }} />
        <br />
        {error ? (
        <div style={{ color: 'red', fontWeight: 'bold' }}>Error: {error}</div>
      ) : (
          <>
            <Caption>Your transactions</Caption>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {transactions.map((transaction) => (
              <li key={transaction.id} style={{ margin: '10px 0', padding: '10px', border: '1px solid black' }}>
              <p>
                    Date: {new Date(transaction.date).toLocaleDateString()}
                  </p>
                  <p style={{ marginBottom: '5px' }}>Amount: <DisplayBalance currency={transaction.currency} balance = {transaction.amount}/></p>
                  <p style={{ marginBottom: '5px' }}>Description: {transaction.description}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
