import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calculator from './Calculator.js';
import LogIn from './LogIn.js';

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Calculator" element={<Calculator />} />
        <Route path="/" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;