import React, { useState } from 'react'
import { Form, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button, Heading } from "../../globalStyles";
import { MainHeading } from '../../globalStyles';


export const CompanySignUpForm = () => {


    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [show, setShow] = useState(false)
    const [variantType, setVariantType] = useState('')
    const [serverResponse, setServerResponse] = useState('')
    const [registerCompanyButton, setRegisterCompanyButton] = useState(false)
    const [companyNameButton, setCompanyNameButton] = useState(false)
    const [addressButton, setAddressButton] = useState(false);
    const [registrationNumberButton, setRegistrationNumber] = useState(false);
    const [linkExistingAccountButton, setLinkExistingAccountButton] = useState(false);
    const [createNewCitizenAccountButton, setCreateNewCitizenAccountButton] = useState(false);
    const [nameProvidedButton, setNameProvidedButton] = useState(false);
    const [registerCitizenButton, setRegisterCitizenButton] = useState(false);
    const [emailAddressButton, setEmailAddressButton] = useState(false);
    const [citizenAddressButton, setCitizenAddressButton] = useState(false);
    const [citizenPasswordButton, setCitizenPasswordButton] = useState(false);

    const submitForm = (data) => {


        if (data.password === data.confirmPassword) {


            const body = {
                CompanyName: data.CompanyName,
                CompanyAddressLine1: data.AddressLine1,
                CompanyAddressLine2: data.AddressLine2,
                CompanyTownCity: data.CompanyTownCity,
                CompanyPostcode: data.CompanyPostcode,
                CompanyRegistrationNumber: data.CompanyRegistrationNumber,
                CitizenID: data.CitizenID,
                CompanyURL: data.CompanyURL,
                CompanyDescription: data.CompanyDescription,
                IndustrySector: data.IndustrySector
            }

            const requestOptions = {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(body)
            }


            fetch('http://127.0.0.1:5000/auth/signup', requestOptions)
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

            {registerCompanyButton == false && companyNameButton == false && addressButton == false && createNewCitizenAccountButton == false && linkExistingAccountButton == false ? (
                <div style={{ marginTop: "100px" }}>
                    <MainHeading
                        style={{ color: "#0B0C0C", fontWeight: "bold" }}
                    >
                        Register your company
                    </MainHeading>
                    <p style={{ color: "#0B0C0C" }}>Use this service to register your company details with the platform.</p>

                    <p style={{ color: "#0B0C0C" }}>Please have the following information available before registering: </p>
                    <ul>
                        <li>Company Name</li>
                        <li>Company Address</li>
                        <li>Company Registration Number</li>
                        <li>Contact Details</li>
                        <li>Company website (if applicable)</li>

                    </ul>
                    <Button style={{ marginBottom: "15px" }} onClick={(e) => setRegisterCompanyButton(true)}>Register now</Button>
                </div>
            ) : (
                <div></div>
            )}

            <div className="form" style={{ marginTop: "70px" }}>
                {show ?
                    <>
                        <Alert variant={variantType} onClose={() => {
                            setShow(false)
                        }} dismissible>
                            <p>
                                {serverResponse}
                            </p>
                        </Alert>


                    </>
                    :
                    <div></div>
                }
            </div>
            {registerCompanyButton == true && companyNameButton == false && createNewCitizenAccountButton == false && linkExistingAccountButton == false && nameProvidedButton == false && registerCitizenButton == false ? (
                <form style={{ display: "inline-block" }}>
                    <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>Enter your company name</MainHeading>
                    <p style={{ color: "#0B0C0C" }}>We will use this information to cross-reference against companies house database</p>

                    <Form.Group>
                        <Form.Label>Company name</Form.Label>
                        <Form.Control type="text"
                            placeholder="Enter company name"
                            style={{ borderColor: "black", maxWidth: "500px" }}
                            {...register("CompanyName", { required: true, maxLength: 120 })}
                        />

                        {errors.CompanyName && <p style={{ color: "red" }}><small>Company Name is required</small></p>}

                        {errors.CompanyName?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters should be 120</small></p>}
                    </Form.Group>
                    <br></br>
                    <Button style={{ marginBottom: "15px" }} onClick={(e) => setCompanyNameButton(true)}>Continue</Button>

                </form>
            ) : (
                <div></div>
            )}
            {companyNameButton == true && registerCompanyButton == true && addressButton == false && registrationNumberButton == false && createNewCitizenAccountButton == false && linkExistingAccountButton == false && nameProvidedButton == false && registerCitizenButton == false ? (
                <form style={{ display: "inline-block" }}>
                    <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>Enter your company address</MainHeading>
                    <Form.Group>
                        <Form.Label>Address Line 1</Form.Label>
                        <Form.Control type="text"
                            placeholder="Enter address line 1"
                            style={{ borderColor: "black", maxWidth: "500px" }}
                            {...register("CompanyAddressLine1", { required: true, maxLength: 80 })}
                        />

                        {errors.CompanyAddressLine1 && <p style={{ color: "red" }}><small>Address Line 1 is required</small></p>}

                        {errors.AddressLine1?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters should be 80</small></p>}
                    </Form.Group>
                    <br></br>

                    <Form.Group>
                        <Form.Label>Address Line 2</Form.Label>
                        <Form.Control type="text"
                            placeholder="Enter address line 2"
                            style={{ borderColor: "black", maxWidth: "500px" }}
                            {...register("CompanyAddressLine2", { required: false, maxLength: 80 })}
                        />
                        {errors.AddressLine1?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters should be 80</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Town/City</Form.Label>
                        <Form.Control type="text"
                            placeholder="Enter town/city"
                            style={{ borderColor: "black", maxWidth: "500px" }}
                            {...register("CompanyTownCity", { required: false, maxLength: 80 })}
                        />
                        {errors.AddressLine1?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters should be 80</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Postcode</Form.Label>
                        <Form.Control type="text"
                            placeholder="Enter postcode"
                            style={{ borderColor: "black", maxWidth: "500px" }}
                            {...register("CompanyPostcode", { required: false, maxLength: 8 })}
                        />
                        {errors.AddressLine1?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters should be 8</small></p>}
                    </Form.Group>
                    <br></br>
                    <Button style={{ marginBottom: "15px" }} onClick={(e) => setAddressButton(true)}>Continue</Button>
                </form>

            ) : (
                <div></div>
            )}
            {addressButton == true && companyNameButton == true && registerCompanyButton == true && registrationNumberButton == false && createNewCitizenAccountButton == false && linkExistingAccountButton == false && nameProvidedButton == false && registerCitizenButton == false ? (
                <form style={{ display: "inline-block" }}>
                    <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>Enter your company registration number</MainHeading>
                    <p style={{ color: "#0B0C0C" }}>We will use this information to cross-reference against companies house database</p>

                    <Form.Group>
                        <Form.Label>Company registration number</Form.Label>
                        <Form.Control type="text"
                            placeholder="Enter company registration number"
                            style={{ borderColor: "black", maxWidth: "500px" }}
                            {...register("CompanyRegistrationNumber", { required: true, maxLength: 120 })}
                        />

                        {errors.CompanyRegistrationNumber && <p style={{ color: "red" }}><small>Company Registration Number is required</small></p>}

                        {errors.CompanyRegistrationNumber?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters should be 120</small></p>}
                    </Form.Group>
                    <br></br>
                    <Button style={{ marginBottom: "15px" }} onClick={(e) => setRegistrationNumber(true)}>Continue</Button>

                </form>
            ) : (
                <div></div>
            )}

            {addressButton == true && companyNameButton == true && registerCompanyButton == true && registrationNumberButton == true && createNewCitizenAccountButton == false && linkExistingAccountButton == false && nameProvidedButton == false && registerCitizenButton == false ? (
                <form style={{ display: "inline-block" }}>
                    <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>Contact Details</MainHeading>
                    <p style={{ color: "#0B0C0C" }}>You must associate contact details with the company record.</p>
                    <Button style={{ marginBottom: "15px" }} onClick={(e) => setLinkExistingAccountButton(true)}>Link existing account</Button>
                    <br></br>
                    <Button style={{ marginBottom: "15px" }} onClick={(e) => setCreateNewCitizenAccountButton(true)}>Create new citizen profile</Button>
                </form>
            ) : (
                <div></div>
            )}
            {addressButton == true && companyNameButton == true && registerCompanyButton == true && registrationNumberButton == true && createNewCitizenAccountButton == false && linkExistingAccountButton == true && nameProvidedButton == false && registerCitizenButton == false ? (
                <form style={{ display: "inline-block" }}>
                    <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>Enter Citizen ID</MainHeading>
                    <p style={{ color: "#0B0C0C" }}>This ID was given to you when you signed up to the platform for the first time.</p>

                    <Form.Group>
                        <Form.Label>Company registration number</Form.Label>
                        <Form.Control type="tel"
                            placeholder="Enter Citizen ID"
                            style={{ borderColor: "black", maxWidth: "500px" }}
                            {...register("CitizenID", { required: true, maxLength: 120 })}
                        />

                        {errors.CitizenID && <p style={{ color: "red" }}><small>Citizen ID is required</small></p>}

                        {errors.CitizenID?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters should be 120</small></p>}
                    </Form.Group>
                    <br></br>
                    <Button style={{ marginBottom: "15px" }} onClick={(e) => setRegistrationNumber(true)}>Continue</Button>

                </form>
            ) : (
                <div></div>
            )}
            {addressButton == true && companyNameButton == true && registerCompanyButton == true && registrationNumberButton == true && createNewCitizenAccountButton == true && linkExistingAccountButton == false && nameProvidedButton == false && registerCitizenButton == false ? (
                <div style={{ display: "inline-block" }}>
                    <MainHeading
                        style={{ color: "#0B0C0C", fontWeight: "bold" }}
                    >
                        Register as a citizen
                    </MainHeading>
                    <p style={{ color: "#0B0C0C" }}>Use this service to register your details with the platform.</p>

                    <p style={{ color: "#0B0C0C" }}>You will be asked to provide the following pieces of information during citizen registration: </p>
                    <ul>
                        <li>First Name</li>
                        <li>Last Name</li>
                        <li>Address</li>
                        <li>Email Address</li>
                        <li>Password</li>
                    </ul>
                    <Button style={{ marginBottom: "15px" }} onClick={(e) => setRegisterCitizenButton(true)}>Register now</Button>

                </div>


            ) : (
                <div></div>
            )}
            {addressButton == true && companyNameButton == true && registerCompanyButton == true && registrationNumberButton == true && createNewCitizenAccountButton == true && linkExistingAccountButton == false && nameProvidedButton == false && registerCitizenButton == true ? (
                <div style={{ display: "inline-block" }}>
                    <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>Enter your first and last name</MainHeading>
                    <p style={{ color: "#0B0C0C" }}>This allows us to compose your profile.</p>

                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text"
                            placeholder="Enter your first name"
                            style={{ borderColor: "black", maxWidth: "500px" }}
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
                            style={{ borderColor: "black", maxWidth: "500px" }}
                            {...register("LastName", { required: true, maxLength: 80 })}
                        />

                        {errors.LastName && <p style={{ color: "red" }}><small>Last Name is required</small></p>}

                        {errors.LastName?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters should be 80</small></p>}
                    </Form.Group>
                    <br></br>
                    <Button style={{ marginBottom: "15px" }} onClick={(e) => setNameProvidedButton(true)}>Continue</Button>
                </div>

            ) : (
                <div></div>
            )}


            {addressButton == true && companyNameButton == true && registerCompanyButton == true && registrationNumberButton == true && createNewCitizenAccountButton == true && linkExistingAccountButton == false && nameProvidedButton == true && registerCitizenButton == true && citizenAddressButton == false ? (
                <div style={{ display: "inline-block" }}>
                    <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>Enter your address</MainHeading>
                    <p style={{ color: "#0B0C0C" }}>This allows us to compose your profile.</p>

                    <Form.Group>
                        <Form.Label>Address Line 1</Form.Label>
                        <Form.Control type="text"
                            placeholder="Enter address line 1"
                            style={{ borderColor: "black", maxWidth: "500px" }}
                            {...register("CompanyAddressLine1", { required: true, maxLength: 80 })}
                        />

                        {errors.CompanyAddressLine1 && <p style={{ color: "red" }}><small>Address Line 1 is required</small></p>}

                        {errors.AddressLine1?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters should be 80</small></p>}
                    </Form.Group>
                    <br></br>

                    <Form.Group>
                        <Form.Label>Address Line 2</Form.Label>
                        <Form.Control type="text"
                            placeholder="Enter address line 2"
                            style={{ borderColor: "black", maxWidth: "500px" }}
                            {...register("CompanyAddressLine2", { required: false, maxLength: 80 })}
                        />
                        {errors.AddressLine1?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters should be 80</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Town/City</Form.Label>
                        <Form.Control type="text"
                            placeholder="Enter town/city"
                            style={{ borderColor: "black", maxWidth: "500px" }}
                            {...register("CompanyTownCity", { required: false, maxLength: 80 })}
                        />
                        {errors.AddressLine1?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters should be 80</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Postcode</Form.Label>
                        <Form.Control type="text"
                            placeholder="Enter postcode"
                            style={{ borderColor: "black", maxWidth: "500px" }}
                            {...register("CompanyPostcode", { required: false, maxLength: 8 })}
                        />
                        {errors.AddressLine1?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters should be 8</small></p>}
                    </Form.Group>
                    <br></br>
                    <Button style={{ marginBottom: "15px" }} onClick={(e) => setCitizenAddressButton(true)}>Continue</Button>
                </div>

            ) : (
                <div></div>
            )}

            {addressButton == true && companyNameButton == true && registerCompanyButton == true && registrationNumberButton == true && createNewCitizenAccountButton == true && linkExistingAccountButton == false && nameProvidedButton == true && registerCitizenButton == true && citizenAddressButton == true && emailAddressButton == false ? (
                <div style={{ display: "inline-block" }}>
                    <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>Enter your email address</MainHeading>
                    <p style={{ color: "#0B0C0C" }}>This allows us to compose your profile.</p>

                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"
                            placeholder="Enter your email address"
                            style={{ borderColor: "black", maxWidth: "500px" }}
                            {...register("email", { required: true, maxLength: 80 })}
                        />

                        {errors.email && <p style={{ color: "red" }}><small>Email is required</small></p>}

                        {errors.email?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters should be 80</small></p>}
                    </Form.Group>
                    <br></br>
                    <Button style={{ marginBottom: "15px" }} onClick={(e) => setEmailAddressButton(true)}>Continue</Button>

                </div>

            ) : (
                <div></div>
            )}



            {addressButton == true && companyNameButton == true && registerCompanyButton == true && registrationNumberButton == true && createNewCitizenAccountButton == true && linkExistingAccountButton == false && nameProvidedButton == true && registerCitizenButton == true && citizenAddressButton == true && emailAddressButton == true && citizenPasswordButton == false ? (
                <div style={{ display: "inline-block" }}>
                    <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>Create a Password</MainHeading>
                    <p style={{ color: "#0B0C0C" }}>This will be used for logging in.</p>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Enter a password"
                            style={{ borderColor: "black", maxWidth: "500px" }}
                            {...register("password", { required: true, minLength: 8 })}

                        />

                        {errors.password && <p style={{ color: "red" }}><small>Password is required</small></p>}
                        {errors.password?.type === "minLength" && <p style={{ color: "red" }}><small>Min characters should be 8</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Confirm your password"
                            style={{ borderColor: "black", maxWidth: "500px" }}
                            {...register("confirmPassword", { required: true, minLength: 8 })}
                        />
                        {errors.confirmPassword && <p style={{ color: "red" }}><small>Confirm Password is required</small></p>}
                        {errors.confirmPassword?.type === "minLength" && <p style={{ color: "red" }}><small>Min characters should be 8</small></p>}
                    </Form.Group>
                    <br></br>
                    <Button style={{ marginBottom: "15px" }} onClick={(e) => setCitizenPasswordButton(true)}>Continue</Button>

                </div>

            ) : (
                <div></div>
            )}

            {addressButton == true && companyNameButton == true && registerCompanyButton == true && registrationNumberButton == true && createNewCitizenAccountButton == true && linkExistingAccountButton == false && nameProvidedButton == true && registerCitizenButton == true && citizenAddressButton == true && emailAddressButton == true && citizenPasswordButton == true ? (
                <div style={{ display: "inline-block" }}>
                    <MainHeading style={{ color: "#0B0C0C", fontWeight: "bold" }}>Company website</MainHeading>
                    <p style={{ color: "#0B0C0C" }}>If you don't have one, please leave URL field blank and select continue.</p>

                    <Form.Group>
                        <Form.Label>URL</Form.Label>
                        <Form.Control type="text"
                            placeholder="Provide website URL"
                            style={{ borderColor: "black", maxWidth: "500px" }}
                            {...register("CompanyURL", { required: false, maxLength: 120 })}
                        />


                        {errors.CitizenID?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters should be 120</small></p>}
                    </Form.Group>
                    <br></br>
                    <Button style={{ marginBottom: "15px" }} onClick={(e) => setEmailAddressButton(true)}>Continue</Button>
                </div>

            ) : (
                <div></div>
            )}




            <div>
            </div>
        </div>
    )
}