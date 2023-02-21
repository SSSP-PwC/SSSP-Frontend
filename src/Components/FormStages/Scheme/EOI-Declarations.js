import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button, Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import "react-phone-number-input/style.css"
export const EOIDeclarations = () => {
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
    const [renderTermsAndConditionsField, setShowTermsAndConditionsField] = useState(false)

    const handleYes = (data) => {
        sessionStorage.setItem("EOI-Privacy-Agreed", "Yes")
        navigate("/EOI-Summary")
    }
    const handleNo = (data) => {
        sessionStorage.setItem("EOI-Privacy-Agreed", "No")
        navigate("/EOI-Summary")
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
                {renderTermsAndConditionsField === false &&
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
                                Declarations
                            </MainHeading>
                            <p style={{ color: "#0B0C0C" }}>
                                Are you happy to be contacted by the Help to Grow: Digital Team in the future?
                            </p>
                            <Form.Group>
                                <Form.Label style={{ fontSize: "32px" }}>
                                    <input
                                        type="radio"
                                        onClick={handleYes}
                                        id="radio_button_yes"
                                        style={{
                                            height: "30px",
                                            width: "30px",
                                            verticalAlign: "middle",
                                            accentColor: "black",
                                        }}

                                    />{" "}
                                    Yes
                                </Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label style={{ fontSize: "32px" }}>
                                    <input
                                        type="radio"
                                        onClick={handleNo}
                                        id="radio_button_no"
                                        style={{
                                            height: "30px",
                                            width: "30px",
                                            verticalAlign: "middle",
                                            accentColor: "black",
                                        }}

                                    />{" "}
                                    No
                                </Form.Label>
                            </Form.Group>
                            <br></br>

                        </form>
                    </div>
                }
                {renderTermsAndConditionsField === true &&
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
                                Privacy Notice
                            </MainHeading>
                            <p style={{ color: "#505a5f" }}>
                                    Please tick the box to indicate that you have and understood the privacy notice.
                                </p>

                            <Form.Group>
                                <Form.Label style={{ fontSize: "15px" }}>

                                    <input class="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="flexCheckDefault"
                                        style={{
                                            borderColor: "black", height: "15px",
                                            width: "15px"
                                        }}
                                        {...register("privacy_notice", { required: true })}
                                    />{"    "}
                                    I have read and understand my data will be processed in accordance with the <a href="/">Privacy Notice</a>

                                
                                </Form.Label> 
                             

                                {errors.privacy_notice && (
                                    <p style={{ color: "red" }}>
                                        <small>Privacy notice must be agreed</small>
                                    </p>
                                )}


                            </Form.Group>
                            <br></br>

                            <Form.Group>
                                <Button
                                    style={{ marginBottom: "15px" }}
                                    onClick={handleSubmit(handleNo)}
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
