const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || 'default-secret-key-for-development';
export const encryptResponse = (data : any) => {
    const textToEncrypt = typeof data === 'object' ? JSON.stringify(data) : data.toString();
    return CryptoJS.AES.encrypt(textToEncrypt, SECRET_KEY).toString();
};

export const decryptResponse = (cipherText : any) => {
    if (!cipherText || !SECRET_KEY) {
        return {
            state: 'error',
            response: 'Missing data for decryption'
        };
    }
    
    try {
        const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        
        // Try to parse as JSON, if it fails return as plain text
        try {
            return {
                state: 'success',
                response: JSON.parse(decryptedText)
            };
        } catch {
            return {
                state: 'success',
                response: decryptedText
            };
        }
    } catch (error) {
        console.error('Decryption failed:', error);
        return {
            state: 'error',
            response: 'Decryption Error'
        };
    }
};
