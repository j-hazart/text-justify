function formatTheText(text: string): string {
  const caractersLimit: number = 80;
  const paragraphs: string[] = text.split("\n");
  const linesResizedParagraphs: string[][] = [];

  paragraphs.forEach((paragraph) => {
    linesResizedParagraphs.push(resizeLines(paragraph, caractersLimit))
  });

  const justifiedParagraphs: string[] = linesResizedParagraphs.map((linesResizedParagraph) => {
    return justifyParagraph(linesResizedParagraph, caractersLimit).join('');
  })

  return justifiedParagraphs.join('');
}

function resizeLines(text: string, caractersLimit: number): string[] {
  const lines:string[] = [];
    let line: string = '';
    const words: string[] = text.split(" ");

    words.forEach((word, index) => {
      if (line.length + word.length > caractersLimit) {
        lines.push(line.trim());
        line = word + " ";
      } else {
        line += word + " ";
        index === words.length - 1 && lines.push(line.trim());
      }
    })
    return lines;
}

function justifyParagraph(paragraph: string[], caractersLimit: number): string[] {
  return paragraph.map((line, index) => {
    if (line.length < caractersLimit && index !== paragraph.length - 1) {
      return justifyLine(line, caractersLimit) + "\n";
    }
    return line + "\n";
  })
}

function justifyLine(line: string, caractersLimit: number): string {
  let justifiedLine: string = "";
  const spacesToAdd: number = caractersLimit - line.length;
  const words: string[] = line.split(" ");
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
