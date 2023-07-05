import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, restoreAuthState } from './store/authSlice';

import HomePage from './pages/HomePage/HomePage';
import SearchPageDetail from './pages/SearchPageDetail/SearchPageDetail';
import MyWord from './pages/MyWord/MyWord';
import LessonDetail from './pages/LessonDetail/LessonDetail';
import QuizPage from './pages/Quiz/QuizPage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUp';
import PrivateRoute from './hoc/withAuth';

function App() {
  const dispatch = useDispatch();
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Khôi phục trạng thái xác thực từ localStorage hoặc cookie
      await dispatch(restoreAuthState());

      // Khi khôi phục hoàn thành, gọi hàm checkAuth để kiểm tra trạng thái xác thực hiện tại
      await dispatch(checkAuth());

      setIsAuthReady(true);
    };

    fetchData();
  }, [dispatch]);

    

  // Sử dụng useSelector để truy cập trạng thái xác thực
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      {isAuthReady && (
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/search/detail/:kanji" element={<SearchPageDetail />} />
          <Route path="/myword" element={<PrivateRoute><MyWord /></PrivateRoute>} />
          <Route path="/lesson/:lessonId" element={<LessonDetail />} />
          <Route path="/lesson/:lessonId/quiz" element={<QuizPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
