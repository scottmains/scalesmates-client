import React, { useState } from "react";
import { register } from "../../services/authService";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      await register(email, password, confirmPassword);
      setIsSuccess(true);
    } catch (error) {
      alert((error as Error).message);
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Registration successful!</h2>
        <p className="text-lg">Please log in <a href="/login" className="text-blue-600 hover:underline">here</a>.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <div className="mb-2">
        <label className="text-lg">Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mt-2 border rounded" />
      </div>
      <div className="mb-2">
        <label className="text-lg">Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mt-2 border rounded" />
      </div>
      <div className="mb-4">
        <label className="text-lg">Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 mt-2 border rounded" />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register</button>
    </form>
  );
}
