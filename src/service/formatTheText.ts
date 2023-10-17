function formatTheText(text: string): string {
  const lines: Array<string> = [];
  let line: string = "";
  const words: Array<string> = text.split(" ");

  words.forEach((word: string) => {
    if (line.length + word.length > 80 || word.includes("\n")) {
      lines.push(line.trim());
      line = word + " ";
    } else {
      line += word + " ";
    }
  });

  const justifyText: Array<String> = lines.map((line) => {
    if (line.length < 80) {
      return justifyLine(line) + "\n";
    }
    return line + "\n";
  });

  return justifyText.join("");
}

function justifyLine(line: string): string {
  let justifiedLine: string = "";
  const spacesToAdd: number = 80 - line.length;
  const words: Array<string> = line.split(" ");
  const wordCount: number = words.length;

  const spacesPerWord: number  = Math.ceil(spacesToAdd / (wordCount - 1));
  const extraSpaces: number  = spacesToAdd % (wordCount - 1);

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

export default formatTheText;
