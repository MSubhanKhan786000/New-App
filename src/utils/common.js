import Cookies from 'js-cookie';
var CryptoJs = require('crypto-js');

// Encrypt function
export const encrypt = (key, data) => {
  return CryptoJs.AES.encrypt(JSON.stringify(data), key).toString();
};

// Decrypt function with error handling
export const decrypt = (key, data) => {
  try {
    const decryptedData = CryptoJs.AES.decrypt(data, key);
    const decryptedString = decryptedData.toString(CryptoJs.enc.Utf8);
    
    // Check if the decrypted string is valid
    if (decryptedString) {
      return JSON.parse(decryptedString); // Parse the decrypted string as JSON
    } else {
      console.warn("Decrypted string is empty or invalid");
      return null;
    }
  } catch (error) {
    console.error("Error during decryption:", error);
    return null; // Return null if decryption fails
  }
};

// Set cookie with encrypted data
export const setCookie = (data, key) => {
  const encryptData = encrypt(key + "ADMIN@123", data); // Encrypt data with a key
  Cookies.set(key, encryptData, { secure: true, expires: 1 }); // Set cookie with 1 day expiry
};

// Get and decrypt the cookie value
export const getCookie = (key) => {
  const cookieData = Cookies.get(key);
  
  // Check if cookie data exists before decrypting
  if (cookieData) {
    return decrypt(key + "ADMIN@123", cookieData);
  } else {
    console.warn("No cookie found for key:", key);
    return null;
  }
};

// Delete cookie
export const deleteCookie = (key) => {
  Cookies.remove(key, { path: '', domain: 'localhost' });
};

// Get authentication token with error handling
export const getAuthToken = () => {
    const user = getCookie("_USER_AUTH"); // Retrieve cookie data
    if (user) {
      try {
        return user; // Return the user object directly instead of stringifying it
      } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
      }
    } else {
      return null;
    }
  };
  
