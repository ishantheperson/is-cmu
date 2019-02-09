const fs = require("fs");
function ParseKeywords(input) {
    const keywords = fs.readFileSync("text-parser/isCmuKeywords.txt").toString();
    const splitted = keywords.split('\r\n');
    console.log(splitted);
    if (splitted.indexOf(input) > -1) {
        return true;
    }
    return false;
}
console.log(ParseKeywords("John Mackey"));
//# sourceMappingURL=text-parser.js.map