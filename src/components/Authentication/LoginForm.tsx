import React, { useState } from "react";
import { login } from "../../services/authService";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useUserContext();
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem("authToken", token);
      setIsAuthenticated(true);
      navigate('/');
      onLoginSuccess(); // call the onLoginSuccess function provided by the parent component
    } catch (error) {
      console.log(((error as Error).message));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center p-10 rounded-lg ">
      <h2 className="text-2xl font-bold mb-5">Login</h2>
      <div className="mb-5">
        <label className="block text-gray-700 font-bold mb-2">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-5">
        <label className="block text-gray-700 font-bold mb-2">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-700">
        Login
      </button>
    </form>
  );
}
