import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./Nav.css";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  console.log(currentUser);

  return (
    <div className="navbar-page">
      <div className="left-nav">
        <h3>NAVBAR</h3>
      </div>
      <div className="nav-container">
        <ul className="nav-right">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/?cat=sql">Sql</Link>
          </li>
          <li>
            <Link to="/?cat=react">React</Link>
          </li>
          {currentUser && (
            <li>
              <Link to="/Write">Write</Link>
            </li>
          )}
          {!currentUser && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {!currentUser && (
            <li>
              <Link to="/register">Register</Link>
            </li>
          )}
          {/* <li>{currentUser?.username}</li> */}
          {currentUser && <li>{currentUser?.username}</li>}
          {currentUser && (
            <li>
              <Link onClick={logout}>Logout</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
