import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Login from "../login/Login";
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
      const res = await axios.post(
        `https://gopalblogsapi.herokuapp.com/api/auth/register`,
        inputs,
        {
          headers: { "Access-Control-Allow-Origin": "*" },
          "Content-Type": "application/json",
          withCredentials: true,
        }
      );
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
      <div className="register-page">
        <h1>Register</h1>
      </div>
      <form className="form">
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="text"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="text"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Register</button>
        <div className="error-msg"> {error && error}</div>
        <span>
          Do you have an account ?<Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
