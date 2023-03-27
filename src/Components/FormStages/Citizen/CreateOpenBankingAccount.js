import React, { useEffect, useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Caption, Radio, Spinner } from "govuk-react";

export const CreateOpenBankingAccount = () => {
  const {
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [variantType, setVariantType] = useState("");
  const [userResponse, setUserResponse] = useState("");
  const citizenId = sessionStorage.getItem("Citizen_ID");

  const submitForm = async () => {
    const url = `https://sssp-378808.nw.r.appspot.com/api/${citizenId}`;

    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    const data = await response.json();
    const userId = data.email;

    const createUrl = `https://sssp-378808.nw.r.appspot.com/api/wallet/create_user/${userId}`;
    const createPayload = {
      applicationUserId: userId,
    };
    const createResponse = await fetch(createUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(createPayload),
    });

    const createData = await createResponse.json();
    console.log(createData);
    navigate(`/wallet`);
  };

  const selectedRadioButtonTwo = () => {
    navigate("/");
  };

  useEffect(() => {
    const checkUserExists = async () => {
      const url = `https://sssp-378808.nw.r.appspot.com/api/${citizenId}`;

      const headers = {
        "Content-Type": "application/json;charset=UTF-8",
      };

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      const data = await response.json();
      if (data.email) {
        const userId = data.email;
        const createUrl = `https://sssp-378808.nw.r.appspot.com/api/wallet/create_user/${userId}`;
        const createPayload = {
          applicationUserId: userId,
        };
        const createResponse = await fetch(createUrl, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(createPayload),
        });

        const createData = await createResponse.json();
        console.log(createData.error.status);

        if (createData.error.status === "CONFLICT") {
          setUserExists(true);
          setTimeout(() => {
            navigate("/credential-management");
          }, 3000);
        }
      }
    };

    checkUserExists();
  }, [citizenId]);

  return (
    <div className="container">
      <div className="form" style={{ marginTop: "20px" }}>
        {show ? (
          <>
            <Alert
              variant={variantType}
              onClose={() => {
                setShow(false);
              }}
              dismissible
            >
              <p>{userResponse}</p>
            </Alert>
          </>
        ) : (
          <div></div>
        )}
        <div>
            <div>
              <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                Digital Wallet
              </MainHeading>

              <p style={{ color: "#0B0C0C" }}>
                Would you like to link your bank account details to your citizen
                profile?
              </p>

              <Form.Group>
                <Form>
                  <>
                    <Radio name="group1" onClick={submitForm}>
                      Yes
                    </Radio>
                    <Radio name="group1" onClick={selectedRadioButtonTwo}>
                      No
                    </Radio>
                  </>
                </Form>
              </Form.Group>
              <br></br>
            </div>
        
        </div>
      </div>
    </div>
  );
};
