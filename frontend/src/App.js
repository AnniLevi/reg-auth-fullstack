import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./sections/Login";
import Register from "./sections/Register";
import Name from "./sections/Name";
import Contacts from "./sections/Contacts";
import Location from "./sections/Location";
import Profile from "./sections/Profile";
import Result from "./sections/Result";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/name" element={<Name />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/location" element={<Location />} />
        <Route path="/result" element={<Result />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
