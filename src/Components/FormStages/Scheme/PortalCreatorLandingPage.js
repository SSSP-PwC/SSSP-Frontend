import { Divider } from "@mui/material";
import {
  Button,
  ErrorText,
  InputField,
  Label,
  Radio,
  Select,
  ErrorSummary,
  LoadingBox,
} from "govuk-react";
import React, { useEffect, useState } from "react";
import { MainHeading } from "../../../globalStyles";
import { useNavigate } from "react-router-dom";

const PortalCreatorLandingPage = () => {
  const [pageTitle, setPageTitle] = useState("");
  const id = sessionStorage.getItem("Citizen_ID");
  const [pageUrl, setPageUrl] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(0 + 1);
  const [portalExists, setPortalExists] = useState(false);
  const [companyExists, setCompanyExists] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`https://sssp-378808.nw.r.appspot.com/api/citizen/${id}/companies`)
      .then((response) => response.json())
      .then((data) => {
        if (data?.message?.includes("No companies found for this citizen.")) {
          setCompanyExists(false);
          setLoading(false);
        } else {
          setLoading(false);
          setCompanyExists(true);
          setOptions(data);
        }
      });
  }, [id]);

  const handleYes = () => {
    navigate("/register-company-landing")
  };
  const handleNo = () => {
    navigate("/")
  };

  const navigate = useNavigate();
  const hasWhiteSpace = (s) => {
    return /\s/.test(s);
  };
  const handleClick = () => {
    navigate("/portal-domain");
  };

  return (
    <div>
      <LoadingBox loading={loading}>
        {companyExists === true ? (
          <div>
            <br></br>
            <div className="container" style={{ padding: "30px" }}>
              <span style={{ fontSize: "55px" }}>
                Welcome to the SSSP Page Builder Service.
              </span>
              <br></br>
              <br></br>
              <p style={{ color: "#505a5f" }}>
                Publish your own website in minutes. It's only a few clicks
                away.
              </p>
              <br></br>
              <Button onClick={handleClick}>Get Started</Button>
            </div>
            <img
              src={process.env.PUBLIC_URL + "/img/PageBuilderImage.png"}
              style={{
                width: "100%",
                alignSelf: "center",
                top: "0",
              }}
            />
          </div>
        ) : (
          <div className="container" style={{ padding: "30px" }}>
            <MainHeading>
              You do not currently have a company associated with your account.
            </MainHeading>
            <p style={{ color: "#505a5f" }}>
              Would you like to associate a company with your account?
            </p>
            <Radio onClick={handleYes}>Yes</Radio>
            <Radio onClick={handleNo}>No</Radio>
          </div>
        )}
      </LoadingBox>
    </div>
  );
};

export default PortalCreatorLandingPage;
