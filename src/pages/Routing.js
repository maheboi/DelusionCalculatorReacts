import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calculator from './Calculator.js';

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calculator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;