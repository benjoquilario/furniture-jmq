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
exports.login = exports.createUser = void 0;
const db_1 = __importDefault(require("../../db"));
const session_1 = require("../../utils/session");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const zod_1 = require("zod");
const credentials_1 = require("../../validation/credentials");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName, confirmPassword } = credentials_1.signUpSchema.parse(req.body);
    try {
        const isEmailExist = yield db_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (isEmailExist) {
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: 'Email already exists', data: req.body });
            return;
        }
        if (password !== confirmPassword) {
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: 'Passwords do not match', data: req.body });
            return;
        }
        const hashedPassword = yield (0, session_1.hashPassword)(password);
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        yield db_1.default.user.create({
            data: {
                role: 'USER',
                email,
                hashedPassword: hashedPassword,
                name: `${firstName} ${lastName}`,
                image: `/avatar-${randomNumber}.png`,
            },
        });
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: 'User created successfully', data: req.body });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ error: 'Invalid data', data: error });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = credentials_1.signInSchema.parse(req.body);
    console.log('Requesting');
    try {
        const user = yield db_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: 'Email does not exist', success: false });
            return;
        }
        const isPasswordCorrect = yield (0, session_1.comparePasswords)(password, user === null || user === void 0 ? void 0 : user.hashedPassword);
        if (!isPasswordCorrect) {
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: 'Invalid password', success: false });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ sub: user === null || user === void 0 ? void 0 : user.id, name: user === null || user === void 0 ? void 0 : user.name }, process.env.JWT_SECRET, {
            expiresIn: '90d',
        });
        res.cookie('refreshToken', token, {
            maxAge: 30 * 60 * 60 * 1000,
            secure: true,
            httpOnly: true,
            sameSite: 'none',
        });
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: 'Login Successfully', success: true });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ error: 'Invalid data', details: error });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
    }
});
exports.login = login;
