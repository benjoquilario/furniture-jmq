"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64URLEncode = base64URLEncode;
exports.generateRandomToken = generateRandomToken;
exports.generateCsrfToken = generateCsrfToken;
exports.generatePkceTokens = generatePkceTokens;
const crypto_1 = require("crypto");
function base64URLEncode(input) {
    return input
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}
function generateRandomToken(bytes) {
    return (0, crypto_1.randomBytes)(bytes).toString('hex');
}
function generateCsrfToken() {
    return generateRandomToken(16);
}
function generatePkceTokens() {
    const codeVerifier = generateRandomToken(32);
    const codeVerifierBuffer = Buffer.from(codeVerifier);
    const codeChallenge = base64URLEncode((0, crypto_1.createHash)('sha256').update(codeVerifierBuffer).digest());
    return { codeVerifier, codeChallenge };
}
