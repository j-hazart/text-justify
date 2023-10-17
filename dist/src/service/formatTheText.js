"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatTheText(text) {
    const lines = [];
    let line = "";
    const words = text.split(" ");
    words.forEach((word) => {
        if (line.length + word.length > 80 || word.includes("\n")) {
            lines.push(line.trim());
            line = word + " ";
        }
        else {
            line += word + " ";
        }
    });
    const justifyText = lines.map((line) => {
        if (line.length < 80) {
            return justifyLine(line) + "\n";
        }
        return line + "\n";
    });
    return justifyText.join("");
}
function justifyLine(line) {
    let justifiedLine = "";
    const spacesToAdd = 80 - line.length;
    const words = line.split(" ");
    const wordCount = words.length;
    const spacesPerWord = Math.ceil(spacesToAdd / (wordCount - 1));
    const extraSpaces = spacesToAdd % (wordCount - 1);
    for (let i = 0; i < wordCount; i++) {
        justifiedLine += words[i];
        if (i < wordCount - 1) {
            justifiedLine += " ".repeat(spacesPerWord);
            if (i < extraSpaces) {
                justifiedLine += " ";
            }
        }
    }
    return justifiedLine;
}
exports.default = formatTheText;
