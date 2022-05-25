import axios from "axios";
import { useRef } from "react";
import "./register.css";

export default function Register() {
  const email = useRef();

  const handleClick = async (e) => {
    e.preventDefault();

    const user = {
      email: email.current.value,
    };
    try {
      await axios.post("/auth/register", user);
      window.localStorage.setItem("user", user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
