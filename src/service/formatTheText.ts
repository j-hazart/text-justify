function formatTheText(text:string):Array<string> {
    const lines: Array<string> = [];
    let line: string = "";
    const words:Array<string> = text.split(" ");

    words.forEach((word: string) => {
        if ((line.length + word.length) <= 80){
            line += (word + " ");
        } else {
            lines.push(line.trim());
            line = word + " ";
        }
    })

    return lines;
}

export default formatTheText;