import React, { useState } from "react";
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from "../../services/authService";
import { setIsAuthenticated, setToken } from '../../store/reducers/user'; 

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem("authToken", token);
      dispatch(setIsAuthenticated(true));
      dispatch(setToken(token)); // Dispatch the setToken action from userSlice
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
