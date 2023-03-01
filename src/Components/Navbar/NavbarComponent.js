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
        <img
          src="./city.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="SSSP Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/" onClick={logout}>
            <span style={{ fontSize: "25px" }}><AiOutlineHome/></span> Home
          </Nav.Link>
          <Nav.Link href="/List-Schemes">
            <span style={{ fontSize: "25px" }}><AiOutlineForm/></span>
            Schemes
          </Nav.Link>
        </Nav>

        <Nav>
<Nav.Link href="/" onClick={logout}>
  Sign Out
</Nav.Link>
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
          <img
            src="./city.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="SSSP Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" onClick={logout}>
              <span style={{ fontSize: "25px" }}><AiOutlineHome/></span> Home
            </Nav.Link>
            <Nav.Link href="/List-Schemes">
              <span style={{ fontSize: "25px" }}><AiOutlineForm/></span>
              Schemes
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
              <NavDropdown.Item href="/sign-in-company">
                Company
              </NavDropdown.Item>
              <NavDropdown.Item href="/sign-in-organisation">
                Organisation
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

  return <div>{loggedIn ? <LoggedOutNavbar /> : <LoggedOutNavbar />}</div>;
};
