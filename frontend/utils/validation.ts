export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
export const EMAIL_MAX_LENGTH = 50;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 20;

export const ENDPOINT = 'http://localhost:3000';

export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';
  if (email.length > EMAIL_MAX_LENGTH) return `Email must be less than ${EMAIL_MAX_LENGTH} characters`;
  if (!EMAIL_REGEX.test(email)) return 'Invalid email format';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (password.length < PASSWORD_MIN_LENGTH) return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
  if (password.length > PASSWORD_MAX_LENGTH) return `Password must be less than ${PASSWORD_MAX_LENGTH} characters`;
  return null;
};

export const encodeBase64 = (str: string): string => {
  // Using btoa for Base64 encoding in React Native
  try {
    return btoa(str);
  } catch (error) {
    console.error('Base64 encoding error:', error);
    return '';
  }
};

// Function to decode if needed
export const decodeBase64 = (str: string): string => {
  try {
    return atob(str);
  } catch (error) {
    console.error('Base64 decoding error:', error);
    return '';
  }
};

export const hashData = (str: string): string => {
  // Using SHA-256 for hashing
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
};
