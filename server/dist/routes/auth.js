"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const credentials_1 = require("../controllers/auth/credentials");
const refresh_1 = require("../controllers/auth/refresh");
const logout_1 = require("../controllers/auth/logout");
const router = express_1.default.Router();
exports.authRouter = router;
router.post('/login', credentials_1.login);
router.post('/register', credentials_1.createUser);
router.post('/refresh', refresh_1.refresh);
router.get('/logout', logout_1.logout);
