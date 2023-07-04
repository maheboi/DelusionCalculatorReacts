import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Calculator from "./Calculator.js";
import LogIn from "./LogIn.js";
import Results from "./Results.js";
import Info from "./Info.js";
function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Results" element={<Results />} />
        <Route path="/Info" element={<Info />} />
        <Route path="/" element={<Calculator />} />
        <Route path="/LogIn" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
