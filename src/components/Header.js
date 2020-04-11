import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav style={{ marginBottom: 30 + "px" }} className="dark-background">
      <Link to="/" className="brand-logo center ">
        <span className="light-text">Open Library</span>
      </Link>
    </nav>
  );
}

export default Header;
