import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Add this import
import { setIsAuthenticated, setToken } from '../../store/reducers/user'; // Add this import

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch(); // Replace useUserContext with useDispatch
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    dispatch(setIsAuthenticated(false)); // Dispatch setIsAuthenticated action
    dispatch(setToken(null)); // Dispatch setToken action
    navigate('/');
  };

  return <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
