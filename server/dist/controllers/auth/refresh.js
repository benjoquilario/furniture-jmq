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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../../db"));
const verify_jwt_1 = require("../../utils/verify-jwt");
const http_status_codes_1 = require("http-status-codes");
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
    try {
        const decoded = (0, verify_jwt_1.verifyJwt)(token);
        const user = yield db_1.default.user.findUnique({
            where: {
                id: decoded.sub,
            },
        });
        if (!user) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: 'User not found' });
            return;
        }
        const accessToken = jsonwebtoken_1.default.sign({ sub: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.send({ accessToken, user });
    }
    catch (error) {
        res.sendStatus(http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
});
exports.refresh = refresh;
