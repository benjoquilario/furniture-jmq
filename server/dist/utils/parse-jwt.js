"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJwtPayload = parseJwtPayload;
function parseJwtPayload(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
