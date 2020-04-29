import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

function Header({ auth }) {
  const { isAuthenticated, login, logout } = auth;
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav>
      <NavLink exact to="/" activeStyle={activeStyle}>
        Home
      </NavLink>
      {" | "}
      <NavLink activeStyle={activeStyle} to="/about">
        About
      </NavLink>
      {" | "}
      <NavLink activeStyle={activeStyle} to="/courses">
        Courses
      </NavLink>
      {" | "}
      {isAuthenticated() && (
        <>
          <NavLink activeStyle={activeStyle} to="/profile">
            Profile
          </NavLink>
          {" | "}
        </>
      )}
      <NavLink
        activeStyle={activeStyle}
        to=""
        onClick={isAuthenticated() ? logout : login}
      >
        {isAuthenticated() ? "Logout" : "Login"}
      </NavLink>
    </nav>
  );
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default Header;
