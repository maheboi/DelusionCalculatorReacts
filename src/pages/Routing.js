import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Calculator } from "./Calculator.js";
import { LogIn } from "./LogIn.js";
import { Results } from "./Results.js";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Results" element={<Results />} />
        <Route path="/Calculator" element={<Calculator />} />
        <Route path="/" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
};
