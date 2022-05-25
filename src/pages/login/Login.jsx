import "./login.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  let navigate = useNavigate();
  const onFormSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("https://shielded-river-80459.herokuapp.com/auth/login", {
        email,
        pass,
      })
      .then((res) => {
        // console.log(res);
        navigate("/messenger");
        localStorage.setItem("user", res.data.emailName._id);
      });
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Demo Chat App</h3>
          <span className="loginDesc">Let's Go Broooo </span>
        </div>

        <div className="loginRight">
          <form className="loginBox"  onSubmit={onFormSubmit}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="5"
              className="loginInput"
              onChange={(e) => setPass(e.target.value)}
            />
            <button className="loginButton" type="submit">
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register">
              <button className="loginRegisterButton">
                Create a New Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
