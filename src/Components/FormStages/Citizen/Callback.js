import { Divider, ImageList, ImageListItem } from "@mui/material";
import { Caption, Heading, Label, SearchBox, Spinner } from "govuk-react";
import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";

export default function CallBack() {
  const queryParams = queryString.parse(window.location.search);
  const consent = queryParams.consent;

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {

      navigate("/wallet/account", {
        state: {
          response: response.data,
          consent_token: consent,
        },
      });
    }
    fetchData();
  }, []);

  return (
    <div
      className="container"
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Spinner fill="black" height="256px" width="256px" />
    </div>
  );
}
