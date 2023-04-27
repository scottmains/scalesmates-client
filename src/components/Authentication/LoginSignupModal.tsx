import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

interface LoginSignupModalProps {
  onClose: () => void;
}

const LoginSignupModal: React.FC<LoginSignupModalProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleIsLogin = () => {
    setIsLogin(!isLogin);
  };

  function handleLoginSuccess() {
    onClose();
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          {isLogin ? (
            <>
              <LoginForm onLoginSuccess={handleLoginSuccess} />
              <button onClick={toggleIsLogin}>Don't have an account?</button>
            </>
          ) : (
            <>
              <h2>Signup</h2>
              <SignupForm />
              <button onClick={toggleIsLogin}>Already have an account?</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignupModal;
