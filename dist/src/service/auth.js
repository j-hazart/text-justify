"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
function getToken(email) {
    const payload = { email };
    let jwtSecret;
    if (process.env.JWT_SECRET) {
        jwtSecret = process.env.JWT_SECRET;
    }
    else {
        console.error("JWT_SECRET is not defined in your environment variables.");
        return undefined;
    }
    if (payload && jwtSecret) {
        const token = jsonwebtoken_1.default.sign(payload, jwtSecret);
        return token;
    }
    else {
        return undefined;
    }
}
exports.default = getToken;
