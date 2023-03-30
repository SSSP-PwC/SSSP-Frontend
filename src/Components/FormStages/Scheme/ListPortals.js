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

export const ListPortals = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [endpoint, setPortalEndpoint] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filtered = data.filter((portal) =>
      portal.name.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
    setSearch(searchValue);
  };

  function ListSchemesBreadcrumb() {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>

        <Breadcrumb.Item active>Portals</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
  useEffect(() => {
    fetch("https://sssp-378808.nw.r.appspot.com/api/portals")
      .then((response) => response.json())
      .then((data) => setData(data), setLoaded(true));
  }, []);

  const handleRowClick = (row) => {
    navigate(`/${row.endpoint}/pages/${1}`);
  };
  const handleClick = () => {
    navigate("/Register-Portal");
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
            <div style={{ float: "right" }}>
              <Button onClick={handleClick}>Create a web application</Button>
            </div>
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
              <tbody>
                {(search ? filteredData : data).map((portal) => (
                  <tr key={portal.id} onClick={() => handleRowClick(portal)}>
                    <Link>
                      <td style={{ fontSize: "24px" }}>{portal.name}</td>
                    </Link>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};
