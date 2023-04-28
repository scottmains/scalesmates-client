import jwt_decode from "jwt-decode";

const API_URL = "https://localhost:7255";


interface DecodedToken {
  exp: number;
}

export function getToken(): string | null {
  const token = localStorage.getItem("authToken");
  
  if (!token) {
    return null;
  }

  const decodedToken = jwt_decode(token) as DecodedToken;
  const currentTime = Date.now() / 1000; // convert milliseconds to seconds

  if (decodedToken.exp < currentTime) {
    // Token is expired, remove it from localStorage
    localStorage.removeItem("authToken");
    return null;
  }

  return token;
  }

  export async function register(email: string, password: string, confirmPassword: string): Promise<void> {
    const response = await fetch(`${API_URL}/account/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, confirmPassword }),
    });
    if (!response.ok) {
      throw new Error("Registration failed");
    }
  }
  
  export async function login(email: string, password: string): Promise<string> {
    const response = await fetch(`${API_URL}/account/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }
    const token = await response.text();
    return token;
  }