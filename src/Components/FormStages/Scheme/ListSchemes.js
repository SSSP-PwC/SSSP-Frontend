import React, { useEffect, useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import Table from "react-bootstrap/Table";
import { SchemeDetails } from "./SchemeDetails";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { BarLoader } from "react-spinners";
import { Button } from "govuk-react";

export const ListSchemes = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [schemeId, setSchemeId] = useState(null);
  const [loaded, setLoaded] = useState(false);

  function ListSchemesBreadcrumb() {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>

        <Breadcrumb.Item active>Schemes</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
  useEffect(() => {
    fetch(
      "https://20230226t215147-dot-sssp-378808.nw.r.appspot.com/api/get-schemes"
    )
      .then((response) => response.json())
      .then((data) => setData(data["schemes"]), setLoaded(true));
  }, [data["schemes"]]);

  const handleRowClick = (row) => {
    console.log(row.scheme_id);
    setSchemeId(row.scheme_id);
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
      {schemeId ? (
        <div>
          <SchemeDetails schemeId={schemeId} />
        </div>
      ) : (
        <div>
          {loaded === true  && (
            <div>
              <ListSchemesBreadcrumb />{" "}
              <div style={{ float: "right" }}>
                
                <Button>Register a scheme</Button>
              </div>
              <br></br>
              <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                All Schemes
              </MainHeading>
              <Divider style={{ background: "black" }}></Divider>
              <br></br>
              <Table bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Scheme</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.scheme_id} onClick={() => handleRowClick(row)}>
                      <Link>
                        <td>{row.scheme_title}</td>
                      </Link>
                      <td>{row.scheme_start_date}</td>
                      <td>{row.scheme_end_date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
