import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SeachPageDetail from './pages/SearchPageDetail/SearchPageDetail';
import MyWord from './pages/MyWord/MyWord';
import LessonDetail from './pages/LessonDetail/LessonDetail';
import QuizPage from './pages/Quiz/QuizPage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUp';

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
        <Route path="/signin" element={<SignInPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
