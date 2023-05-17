import React, { useEffect, useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { MainHeading } from "../../../globalStyles";
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import Table from "react-bootstrap/Table";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { BarLoader } from "react-spinners";
import { Button, SearchBox } from "govuk-react";
import DynamicPage from "./DynamicPage";
import { display } from "@mui/system";
import { object } from "prop-types";
import { Portal } from "react-is";


export const ListPortals = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [endpoint, setPortalEndpoint] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleChange = (event) => {
    const searchValue = (event.target.value || "").toLowerCase();
    let filtered;
    if (data && data.length > 0){
      filtered = data.filter((portal) =>
      portal.name && portal.name.toLowerCase().includes(searchValue)
      );
    } else {
      filtered = [];
    }
    
    setFilteredData(filtered);
    setSearch(searchValue);
  };

  function PortalCard({ portal }){
    const handleClick = () => {
      handleRowClick(portal);
    };
    const portalName = portal.name ? portal.name.toLowerCase(): "";
    return(
      <div 
        style={{
          borderRadius: "10px",
          backgroundColor: "#d9d9d9",
          padding: "10px",
          margin: "10px",
          boxShadow: "0 2px 2px rgba(0, 0, 0, 0,1)",
          width: "100px",
          height: "105px",
          display: "inline-block",
          textAlign: "center",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "120px",
          fontSize : "14px",
        }}
        onClick={handleClick}>
        <img src={process.env.PUBLIC_URL + '/img/city.png'} alt="Logo" style={{width: "50%", borderRadius: "10px 0 0 10px"}}
            height="30"
            className="d-inline-block align-top"
          />
        <p style={{marginTop:"10px", textAlign: "center", maxWidth: "100px", fontSize: "14px,"}}>{portalName || "Undefined"}</p>
      </div>
    );
  }

  function ListSchemesBreadcrumb() {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>

        <Breadcrumb.Item active>Portals</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/portals`)
      .then((response) => response.json())
      .then((data) => setData(data), setLoaded(true));
  }, []);

  const handleRowClick = (row) => {
    navigate(`/digital-services/portal/${row.endpoint}/pages/${1}`);
  };
  const handleClick = () => {
    navigate("/portal-creator-landing-page");
  };
  return (
    <div className="container">
      <br></br>
      {loaded === false && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <BarLoader loading={loaded} size={200} />
        </div>
      )}
      {endpoint && <DynamicPage />}
      <div>
        {loaded === true && (
          <div>
            <ListSchemesBreadcrumb />{" "}
            {sessionStorage.getItem("Citizen_ID") !== null && (
              <div style={{ float: "right" }}>
                <Button onClick={handleClick}>Create a web application</Button>
              </div>
            )}
            <br></br>
            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
              Applications
            </MainHeading>
            <Divider style={{ background: "black" }}></Divider>
            <br></br>
            <SearchBox>
              <SearchBox.Input
                placeholder="Search SSSP"
                onChange={handleChange}
              />
              <SearchBox.Button />
            </SearchBox>
            <Table>
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th style={{ textAlign: "center" }}>Application List</th>
                </tr>
              </thead>
            </Table>
            <div id="cards" style={{display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start"}}>
            {(search ? filteredData : data).map((portal) => (
              <PortalCard key={portal.id} portal={portal}/>
            ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};