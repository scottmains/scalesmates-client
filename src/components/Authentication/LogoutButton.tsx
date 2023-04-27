import React from 'react';
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const { setIsAuthenticated } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/');
  };

  return <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
