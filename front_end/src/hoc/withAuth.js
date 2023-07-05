import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../store/authSlice';

const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        
        dispatch(checkAuth());
      }, [dispatch]);
  const isAuthenticated = useSelector((state) => state.auth.loggedIn);
  const location = useLocation();

  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to={`/signin?redirect=${encodeURIComponent(location.pathname)}`} />;
  }
};

export default PrivateRoute;    
