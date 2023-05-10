import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SeachPageDetail from './pages/SearchPageDetail/SearchPageDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/search/detail/:kanji" element={<SeachPageDetail/>} />
      </Routes>
    </Router>
  );
}

export default App;
