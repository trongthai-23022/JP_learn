import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SeachPageDetail from './pages/SearchPageDetail/SearchPageDetail';
import MyWord from './pages/MyWord/MyWord';
import LessonDetail from './pages/LessonDetail/LessonDetail';
import QuizPage from './pages/Quiz/QuizPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/search/detail/:kanji" element={<SeachPageDetail/>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/myword" element={<MyWord/>}/>
        <Route path="/lesson/:lessonId" element={<LessonDetail/>} />
        <Route path="/lesson/:lessonId/quiz" element={<QuizPage/>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
