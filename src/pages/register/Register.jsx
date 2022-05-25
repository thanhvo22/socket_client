import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [email, setEmail] = useState("");

  let navigate = useNavigate();
  const onFormSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("https://shielded-river-80459.herokuapp.com/auth/register", {
        email,
      })
      .then((res) => {
        // console.log(res);
        navigate("/login");
        // localStorage.setItem("user", res.data.emailName._id);
      });
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Demo Chat App</h3>
          <span className="loginDesc">
            Password will be emailed, or password is 123456
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={onFormSubmit}>
            <input
              placeholder="Email"
              required
              className="loginInput"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <button className="loginButton" type="submit">
              Register an account
            </button>
            <Link to="/login">
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
