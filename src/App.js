import React from "react";
// import socketIOClient from "socket.io-client";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import Messenger from "./pages/messenger/Messenger";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        {/* <Route exact path="/" element={<Home />} /> */}
        <Route exact path="/messenger" element={<Messenger />} />
      </Routes>
    </Router>
  );
}

export default App;
