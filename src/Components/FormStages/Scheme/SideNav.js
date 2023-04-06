import React, { useState } from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import { IconContext } from "react-icons";


import { Link } from "react-router-dom";

import { SidenavData } from "./SidenavData";

import "./SideNav.css";

export default function Sidenav() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#FFF" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

           
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
