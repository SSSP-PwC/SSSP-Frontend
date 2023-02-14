import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { CgMenuRight } from "react-icons/cg";
import { IconContext } from "react-icons";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavLinks,
  NavItem,
} from "./NavbarStyles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {loggedInData}from "../../Data/NavbarData";
import { Heading } from "../../globalStyles";
const Navbar = () => {
  const [show, setShow] = useState(false);

  let history = useNavigate();
  let location = useLocation();

  const handleClick = () => {
    setShow(!show);
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);

    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  const closeMobileMenu = (to, id) => {
    if (id && location.pathname === "/") {
      scrollTo(id);
    }

    history(to);
    setShow(false);
  };
  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <Nav>    
        <NavbarContainer>
          <Link to ="/" style={{textDecoration: "none"}}>          
          <Heading style={{margin: "10px"}}>SSSP</Heading>
</Link>
          <MobileIcon onClick={handleClick}>
            {show ? <FaTimes /> : <CgMenuRight />}
          </MobileIcon>
            <NavMenu show={show}>
              {loggedInData.map((el, index) => (
                <NavItem key={index}>
                  <NavLinks onClick={() => closeMobileMenu(el.to, el.id)}>
                    {el.text}
                  </NavLinks>
                </NavItem>
              ))}
            </NavMenu>
        </NavbarContainer>
      </Nav>
    </IconContext.Provider>
  );
};

export default Navbar;
