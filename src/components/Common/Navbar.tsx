import React, { useState } from "react";
import { BiLogInCircle } from "react-icons/bi";
import "./Navbar.css";
import DropdownMenu from "./DropdownMenu";
import LoginSignupModal from "../Authentication/LoginSignupModal";

import ProfileDropdownMenu from "./ProfileDrowndownMenu";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const NavigationBar: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated); 
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
