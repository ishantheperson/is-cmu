const fs = require("fs");
module.exports = {
    ParseKeywords
};
function ParseKeywords(input) {
    const inputArray = input.split(' ').map((word) => word.toLowerCase());
    const keywords = fs.readFileSync("text-parser/isCmuKeywords.txt").toString();
    const splitted = keywords.split(/\r\n|\r|\n/).map((word) => word.toLowerCase());
    const splittedAgain = splitted.map((word) => word.split(' '));
    for (let i = 0; i < inputArray.length; i++) {
        for (const phrase of splittedAgain) {
            let failed = false;
            for (let wordCount = 0; wordCount < phrase.length; wordCount++) {
                if (i + wordCount >= inputArray.length || phrase[wordCount] !== inputArray[i + wordCount]) {
                    failed = true;
                    break;
                }
            }
            if (!failed) {
                return phrase;
            }
        }
    }
    return false;
}
console.log(ParseKeywords("jacobo"));
console.log(ParseKeywords("potato"));
//# sourceMappingURL=text-parser.js.map