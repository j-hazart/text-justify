"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const formatTheText_1 = __importDefault(require("./service/formatTheText"));
const auth_1 = require("./service/auth");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("Express server");
});
router.post("/api/justify", auth_1.verifyToken, (req, res) => {
    res.send((0, formatTheText_1.default)(req.body));
});
router.post("/api/token", (req, res) => {
    const email = req.body.email;
    if (!email) {
        res.status(400).send("Bad Request - Email is missing");
        return;
    }
    const token = (0, auth_1.getToken)(email);
    token
        ? res.send(token)
        : res.sendStatus(401);
});
exports.default = router;
