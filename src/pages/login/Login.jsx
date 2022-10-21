import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/authContext";
import "./login.css";

const Login = () => {
  const [input, setInput] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { currentUser, login } = useContext(AuthContext);
  console.log(currentUser);

  function handleChange(e) {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(input);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(input);
      // console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <form>
          <h1>Login</h1>
          <label htmlFor="" className="custom-field">
            <input
              required
              type="text"
              // placeholder="username"
              name="username"
              onChange={handleChange}
              autoComplete="off"
            />
            <span className="placeholder">Enter Username </span>
          </label>
          <label htmlFor="" className="custom-field">
            <input
              required
              type="password"
              // placeholder="password"
              name="password"
              onChange={handleChange}
              autoComplete="off"
            />
            <span className="placeholder">Enter Password </span>
          </label>

          {/* <input required type="text" placeholder="password" name="username" /> */}
          <div className="button-sec">
            <button onClick={handleSubmit}>Login</button>
          </div>
          <div className="error-msg">{error && error}</div>
          <span>
            It seems you are not registered.{" "}
            <Link to="/register" className="regis">
              Register
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
