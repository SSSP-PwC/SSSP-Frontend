import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button, Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
export const EOIContactInfo = () => {
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
    const [renderEmailField, setRenderEmailField] = useState(false)
    const [renderContactField, setRenderContactField] = useState(false)
    const [renderBusinessNameField, setRenderBusinessNameField] = useState(false);
    const [renderPositionField, setRenderPositionField] = useState(false);
    const [renderCompanyRegistrationAndWebsiteURLField, setRenderCompanyRegistrationAndWebsiteURLField] = useState(false);

    function formatAddress(address) {
        if (!address || !address.address_line_1 || !address.address_line_2 || !address.postal_code || !address.locality || !address.region || !address.country) {
            address.address_line_1 = address.address_line_1 || "N/A";
            address.address_line_2 = address.address_line_2 || "N/A";
            address.postal_code = address.postal_code || "N/A";
            address.locality = address.locality || "N/A";
            address.region = address.region || "N/A";
            address.country = address.country || "N/A";
        }
        return address;
    }




    const handleEmailAddressField = (data) => {
        sessionStorage.setItem("EOI-First-Name", data.FirstName)
        sessionStorage.setItem("EOI-Last-Name", data.LastName)
        setRenderEmailField(true)
    };
    const handleBusinessContactNumberField = (data) => {
        sessionStorage.setItem("EOI-Email-Address", data.email)
        setRenderContactField(true)
    };
    const handleBusinessPosition = (data) => {
        sessionStorage.setItem("EOI-Phonenumber", data.phonenumber)
        setRenderPositionField(true)
    };
    const handleBusinessName = (data) => {
        sessionStorage.setItem("EOI-Position-In-Company", data.businessname)
        setRenderBusinessNameField(true)
    }
    const handleCompanyRegistrationAndWebsiteURL = (data) => {
        sessionStorage.setItem("EOI-Business-Name", data.businessname)
        setRenderCompanyRegistrationAndWebsiteURLField(true)

    }
    const handleProductInformation = (data) => {
        if (data.company_number != undefined) {
            fetch(`https://proxy-service.ie3csgqmphchg.eu-west-1.cs.amazonlightsail.com/api/proxy?endpoint=company/${data.company_number}`)
                .then(response => response.json())
                .then(data => {
                           sessionStorage.setItem("EOI-Company-Number", data.company_number);

                })
                .catch(error => {
                });
        }
        else {
            console.log(data.company_url)
        }
        sessionStorage.setItem("EOI-Company-URL", data.company_url);

        navigate("/EOI-Product-Info")

    }
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
                {renderEmailField === false && renderContactField === false && renderBusinessNameField === false && renderPositionField === false && renderCompanyRegistrationAndWebsiteURLField === false &&
                    <div style={{ display: "inline-block" }}>
                        <form style={{ display: "inline-block" }}>
                            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                                Expression of Interest
                            </MainHeading>
                            <Divider></Divider>
                            <br></br>
                            <p style={{ color: "#505a5f" }}>
                                Section 1 of 5
                            </p>
                            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold", fontSize: "20px" }}>
                                Applicant name
                            </MainHeading>
                            <p style={{ color: "#0B0C0C" }}>
                                Please complete this section with your own details.
                            </p>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <p style={{ color: "#505a5f", fontSize: "12px" }}>
                                    First name of your full legal name as it appears on your passport
                                </p>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your first name"
                                    style={{ borderColor: "black", maxWidth: "500px" }}
                                    {...register("FirstName", { required: true, maxLength: 80 })}
                                />
                                {errors.FirstName && (
                                    <p style={{ color: "red" }}>
                                        <small>First Name is required</small>
                                    </p>
                                )}

                                {errors.FirstName?.type === "maxLength" && (
                                    <p style={{ color: "red" }}>
                                        <small>Max characters should be 80</small>
                                    </p>
                                )}
                            </Form.Group>
                            <br></br>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <p style={{ color: "#505a5f", fontSize: "12px" }}>
                                    Family name / surname of your full legal name as it appears on your passport
                                </p>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your last name"
                                    style={{ borderColor: "black", maxWidth: "500px" }}
                                    {...register("LastName", { required: true, maxLength: 80 })}
                                />

                                {errors.LastName && (
                                    <p style={{ color: "red" }}>
                                        <small>Last Name is required</small>
                                    </p>
                                )}
                                {errors.LastName?.type === "maxLength" && (
                                    <p style={{ color: "red" }}>
                                        <small>Max characters should be 80</small>
                                    </p>
                                )}
                            </Form.Group>
                            <br></br>

                            <br></br>
                            <Form.Group>
                                <Button
                                    style={{ marginBottom: "15px" }}
                                    onClick={handleSubmit(handleEmailAddressField)}
                                >
                                    Continue
                                </Button>
                            </Form.Group>
                            <br></br>

                        </form>
                    </div>
                }
                {renderEmailField === true && renderContactField === false && renderBusinessNameField === false && renderPositionField === false && renderCompanyRegistrationAndWebsiteURLField === false &&
                    <div style={{ display: "inline-block" }}>
                        <form style={{ display: "inline-block" }}>
                            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                                Expression of Interest
                            </MainHeading>
                            <Divider></Divider>
                            <br></br>
                            <p style={{ color: "#505a5f" }}>
                                Section 2 of 5
                            </p>
                            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold", fontSize: "20px" }}>
                                Business email address
                            </MainHeading>
                            <p style={{ color: "#0B0C0C" }}>
                                Please complete this section with your own details.
                            </p>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email address"
                                    style={{ borderColor: "black", maxWidth: "500px" }}
                                    {...register("email", { required: true, maxLength: 80 })}
                                />

                                {errors.email && (
                                    <p style={{ color: "red" }}>
                                        <small>Email is required</small>
                                    </p>
                                )}

                                {errors.email?.type === "maxLength" && (
                                    <p style={{ color: "red" }}>
                                        <small>Max characters should be 80</small>
                                    </p>
                                )}
                            </Form.Group>
                            <br></br>

                            <Form.Group>
                                <Button
                                    style={{ marginBottom: "15px" }}
                                    onClick={handleSubmit(handleBusinessContactNumberField)}
                                >
                                    Continue
                                </Button>
                            </Form.Group>
                            <br></br>

                        </form>
                    </div>
                }


                {renderEmailField === true && renderContactField === true && renderBusinessNameField === false && renderPositionField === false && renderCompanyRegistrationAndWebsiteURLField === false &&
                    <div style={{ display: "inline-block" }}>
                        <form style={{ display: "inline-block" }}>
                            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                                Expression of Interest
                            </MainHeading>
                            <Divider></Divider>
                            <br></br>
                            <p style={{ color: "#505a5f" }}>
                                Section 4 of 5
                            </p>
                            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold", fontSize: "20px" }}>
                                Business phone number
                            </MainHeading>
                            <p style={{ color: "#0B0C0C" }}>
                                Please complete this section with your own details.
                            </p>
                            <Form.Group>
                                <Form.Label>Phone number</Form.Label>
                                <PhoneInput
                                    placeholder="Enter business phone number"
                                    style={{ borderColor: "black", maxWidth: "500px" }}
                                    {...register("phonenumber", { required: true, maxLength: 80 })}
                                />


                                {errors.phonenumber && (
                                    <p style={{ color: "red" }}>
                                        <small>Phone number is required</small>
                                    </p>
                                )}

                            </Form.Group>
                            <br></br>

                            <Form.Group>
                                <Button
                                    style={{ marginBottom: "15px" }}
                                    onClick={handleSubmit(handleBusinessPosition)}
                                >
                                    Continue
                                </Button>
                            </Form.Group>
                            <br></br>

                        </form>
                    </div>

                }
                {renderEmailField === true && renderContactField === true && renderBusinessNameField === false && renderPositionField === true && renderCompanyRegistrationAndWebsiteURLField === false &&
                    <div style={{ display: "inline-block" }}>
                        <form style={{ display: "inline-block" }}>
                            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                                Expression of Interest
                            </MainHeading>
                            <Divider></Divider>
                            <br></br>
                            <p style={{ color: "#505a5f" }}>
                                Section 3 of 5
                            </p>
                            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold", fontSize: "20px" }}>
                                Business position
                            </MainHeading>
                            <p style={{ color: "#0B0C0C" }}>
                                Your role in the company
                            </p>
                            <Form.Group>
                                <Form.Label>Business position</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your role"
                                    style={{ borderColor: "black", maxWidth: "500px" }}
                                    {...register("businessposition", { required: true, maxLength: 80 })}
                                />

                                {errors.businessposition && (
                                    <p style={{ color: "red" }}>
                                        <small>Business position is required</small>
                                    </p>
                                )}

                                {errors.businessposition?.type === "maxLength" && (
                                    <p style={{ color: "red" }}>
                                        <small>Max characters should be 80</small>
                                    </p>
                                )}
                            </Form.Group>
                            <br></br>

                            <Form.Group>
                                <Button
                                    style={{ marginBottom: "15px" }}
                                    onClick={handleSubmit(handleBusinessName)}
                                >
                                    Continue
                                </Button>
                            </Form.Group>
                            <br></br>

                        </form>
                    </div>
                }
                {renderEmailField === true && renderContactField === true && renderBusinessNameField === true && renderPositionField === true && renderCompanyRegistrationAndWebsiteURLField === false &&
                    <div style={{ display: "inline-block" }}>
                        <form style={{ display: "inline-block" }}>
                            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                                Expression of Interest
                            </MainHeading>
                            <Divider></Divider>
                            <br></br>
                            <p style={{ color: "#505a5f" }}>
                                Section 3 of 5
                            </p>
                            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold", fontSize: "20px" }}>
                                Business name
                            </MainHeading>
                            <p style={{ color: "#0B0C0C" }}>
                                Please complete this section with your own details.
                            </p>
                            <Form.Group>
                                <Form.Label>Business name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter business name"
                                    style={{ borderColor: "black", maxWidth: "500px" }}
                                    {...register("businessname", { required: true, maxLength: 80 })}
                                />

                                {errors.businessname && (
                                    <p style={{ color: "red" }}>
                                        <small>Business name is required</small>
                                    </p>
                                )}

                                {errors.businessname?.type === "maxLength" && (
                                    <p style={{ color: "red" }}>
                                        <small>Max characters should be 80</small>
                                    </p>
                                )}
                            </Form.Group>
                            <br></br>

                            <Form.Group>
                                <Button
                                    style={{ marginBottom: "15px" }}
                                    onClick={handleSubmit(handleCompanyRegistrationAndWebsiteURL)}
                                >
                                    Continue
                                </Button>
                            </Form.Group>
                            <br></br>

                        </form>
                    </div>
                }
                {renderEmailField === true && renderContactField === true && renderBusinessNameField === true && renderPositionField === true && renderCompanyRegistrationAndWebsiteURLField === true &&
                    <div style={{ display: "inline-block" }}>
                        <form style={{ display: "inline-block" }}>
                            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                                Expression of Interest
                            </MainHeading>
                            <Divider></Divider>
                            <br></br>
                            <p style={{ color: "#505a5f" }}>
                                Section 3 of 5
                            </p>
                            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold", fontSize: "20px" }}>
                                Companies House Registration Number and Website URL
                            </MainHeading>
                            <p style={{ color: "#0B0C0C" }}>
                                Please complete this section with your own details.
                            </p>
                            <Form.Group>
                                <Form.Label>Company Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter companies house registration number"
                                    style={{ borderColor: "black", maxWidth: "500px" }}
                                    {...register("company_number", { required: false, maxLength: 80 })}
                                />

                                {errors.company_number && (
                                    <p style={{ color: "red" }}>
                                        <small>Company number is required</small>
                                    </p>
                                )}

                                {errors.company_number?.type === "maxLength" && (
                                    <p style={{ color: "red" }}>
                                        <small>Max characters should be 80</small>
                                    </p>
                                )}
                            </Form.Group>
                            <br></br>
                            <Form.Group>
                                <Form.Label>Company website URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter company website URL"
                                    style={{ borderColor: "black", maxWidth: "500px" }}
                                    {...register("company_url", { required: true, maxLength: 80 })}
                                />

                                {errors.company_url && (
                                    <p style={{ color: "red" }}>
                                        <small>Company number is required</small>
                                    </p>
                                )}

                                {errors.company_url?.type === "maxLength" && (
                                    <p style={{ color: "red" }}>
                                        <small>Max characters should be 80</small>
                                    </p>
                                )}
                            </Form.Group>
                            <br></br>

                            <Form.Group>
                                <Button
                                    style={{ marginBottom: "15px" }}
                                    onClick={handleSubmit(handleProductInformation)}
                                >
                                    Continue
                                </Button>
                            </Form.Group>
                            <br></br>

                        </form>
                    </div>
                }

            </div>
        </div>
    );
};
