import React, { ReactNode } from 'react';
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import WeightTracker from "./pages/WeightTracker";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import Navbar from './components/Common/Navbar';
import { useUserContext } from './context/UserContext';
import "./App.css";
import CalorieTracker from './pages/CalorieTracker';

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { isAuthenticated } = useUserContext();
  const location = useLocation();

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/weight-tracker" element={<AuthWrapper><WeightTracker /></AuthWrapper>} />
          <Route path="/calorie-tracker" element={<AuthWrapper><CalorieTracker/></AuthWrapper>} />
          <Route path="/profile" element={<AuthWrapper><ProfilePage /></AuthWrapper>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
