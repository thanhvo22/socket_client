import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "../Join/Join.css";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  let navigate = useNavigate();
  const onFormSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:3001/auth/register", {
        email,
      })
      .then((res) => {
        console.log(res);

        navigate("/login");
      });
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">Register</h1>
          <div>
            <input
              placeholder="Email"
              className="joinInput"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className={"button mt-20"} type="submit">
            Register
          </button>
        </div>
      </div>
    </Form>
  );
};
