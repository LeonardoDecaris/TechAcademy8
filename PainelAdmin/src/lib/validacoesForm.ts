export const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? true : "Email is Invalid ";
};

export const validatePassword = (password: string) => {
  if (!password) return "Password is mandatory";
  if (password.length < 8) return "Password must be at least 8 characters long";
  if (!/(?=.*[A-Z])/.test(password))
    return "Password must contain at least one uppercase letter";
  if (!/(?=.*\d)/.test(password))
    return "Password must contain at least one number";
  if (!/(?=.*[@$!%*?&/])/.test(password))
    return "Password must contain at least one special character";

  return true; 
};

export const validatePasswordLogin = (password: string) => {
  return password.trim().length > 0 ? true : "Password is mandatory";
};
