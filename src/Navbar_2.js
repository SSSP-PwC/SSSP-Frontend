import { useState } from "react"
import { Link } from "react-router-dom";
import "./navbar.css"

export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        Smart Societies Software Platform
      </a>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded)
        }}
      >
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <li>
            <Link to="/" style={{color: 'black'}}>Home</Link>
          </li>
          <li>
            <Link to="/login" style={{color: 'black'}}>Login</Link>
          </li>
          <li>
            <Link to="/signup" style={{color: 'black'}}>Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
