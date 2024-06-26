// Import the library
import * as CryptoJS from 'crypto-js';

// Encryption function
export const encryptData = (data: string, key: string): string => {
   return CryptoJS.AES.encrypt(data, key).toString();
};

// Decryption function
export const decryptData = (data: string, key: string): string => {
   const bytes = CryptoJS.AES.decrypt(data, key);
   return bytes.toString(CryptoJS.enc.Utf8);
};
