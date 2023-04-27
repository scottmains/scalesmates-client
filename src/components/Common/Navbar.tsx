import React, { useState } from "react";
import { BiLogInCircle } from "react-icons/bi";

import { useUserContext } from "../../context/UserContext";
import "./Navbar.css";
import DropdownMenu from "./DropdownMenu";
import LoginSignupModal from "../Authentication/LoginSignupModal";
import { useNavigate } from "react-router-dom";
import ProfileDropdownMenu from "./ProfileDrowndownMenu";

const NavigationBar: React.FC = () => {
  const { isAuthenticated } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && <LoginSignupModal onClose={closeModal} />}
      <header className="main-header">
        <div className="nav-wrapper">
          <nav className="nav">
            <div>
              <DropdownMenu />
            </div>
            <div className="logo">
              {/* Replace the src with your logo */}
              <img alt="Logo" />
            </div>
            <button className="search">
              {isAuthenticated ? (
              <div>
              <ProfileDropdownMenu />
              </div>
              ) : (
                <BiLogInCircle size={24} onClick={openModal} />
              )}
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default NavigationBar;
