import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button, Heading } from "../../../globalStyles";
import { MainHeading } from "../../../globalStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

export const SchemeTitle = () => {
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

    const handleNextStage = (data) => {
        navigate("/publish-scheme-details", {state: {
            scheme_title: data.scheme_title
        }})
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
                    <div>
                        <form style={{ display: "inline-block" }}>
                            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>
                                Publish Scheme
                            </MainHeading>
                            <Divider></Divider>
                            <br></br>
                            <p style={{ color: "#505a5f" }}>
                                Section 1 of 5
                            </p>
                            <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold", fontSize: "20px" }}>
                                Scheme Title
                            </MainHeading>
                            <p style={{ color: "#0B0C0C" }}>
                                Please complete this section with the title of the scheme.
                            </p>
                            <Form.Group>
                                <Form.Label>Scheme Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter scheme title"
                                    style={{ borderColor: "black", maxWidth: "500px" }}
                                    {...register("scheme_title", { required: true, maxLength: 80 })}
                                />

                                {errors.scheme_title && (
                                    <p style={{ color: "red" }}>
                                        <small>Scheme title is required</small>
                                    </p>
                                )}

                                {errors.scheme_title?.type === "maxLength" && (
                                    <p style={{ color: "red" }}>
                                        <small>Max characters should be 80</small>
                                    </p>
                                )}
                            </Form.Group>
                            <br></br>

                            <Form.Group>
                                <Button
                                    style={{ marginBottom: "15px" }}
                                    onClick={handleSubmit(handleNextStage)}
                                >
                                    Continue
                                </Button>
                            </Form.Group>
                            <br></br>

                        </form>
                    </div>
            </div>
        </div>
    );
};
