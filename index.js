// index.js
import { Blowfish } from 'egoroof-blowfish';

const decryptBlowfish = (string, KEY_BLOWFISH) => {
    const bf = new Blowfish(KEY_BLOWFISH, Blowfish.MODE.ECB, Blowfish.PADDING.NULL);
    bf.setIv('00000000');

    // Turn Hex into Uint8Array
    const hex = Uint8Array.from(Buffer.from(string, 'hex'));

    // Decode
    const decoded = bf.decode(hex, Blowfish.TYPE.STRING);
    return decoded;
};

// Get arguments from the command line
const [,, encryptedString, key] = process.argv;

if (!encryptedString || !key) {
    console.error('Usage: node index.js <encryptedString> <key>');
    process.exit(1);
}

try {
    // Directly call the decryption function and log the result
    const decrypted = decryptBlowfish(encryptedString, key);
    console.log('Decrypted String:', decrypted);
} catch (error) {
    console.error('Error during decryption:', error.message);
    process.exit(1);
}

// node index.js '1234' '1234'
