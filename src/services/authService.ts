

const API_URL = "https://localhost:7255";

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