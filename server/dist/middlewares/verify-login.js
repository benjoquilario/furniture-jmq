"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyLogin = void 0;
const verify_jwt_1 = require("../utils/verify-jwt");
const http_status_codes_1 = require("http-status-codes");
const verifyLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    if (authHeader) {
        if (authHeader.startsWith('Bearer ')) {
            const token = authHeader.slice(7);
            try {
                const payload = (0, verify_jwt_1.verifyJwt)(token);
                res.locals.userId = payload.sub;
            }
            catch (error) {
                res
                    .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                    .json({ error: 'Access token is not valid' });
                return;
            }
        }
        else {
            res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ error: 'Invalid token format' });
            return;
        }
    }
    else {
        res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ error: 'Authorization header is missing' });
        return;
    }
    next();
});
exports.verifyLogin = verifyLogin;
