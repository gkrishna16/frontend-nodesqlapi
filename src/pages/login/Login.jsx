import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/authContext";
import "./login.css";

const Login = () => {
  const [input, setInput] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { currentUser, login, logout } = useContext(AuthContext);
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
      <div className="">
        <h1>Login</h1>
      </div>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        {/* <input required type="text" placeholder="password" name="username" /> */}
        <button onClick={handleSubmit}>Login</button>
        <div className="">{error && error}</div>
        <span>
          It seems you are not registered. <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
