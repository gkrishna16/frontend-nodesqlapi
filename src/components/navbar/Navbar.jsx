import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./Nav.css";
import Menu from "@mui/icons-material/Menu";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  console.log(currentUser);

  const [showNav, setShowNav] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="nav-container">
      <div className="nav-top">
        <div className="social-nav">
          <div className="social">
            <div className="icon">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </a>
            </div>
            <div className="icon">
              <GitHubIcon />
            </div>
            <div className="icon">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="name-cen">CODEDECK</div>
        <div className="">SEARCH</div>
      </div>

      <div className="bottom">
        <div className="">
          <ul className="options-ul">
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* <li> */}
              {/* Categories */}
              {/* {open ? (
                <ul className="dropdownIn">
                  <li>React</li>
                  <li>Sql</li>
                </ul>
              ) : null} */}
            {/* </li> */}

            <li>
              <Link to="/blogs"> Blogs</Link>
            </li>
            <li>
              <Link to="/?cat=sql">Sql</Link>
            </li>

            <li>
              <Link to="/?cat=react">React</Link>
            </li>
            {/* <li>Style</li> */}
            {/* <li>
              <Link to="/about"> About</Link>
            </li> */}

            {currentUser && (
              <li>
                <Link to="/Write">Write</Link>
              </li>
            )}
            {!currentUser ? (
              <li>
                <Link to="/login">Login</Link>
              </li>
            ) : (
              ""
            )}
            {!currentUser ? (
              <li>
                <Link to="/register">Register</Link>
              </li>
            ) : (
              ""
            )}
            {currentUser && <li>{currentUser?.username}</li>}
            {currentUser && (
              <li>
                <Link onClick={logout}>Logout</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className={`ham-icon`} onClick={() => setShowNav(!showNav)}>
        <Menu />
      </div>
      <div className={`${showNav ? "" : "disappear"} ham-menu`}>
        <div className="options-ham">
          <ul
            className={`options-ul-ham ${showNav ? "" : "disappear padding4"}`}
          >
            {/* <li className={`${showNav ? "" : "disappear"}`}>
              <ClearIcon onClick={() => setShowNav(!showNav)} />
            </li> */}

            {/* <li>Categories</li>
            <li>Blog</li>
            <li>Style</li> */}
            {/* <li>
              <Link to="/about"> About</Link>
            </li> */}

            {/* <li>
              <Link to="/about"> About</Link>
            </li> */}

            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/blogs"> Blogs</Link>
            </li>
            <li>
              <Link to="/?cat=sql">Sql</Link>
            </li>

            <li>
              <Link to="/?cat=react">React</Link>
            </li>

            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            {currentUser && <li>{currentUser?.username}</li>}
            {currentUser && (
              <li>
                <Link onClick={logout}>Logout</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
