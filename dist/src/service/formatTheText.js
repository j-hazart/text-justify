"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatTheText(text) {
    const lines = [];
    let line = "";
    const words = text.split(" ");
    words.forEach((word) => {
        if ((line.length + word.length) <= 80) {
            line += (word + " ");
        }
        else {
            lines.push(line.trim());
            line = word + " ";
        }
    });
    return lines;
}
exports.default = formatTheText;
