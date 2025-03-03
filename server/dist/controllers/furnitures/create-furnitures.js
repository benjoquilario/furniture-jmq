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
exports.createFurniture = void 0;
const db_1 = __importDefault(require("../../db"));
const http_status_codes_1 = require("http-status-codes");
const furnitures_1 = require("../../validation/furnitures");
const createFurniture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, color, shape, pullOut, size, seater, price, withStorage, selectedFile, description, } = furnitures_1.furnitureSchema.parse(req.body);
    try {
        const transformedSelectedFile = selectedFile.map(file => ({
            url: file.url,
            key: file.key,
        }));
        if (selectedFile.length === 0) {
        }
        const userId = res.locals.userId;
        // const isWithStorage = withStorage === "true" ? true : false
        const furniture = yield db_1.default.furniture.create({
            data: {
                pullOut: Number(pullOut),
                name: name,
                color: color,
                shape: shape,
                size: size,
                seater: Number(seater),
                price: Number(price),
                description: description,
                measurements: '85x85',
                withStorage: withStorage,
                sellerId: userId,
                selectedFile: {
                    create: transformedSelectedFile,
                },
            },
        });
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ furniture });
    }
    catch (error) {
        console.error('An error occurred while creating furniture"', error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
    }
});
exports.createFurniture = createFurniture;
