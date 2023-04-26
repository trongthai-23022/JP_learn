import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
