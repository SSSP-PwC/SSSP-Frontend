import { Divider, ImageList, ImageListItem } from "@mui/material";
import { Caption, Heading, Label, SearchBox, Spinner } from "govuk-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function LinkWalletAccount() {
    const { state } = useLocation();
  const institution_id = "modelo-sandbox"
  useEffect(() => {
    fetch(`https://sssp-378808.nw.r.appspot.com/api/wallet/link-consent-to-profile/${institution_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${state.consent_token}`
      },
      body: JSON.stringify({
        user_uuid: "a3ce1444-3b09-4fd5-93cc-fe632921b53b",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      });

  }, []);
  return (
    <div className="container">
      <br />
      <Heading>Link Account</Heading>
      <Divider style={{ backgroundColor: "black" }} />
      <div></div>
    </div>
  );
}
