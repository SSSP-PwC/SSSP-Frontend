import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Button } from "@mui/material";

import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
//import { login } from './auth'
import { useNavigate } from 'react-router-dom'
import { MainHeading } from '../../globalStyles'


const LoginForm = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const navigate = useNavigate()



  const loginUser = (data) => {
    console.log(data)

    const requestOptions = {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    fetch(process.env.REACT_APP_BACKEND_URL, requestOptions)
      .then(res => res.json())
      .then(data => {
        console.log(data.access_token)

        if (data) {
          //login(data.access_token)

          navigate('/')
        }
        else {
          alert('Invalid username or password')
        }


      })



    reset()
  }

  return (
    <div className="container">
      <div className="form" style={{ marginTop: "100px" }}>
        <MainHeading
          style={{ color: "#27445C", fontSize: "40px", marginTop: "150px" }}
        >
          Sign In
        </MainHeading>
        <div style={{ display: "block", textAlign: "center" }}>

          <form style={{ display: "inline-block", marginLeft: "auto", marginRight: "auto", textAlign: "left", marginBottom: "100px" }}>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="text"
                placeholder="Enter your email address"
                style={{ width: "350px" }}

                {...register('EmailAddress', { required: true, maxLength: 25 })}
              />
            </Form.Group>
            {errors.username && <p style={{ color: 'red' }}><small>Email is required</small></p>}
            {errors.username?.type === "maxLength" && <p style={{ color: 'red' }}><small>Username should be 25 characters</small></p>}
            <br></br>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"
                placeholder="Enter your password"
                {...register('password', { required: true, minLength: 8 })}
              />
            </Form.Group>
            {errors.username && <p style={{ color: 'red' }}><small>Password is required</small></p>}
            {errors.password?.type === "maxLength" && <p style={{ color: 'red' }}>
              <small>Password should be more than 8 characters</small>
            </p>}
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
                variant="contained"
              >
                Sign In
              </Button>
            </Form.Group>
            <br></br>
            <Form.Group>
              <small>Do not have an account? <Link to='/signup'>Create One</Link></small>
            </Form.Group>

          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm