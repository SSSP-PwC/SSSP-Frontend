import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button, Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import "react-phone-number-input/style.css"
export const ListSchemes = () => {
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

    const [renderProducerVendorField, setProducerVendorField] = useState(false)
    const [renderProductSellingDescriptionField, setProductSellingDescriptionField] = useState(false)


    const handleProductType = (data) => {
        sessionStorage.setItem("EOI-Product-Type", data.product_type)
        setProducerVendorField(true)
    }
    const handleProducerVendorStatus = (data) => {
        sessionStorage.setItem("EOI-Producer-Vendor-Status", data.producer_vendor_status)
        setProductSellingDescriptionField(true)
    }
    const handleDeclarations = (data) => {
        sessionStorage.setItem("EOI-Producer-Info", data.product_info)
        navigate("/EOI-Declarations");
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
                {renderProducerVendorField === false && renderProductSellingDescriptionField === false &&
                    <div>
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
                                Product Information
                            </MainHeading>
                            <p style={{ color: "#0B0C0C" }}>
                                Please complete this section with your own details.
                            </p>
                            <Form.Group>
                                <Form.Label>Product Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your product type"
                                    style={{ borderColor: "black", maxWidth: "500px" }}
                                    {...register("product_type", { required: true, maxLength: 80 })}
                                />

                                {errors.product_type && (
                                    <p style={{ color: "red" }}>
                                        <small>Email is required</small>
                                    </p>
                                )}

                                {errors.product_type?.type === "maxLength" && (
                                    <p style={{ color: "red" }}>
                                        <small>Max characters should be 80</small>
                                    </p>
                                )}
                            </Form.Group>
                            <br></br>

                            <Form.Group>
                                <Button
                                    style={{ marginBottom: "15px" }}
                                    onClick={handleSubmit(handleProductType)}
                                >
                                    Continue
                                </Button>
                            </Form.Group>
                            <br></br>

                        </form>
                    </div>
                }
                  {renderProducerVendorField === true && renderProductSellingDescriptionField === false &&
                    <div>
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
                                Product Information
                            </MainHeading>
                            <p style={{ color: "#0B0C0C" }}>
                                Are you a producer and vendor of the technology or a reseller/other?
                            </p>
                            <Form.Group>
                                <Form.Label>Producer and vendor status</Form.Label>
                                <textarea
                                    className="form-control"
                                    placeholder="Please describe here"
                                    rows="7"
                                    style={{ borderColor: "black", maxWidth: "500px" }}
                                    {...register("producer_vendor_status", { required: true, maxLength: 250 })}
                                />

                                {errors.producer_vendor_status && (
                                    <p style={{ color: "red" }}>
                                        <small>Producer and vendor status required</small>
                                    </p>
                                )}

                                {errors.producer_vendor_status?.type === "maxLength" && (
                                    <p style={{ color: "red" }}>
                                        <small>Max characters should be 80</small>
                                    </p>
                                )}
                            </Form.Group>
                            <br></br>

                            <Form.Group>
                                <Button
                                    style={{ marginBottom: "15px" }}
                                    onClick={handleSubmit(handleProducerVendorStatus)}
                                >
                                    Continue
                                </Button>
                            </Form.Group>
                            <br></br>

                        </form>
                    </div>
                }
                {renderProducerVendorField === true && renderProductSellingDescriptionField === true && 
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
                                Product Information
                            </MainHeading>
                            <p style={{ color: "#0B0C0C" }}>
                                Please complete this section with your own details.
                            </p>
                            <Form.Group>
                                <Form.Label>Enter Product Information</Form.Label>
                                <p style={{ color: "#505a5f", fontSize: "12px" }}>
                                    Please describe how you sell your products
                                </p>
                                <textarea
                                    className="form-control"
                                    placeholder="Describe how you sell your products"
                                    rows="7"
                                    style={{ borderColor: "black", maxWidth: "500px" }}
                                    {...register("product_info", { required: true, maxLength: 250 })}
                                />

                                {errors.product_info && (
                                    <p style={{ color: "red" }}>
                                        <small>Product info is required</small>
                                    </p>
                                )}
                                {errors.product_info?.type === "maxLength" && (
                                    <p style={{ color: "red" }}>
                                        <small>Max characters should be 250</small>
                                    </p>
                                )}
                            </Form.Group>
                            <br></br>

                            <Form.Group>
                                <Button
                                    style={{ marginBottom: "15px" }}
                                    onClick={handleSubmit(handleDeclarations)}
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
