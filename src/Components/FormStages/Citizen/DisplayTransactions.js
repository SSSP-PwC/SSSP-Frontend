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
      const response = await fetch(
        `https://sssp-378808.nw.r.appspot.com/api/wallet/account_transaction/${accountId}/${consentToken}`
      );
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
    <div className="container" style={{ padding: "20px" }}>
      <Heading style={{ fontSize: "2em" }}>Transaction History</Heading>
      <br />
      <Divider style={{ backgroundColor: "black", margin: "20px 0" }} />
      {error ? (
        <div style={{ color: "red", fontWeight: "bold" }}>Error: {error}</div>
      ) : (
        <>
          <Caption>Your transactions</Caption>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                  }}
                >
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>
                    <DisplayBalance
                      currency={transaction.currency}
                      balance={transaction.amount}
                    />
                  </td>
                  <td>{transaction.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
