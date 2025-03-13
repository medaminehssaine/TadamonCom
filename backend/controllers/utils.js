export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
export const EMAIL_MAX_LENGTH = 50;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 20;

export const ENDPOINT = 'http://localhost:3000';

export const encodeBase64 = (str) => {
  // Using btoa for Base64 encoding in React Native
  try {
    return btoa(str);
  } catch (error) {
    console.error('Base64 encoding error:', error);
    return '';
  }
};

// Function to decode if needed
export const decodeBase64 = (str) => {
  try {
    return atob(str);
  } catch (error) {
    console.error('Base64 decoding error:', error);
    return '';
  }
};

export const hashData = (str) => {
  // Using SHA-256 for hashing
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
};
