"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_2 = require("uploadthing/express");
const uploadthing_1 = require("./uploadthing");
const auth_1 = require("./routes/auth");
const furniture_1 = require("./routes/furniture");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Allow requests from the frontend site
    credentials: true, // Allow frontend to send cookies to our API
}));
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
app.use('/api/uploadthing', (0, express_2.createRouteHandler)({
    router: uploadthing_1.uploadRouter,
    // config: { ... },
}));
app.use('/auth', auth_1.authRouter);
app.use('/furniture', furniture_1.furnitureRouter);
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
