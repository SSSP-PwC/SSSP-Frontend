import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth, logout } from "../Auth/auth";
import { AiOutlineUserAdd, AiOutlineHome, AiOutlineForm } from "react-icons/ai";
import {MdOutlineLogin} from "react-icons/md";

const LoggedInNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">
      <img src={process.env.PUBLIC_URL + '/img/city.png'} alt="Logo" 
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/" >
            <span style={{ fontSize: "25px" }}><AiOutlineHome/></span> Home
          </Nav.Link>
          <Nav.Link href="/List-Applications">
            <span style={{ fontSize: "25px" }}><AiOutlineForm/></span>
            List of Applications
          </Nav.Link>
        </Nav>

        <Nav>
           
            <NavDropdown title={
                <>
                  <MdOutlineLogin style={{ fontSize: "25px" }}/> Profile
                </>
              } id="collasible-nav-dropdown">
              <NavDropdown.Item href="/personal-profile">
                Account Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="/link-wallet">
                Digital Wallet
              </NavDropdown.Item>
              <NavDropdown.Item href="/personal-profile">
                Credential Management
              </NavDropdown.Item>
              <NavDropdown.Item href="/" onClick={logout}>
                Sign Out
              </NavDropdown.Item>
            
            </NavDropdown>
          </Nav>
        <Nav>

</Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};



const LoggedOutNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
        <img src={process.env.PUBLIC_URL + '/img/city.png'} alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" onClick={logout}>
              <span style={{ fontSize: "25px" }}><AiOutlineHome/></span> Home
            </Nav.Link>
            <Nav.Link href="/List-Applications">
              <span style={{ fontSize: "25px" }}><AiOutlineForm/></span>
              List of Applications
            </Nav.Link>
          </Nav>

          <Nav>
            <NavDropdown
              title={
                <>
                  <AiOutlineUserAdd style={{ fontSize: "25px" }}/> Register
                </>
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="/register-citizen-landing">
                Citizen
              </NavDropdown.Item>
              <NavDropdown.Item href="/register-company-landing">
                Company
              </NavDropdown.Item>

              <NavDropdown.Item href="/publish-scheme-landing">
                Scheme
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={
                <>
                  <MdOutlineLogin style={{ fontSize: "25px" }}/> Sign In
                </>
              } id="collasible-nav-dropdown">
              <NavDropdown.Item href="/sign-in-citizen">
                Citizen
              </NavDropdown.Item>
        
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export const NavbarComponent = () => {
  const [loggedIn] = useAuth();

  return <div>{loggedIn ? <LoggedInNavbar /> : <LoggedOutNavbar />}</div>;
};
