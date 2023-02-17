import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function NavbarComponent() {

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

          </Nav>
          <Nav>
            <NavDropdown title="Register" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/register-citizen">Citizen</NavDropdown.Item>
              <NavDropdown.Item href="/register-company-landing">
                Company
              </NavDropdown.Item>

              <NavDropdown.Item href="/register-organisation">Organisation</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Sign In" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/sign-in-citizen">Citizen</NavDropdown.Item>
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
}


export default NavbarComponent;