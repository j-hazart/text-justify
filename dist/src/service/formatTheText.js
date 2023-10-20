"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatTheText(text) {
    const caractersLimit = 80;
    const paragraphs = text.split("\n");
    const linesResizedParagraphs = [];
    paragraphs.forEach((paragraph) => {
        linesResizedParagraphs.push(resizeLines(paragraph, caractersLimit));
    });
    const justifiedParagraphs = linesResizedParagraphs.map((linesResizedParagraph) => {
        return justifyParagraph(linesResizedParagraph, caractersLimit).join('');
    });
    return justifiedParagraphs.join('');
}
function resizeLines(text, caractersLimit) {
    const lines = [];
    let line = '';
    const words = text.split(" ");
    words.forEach((word, index) => {
        if (line.length + word.length > caractersLimit) {
            lines.push(line.trim());
            line = word + " ";
        }
        else {
            line += word + " ";
            index === words.length - 1 && lines.push(line.trim());
        }
    });
    return lines;
}
function justifyParagraph(paragraph, caractersLimit) {
    return paragraph.map((line, index) => {
        if (line.length < caractersLimit && index !== paragraph.length - 1) {
            return justifyLine(line, caractersLimit) + "\n";
        }
        return line + "\n";
    });
}
function justifyLine(line, caractersLimit) {
    let justifiedLine = "";
    const spacesToAdd = caractersLimit - line.length;
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
