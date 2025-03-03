"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.furnitureRouter = void 0;
const express_1 = __importDefault(require("express"));
const verify_login_1 = require("../middlewares/verify-login");
const create_furnitures_1 = require("../controllers/furnitures/create-furnitures");
const router = express_1.default.Router();
exports.furnitureRouter = router;
router.use(verify_login_1.verifyLogin);
router.post('/create', create_furnitures_1.createFurniture);
