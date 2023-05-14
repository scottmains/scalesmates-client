import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { login } from "../../services/authService";
import { setIsAuthenticated, setToken } from "../../store/reducers/user";
import CircularProgress from '@mui/material/CircularProgress';
import { validateInput } from "../../utils/authHelpers";

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginMutation = useMutation(login, {
    onSuccess: (token) => {
      localStorage.setItem("authToken", token);
      dispatch(setIsAuthenticated(true));
      dispatch(setToken(token));
      navigate("/");
      onLoginSuccess();
    },
    onError: (error) => {
      setErrorMessage(((error as Error).message));
    },
  });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { isValid, emailError, passwordError } = validateInput(email, password);
    setEmailError(emailError);
    setPasswordError(passwordError);
  
    if (!isValid) {
      return;
    }
    loginMutation.mutate({ email, password });
  }


  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center p-10 rounded-lg ">
      <h2 className="text-2xl font-bold mb-5">Login</h2>
      {errorMessage && (
      <p className="text-red-600 text-center mt-4">{errorMessage}</p>
    )}
      <div className="mb-5">
        <label className="block text-gray-700 font-bold mb-2">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {emailError && <p className="text-red-600">{emailError}</p>}
      </div>
      <div className="mb-5">
        <label className="block text-gray-700 font-bold mb-2">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {passwordError && <p className="text-red-600">{passwordError}</p>}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-700"
        disabled={loginMutation.isLoading}
      >
        {loginMutation.isLoading ? (
          <CircularProgress size={24} style={{ color: 'white' }} />
        ) : (
          'Login'
        )}
      </button>
    </form>
  );
}
