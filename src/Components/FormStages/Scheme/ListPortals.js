import React, { useEffect, useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import Table from "react-bootstrap/Table";
import { PortalDetails } from "./PortalDetails";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { BarLoader } from "react-spinners";
import { Button } from "govuk-react";
import DynamicPage from "./DynamicPage";

export const ListPortals = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [endpoint, setPortalEndpoint] = useState(null);
  const [loaded, setLoaded] = useState(false);

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
    navigate(`/page/${1}/${row.endpoint}`);
  };
  const handleClick = () => {
    navigate("/Register-Portal")
  }
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
                <Button onClick={handleClick}>Register a scheme</Button>
              </div>
              <br></br>
              <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                All Schemes
              </MainHeading>
              <Divider style={{ background: "black" }}></Divider>
              <br></br>
              <Table bordered hover size="sm">
                <thead style={{ textAlign: "center" }}>
                  <tr>
                    <th style={{ textAlign: "center" }}>Scheme</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((portal) => (
                    <tr key={portal.id} onClick={() => handleRowClick(portal)}>
                      {console.log(portal)}
                      <Link>
                        <td>{portal.name}</td>
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
