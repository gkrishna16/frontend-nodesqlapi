import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./register.css";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: ``,
    email: ``,
    password: ``,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(`/api/auth/register`, inputs);
      navigate("/login");
      console.log(res);
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
    setInputs((prev) => ({ ...prev, username: "" }));
  }

  return (
    <div>
      <Navbar />
      <div className="register-page"></div>
      <div className="register-form-container">
        <form className="form">
          <h1>Register</h1>
          <label htmlFor="" className="form-element">
            <input
              required
              type="text"
              // placeholder="username"
              name="username"
              onChange={handleChange}
            />
            <span className="placeholder">username</span>
          </label>
          <label htmlFor="" className="form-element">
            <input
              required
              type="text"
              // placeholder="email"
              name="email"
              onChange={handleChange}
            />
            <span className="placeholder">email</span>
          </label>
          <label htmlFor="" className="form-element">
            <input
              required
              type="text"
              // placeholder="password"
              name="password"
              onChange={handleChange}
            />
            <span className="placeholder">password</span>
          </label>
          <div className="button-div">
            <button onClick={handleSubmit}>Register</button>
          </div>
          <div className="error-msg"> {error && error}</div>
          <span>
            Do you have an account ?
            <Link className="logi" to="/login">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
