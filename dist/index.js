"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./src/app"));
dotenv_1.default.config();
const port = parseInt((_a = process.env.APP_PORT) !== null && _a !== void 0 ? _a : "5000");
app_1.default.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
