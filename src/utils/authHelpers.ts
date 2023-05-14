// authHelpers.ts
export function validateInput(email: string, password: string) {
    let isValid = true;
    let emailError = "";
    let passwordError = "";
  
    if (!email) {
      emailError = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError = "Please enter a valid email address.";
      isValid = false;
    }
  
    if (!password) {
      passwordError = "Password is required.";
      isValid = false;
    } else if (password.length < 6) {
      passwordError = "Password must be at least 6 characters.";
      isValid = false;
    }
  
    return { isValid, emailError, passwordError };
  }
  