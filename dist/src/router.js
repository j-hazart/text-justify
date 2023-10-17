"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const formatTheText_1 = __importDefault(require("./service/formatTheText"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("Express server");
});
router.post("/api/justify", (req, res) => {
    const justifyText = (0, formatTheText_1.default)(req.body);
    res.send(justifyText);
});
exports.default = router;
