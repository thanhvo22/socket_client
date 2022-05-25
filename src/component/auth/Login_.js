import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "../Join/Join.css";

export const Login_ = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  let navigate = useNavigate();
  const onFormSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:3001/auth/login", {
        email,
        pass
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      });
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">Login Page</h1>
          <div>
            <input
              placeholder="Email"
              className="joinInput"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="PassWord"
              className="joinInput"
              type="password"
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <button className={"button mt-20"} type="submit">
            Login
          </button>
          <p>
            Don't have an account?
            <Link to="/register">
              <button className={"button mt-16"} type="submit">
                Register
              </button>
            </Link>
          </p>
        </div>
      </div>
    </Form>
  );
};
