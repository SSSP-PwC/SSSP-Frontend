import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <div style={{ minHeight: "55vh", display: "flex", flexDirection: "column" }}>

      <MDBFooter bgColor='light' className='text-center text-lg-start text-muted' style={{
      backgroundColor: "#212529",
      border: "none",
      boxShadow: "0 0 10px rgba(0,0,0,0.3)",
      borderRadius: "10px",
      overflow: "hidden",
      margin: "10px",
      marginTop: "auto"}}>
        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
          <div className='me-5 d-none d-lg-block'>
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href='' className='me-4 text-reset'>
              <FaFacebook />
            </a>
            <a href='' className='me-4 text-reset'>
              <FaTwitter />
            </a>
            <a href='' className='me-4 text-reset'>
              <FaInstagram />
            </a>
            <a href='' className='me-4 text-reset'>
              <FaYoutube />
            </a>
          </div>
        </section>

        <section className=''>
          <MDBContainer className='text-center text-md-start mt-5'>
            <MDBRow className='mt-3'>
              <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4' style={{ fontSize: "13px" }}>
                  <MDBIcon color='secondary' icon='gem' className='me-3' />
                  Smart Societies Software Platform
                </h6>
                <p>
                  With the Smart Societies platform, you'll be able to store, manage, and use your digital credentials in one secure location. This eliminates the need for multiple login credentials, passwords, and security questions, making it easier and faster to access the information and services you need.
                </p>
              </MDBCol>

              <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Features</h6>
                <p>
                  <a href='#!' className='text-reset'>
                    Smart Credentials
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Smart Wallet
                  </a>
                </p>
              </MDBCol>

              <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                <p>
                  <a href='#!' className='text-reset'>
                    Contact Us
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Privacy Policy
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Terms and conditions
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Help
                  </a>
                </p>
              </MDBCol>

              <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                <p>
                  <MDBIcon color='secondary' icon='home' className='me-2' />
                  20 Wellington Pl, Belfast BT1 6GE
                </p>
                <p>
                  <MDBIcon color='secondary' icon='envelope' className='me-3' />
                  marcas.odonnell@pwc.com
                </p>

              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2023 Copyright:
          <a className='text-reset fw-bold' href='https://www.pwc.co.uk/'>
            PwC.co.uk
          </a>
        </div>
      </MDBFooter>
    </div>
  );
}