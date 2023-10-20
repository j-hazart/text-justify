/**
 * The function `formatTheText` takes a string of text and formats it into paragraphs with a maximum of
 * 80 characters per line, then justifies the paragraphs and returns the formatted text.
 * @param {string} text - The `text` parameter is a string that represents the text that needs to be
 * formatted.
 * @returns The function `formatTheText` returns a string that contains the formatted and justified
 * paragraphs of the input text.
 */
function formatTheText(text: string): string {
  const caractersLimit: number = 80;
  const paragraphs: string[] = text.split("\n");
  const linesResizedParagraphs: string[][] = [];

  paragraphs.forEach((paragraph) => {
    if(paragraph.length !== 0) linesResizedParagraphs.push(resizeLines(paragraph, caractersLimit))
  });

  const justifiedParagraphs: string[] = linesResizedParagraphs.map((linesResizedParagraph) => {
    return justifyParagraph(linesResizedParagraph, caractersLimit).join('');
  })

  return justifiedParagraphs.join('');
}

/**
 * The function `resizeLines` takes a string of text and a character limit as input, and returns an
 * array of strings where each string represents a line of text with a maximum character limit.
 * @param {string} text - The `text` parameter is a string that represents the text that needs to be
 * resized into lines.
 * @param {number} caractersLimit - The `caractersLimit` parameter specifies the maximum number of
 * characters allowed in each line of the text.
 * @returns The function `resizeLines` returns an array of strings, which represents the lines of text
 * after resizing.
 */
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

/**
 * The `justifyParagraph` function takes in a paragraph as an array of strings and a character limit,
 * and returns a new array of strings where each line is justified to the specified character limit.
 * @param {string[]} paragraph - The `paragraph` parameter is an array of strings representing the
 * lines of the paragraph that you want to justify.
 * @param {number} caractersLimit - The `caractersLimit` parameter specifies the maximum number of
 * characters allowed in each line of the paragraph.
 * @returns The function `justifyParagraph` returns an array of strings.
 */
function justifyParagraph(paragraph: string[], caractersLimit: number): string[] {
  return paragraph.map((line, index) => {
    if (line.length < caractersLimit && index !== paragraph.length - 1) {
      return justifyLine(line, caractersLimit) + "\n";
    }
    return line + "\n";
  })
}

/**
 * The `justifyLine` function takes a line of text and a character limit, and returns the line with
 * additional spaces added between words to justify it to the given limit.
 * @param {string} line - The `line` parameter is a string that represents a line of text that needs to
 * be justified.
 * @param {number} caractersLimit - The `caractersLimit` parameter represents the maximum number of
 * characters allowed in a line of text.
 * @returns The function `justifyLine` returns a string that represents the justified line.
 */
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
