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
exports.authCallback = void 0;
const getUser_1 = require("../services/getUser");
const authCallback = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.locals.user = yield (0, getUser_1.getUser)(res.locals.userId);
        next();
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.authCallback = authCallback;
