"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = parseInt((_a = process.env.APP_PORT) !== null && _a !== void 0 ? _a : "5000");
app.get("/", (req, res) => {
    res.send("Express server");
});
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
