import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button, Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

export const EOISummary = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [variantType, setVariantType] = useState("");
    const [userResponse, setUserResponse] = useState("");
    var firstName = sessionStorage.getItem("EOI-First-Name")
    var lastName = sessionStorage.getItem("EOI-Last-Name")
    var email = sessionStorage.getItem("EOI-Email-Address")
    var phonenumber = sessionStorage.getItem("EOI-Phonenumber")
    var position = sessionStorage.getItem("EOI-Position-In-Company")
    var businessName = sessionStorage.getItem("EOI-Business-Name")
    var companyURL = sessionStorage.getItem("EOI-Company-URL")
    var companyNumber = sessionStorage.getItem("EOI-Company-Number")
    var productType = sessionStorage.getItem("EOI-Product-Type")
    var producerVendorStatus = sessionStorage.getItem("EOI-Producer-Vendor-Status")
    var productInformation = sessionStorage.getItem("EOI-Producer-Info")
    var privacyAgreed = sessionStorage.getItem("EOI-Privacy-Agreed")

    const submitForm = (data) => {
        alert("Post to Database")
        sessionStorage.clear()
        navigate("/");

    };
    return (
        <div className="container">
            <div
                className="form"
                style={{ marginTop: "70px", display: "inline-block" }}
            >
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
                <div style={{ display: "inline-block" }}>
                    <form style={{ display: "inline-block" }}>
                        <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                            Expression of Interest
                        </MainHeading>
                        <p style={{ color: "#505a5f" }}>
                            Section 5 of 5
                        </p>
                        <h6 style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                            Summary table
                        </h6>
                        <Form.Group>
                            <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                                First name:
                            </Form.Label>
                            <small>
                                {firstName}
                                <Link to="/change-first-name" style={{ float: "right" }}>
                                    Change
                                </Link>
                            </small>
                            <Divider></Divider>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                                Last name:
                            </Form.Label>
                            <small>
                                {lastName}
                                <Link to="/change-last-name" style={{ float: "right" }}>
                                    Change
                                </Link>
                            </small>
                            <Divider></Divider>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                                Email:
                            </Form.Label>
                            <small>
                                {email}
                                <Link to="/change-last-name" style={{ float: "right" }}>
                                    Change
                                </Link>
                            </small>
                            <Divider></Divider>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                                Phone number:
                            </Form.Label>
                            <small>
                                {phonenumber}
                                <Link to="/change-last-name" style={{ float: "right" }}>
                                    Change
                                </Link>
                            </small>
                            <Divider></Divider>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                                Business name:
                            </Form.Label>
                            <small>
                                {businessName}
                                <Link to="/change-last-name" style={{ float: "right" }}>
                                    Change
                                </Link>
                            </small>
                            <Divider></Divider>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                                Position in company:
                            </Form.Label>
                            <small>
                                {position}
                                <Link to="/change-last-name" style={{ float: "right" }}>
                                    Change
                                </Link>
                            </small>
                            <Divider></Divider>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                                Company website URL:
                            </Form.Label>
                            <small>
                                {companyURL}
                                <Link to="/change-last-name" style={{ float: "right" }}>
                                    Change
                                </Link>
                            </small>
                            <Divider></Divider>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                                Company number:
                            </Form.Label>
                            <small>
                                {companyNumber}
                                <Link to="/change-last-name" style={{ float: "right" }}>
                                    Change
                                </Link>
                            </small>
                            <Divider></Divider>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                                Product type:
                            </Form.Label>
                            <small>
                                {productType}
                                <Link to="/change-last-name" style={{ float: "right" }}>
                                    Change
                                </Link>
                            </small>
                            <Divider></Divider>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                                Product vendor status:
                            </Form.Label>
                            <small>
                                {producerVendorStatus}
                                <Link to="/change-last-name" style={{ float: "right" }}>
                                    Change
                                </Link>
                            </small>
                            <Divider></Divider>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                                Product information:
                            </Form.Label>
                            <small>
                                {productInformation}
                                <Link to="/change-last-name" style={{ float: "right" }}>
                                    Change
                                </Link>
                            </small>
                            <Divider></Divider>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ fontWeight: "bold", margin: "10px" }}>
                                I have read and agree to the privacy notice
                            </Form.Label>
                            <small>
                                {privacyAgreed}
                                <Link to="/change-last-name" style={{ float: "right" }}>
                                    Change
                                </Link>
                            </small>
                            <Divider></Divider>
                        </Form.Group>
                    
                    
                        
                        <br></br>
                        <Form.Group>
                            <Button
                                style={{ marginBottom: "15px" }}
                                onClick={handleSubmit(submitForm)}
                            >
                                Submit
                            </Button>
                        </Form.Group>
                        <br></br>
                    </form>

                </div>
            </div>
        </div>
    );
};
