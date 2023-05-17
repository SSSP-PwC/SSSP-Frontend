import React, { useState } from 'react'
import { Form, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button } from "@mui/material";
import { MainHeading } from '../../globalStyles';


export const SignUpForm = () => {


    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [show, setShow] = useState(false)
    const [variantType, setVariantType] = useState('')
    const [serverResponse, setServerResponse] = useState('')

    const submitForm = (data) => {


        if (data.password === data.confirmPassword) {


            const body = {
                FirstName: data.FirstName,
                LastName: data.LastName,
                EmailAddress: data.email,
                PasswordHash: data.password
            }

            const requestOptions = {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(body)
            }


            fetch(process.env.REACT_APP_BACKEND_URL, requestOptions)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setServerResponse(data.message)
                    setShow(true)
                    console.log(data['message'])
                    if (data['message'] === "User already exists") {
                        setVariantType('danger')

                    }
                    else {
                        setVariantType('success')
                    }
                })
                .catch(err => console.log(err))

            reset()
        }

        else {
            alert("Passwords do not match")
        }


    }


    return (
        <div className="container">
            <div className="form" style={{ marginTop: "100px" }}>
                {show ?
                    <>
                        <Alert variant={variantType} onClose={() => {
                            setShow(false)
                        }} dismissible>
                            <p>
                                {serverResponse}
                            </p>
                        </Alert>

                        <MainHeading
                            style={{ color: "#27445C", fontSize: "40px", marginTop: "100px" }}
                        >
                            Sign Up
                        </MainHeading>

                    </>
                    :
                    <MainHeading
                        style={{ color: "#27445C", fontSize: "40px", marginTop: "100px" }}
                    >
                        Sign Up
                    </MainHeading>
                }
                <div style={{ display: "block", textAlign: "center" }}>
                    <form style={{ display: "inline-block", marginLeft: "auto", marginRight: "auto", textAlign: "left" }}>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter your first name"
                                style={{ width: "350px" }}
                                {...register("FirstName", { required: true, maxLength: 80 })}
                            />

                            {errors.FirstName && <p style={{ color: "red" }}><small>First Name is required</small></p>}

                            {errors.FirstName?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters should be 80</small></p>}
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter your last name"
                                {...register("LastName", { required: true, maxLength: 80 })}
                            />

                            {errors.LastName && <p style={{ color: "red" }}><small>Last Name is required</small></p>}

                            {errors.LastName?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters should be 80</small></p>}
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email"
                                placeholder="Enter your email address"
                                {...register("email", { required: true, maxLength: 80 })}
                            />

                            {errors.email && <p style={{ color: "red" }}><small>Email is required</small></p>}

                            {errors.email?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters should be 80</small></p>}
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                placeholder="Enter a password"
                                {...register("password", { required: true, minLength: 8 })}

                            />

                            {errors.password && <p style={{ color: "red" }}><small>Password is required</small></p>}
                            {errors.password?.type === "minLength" && <p style={{ color: "red" }}><small>Min characters should be 8</small></p>}
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm your password"
                                {...register("confirmPassword", { required: true, minLength: 8 })}
                            />
                            {errors.confirmPassword && <p style={{ color: "red" }}><small>Confirm Password is required</small></p>}
                            {errors.confirmPassword?.type === "minLength" && <p style={{ color: "red" }}><small>Min characters should be 8</small></p>}
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Button
                                style={{
                                    borderRadius: 35,
                                    backgroundColor: "#101522",
                                    padding: "8px 16px",
                                    fontSize: "15px",
                                    margin: "10px",
                                    borderColor: "white",
                                }}
                                onClick={handleSubmit(submitForm)}
                                variant="contained"
                            >
                                Sign Up
                            </Button>
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <small>Already have an account, <Link to='/login'>Log In</Link></small>
                        </Form.Group>
                        <br></br>
                    </form>
                </div>
            </div>
        </div>
    )
}