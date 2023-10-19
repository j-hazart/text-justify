"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.getToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
if (process.env.JWT_SECRET) {
    var jwtSecret = process.env.JWT_SECRET;
}
else {
    console.error("JWT_SECRET is not defined in your environment variables.");
}
function getToken(email) {
    const payload = { email };
    if (payload && jwtSecret) {
        const token = jsonwebtoken_1.default.sign(payload, jwtSecret);
        return token;
    }
    else {
        return undefined;
    }
}
exports.getToken = getToken;
function verifyToken(req, res, next) {
    try {
        const authorizationHeader = req.get("Authorization");
        if (authorizationHeader == null) {
            throw new Error("Authorization header is missing");
        }
        const [type, token] = authorizationHeader.split(" ");
        if (type !== "Bearer") {
            throw new Error("Authorization header has not the 'Bearer' type");
        }
        if (!jsonwebtoken_1.default.verify(token, jwtSecret)) {
            throw new Error("Token is not available");
        }
        req.token = token;
        next();
    }
    catch (err) {
        console.error(err);
        res.sendStatus(401);
    }
}
exports.verifyToken = verifyToken;
