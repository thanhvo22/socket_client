import React from "react";
import axios from "axios";
import { useState } from "react";

import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../css/login.css"


function Login() {
  const [email, setEmail] = useState("");
  const [pass, setpass] = useState("");
  
  let navigate = useNavigate();
  const onFormSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:3001/auth/login", {
        email,
        pass,
      })
      .then((res) => {
        console.log(res);
        window.localStorage.setItem('id',res.data.emailName._id);        
        navigate('/')
      });
  };

 
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>T2H </h1>
          <h4>Welcome to T2H SHOP</h4>
          <Form onSubmit={onFormSubmit} className="my-4">
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="username"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Control
                type="password"
                name="pass"
                value={pass}
                onChange={(e) => setpass(e.target.value)}
                placeholder="password"
                required
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Login
            </Button>
          </Form>
          <p>
            Don't have an account?
            <Link to="/register">
              <Button variant="info" size="sm" className="ml-2">
                Register
              </Button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;