const fs = require("fs");
module.exports = {
    ParseKeywords: ParseKeywords
};
function ParseKeywords(input) {
    let inputArray = input.split(' ').map((word) => word.toLowerCase());
    const keywords = fs.readFileSync("text-parser/isCmuKeywords.txt").toString();
    const splitted = keywords.split('\r\n').map((word) => word.toLowerCase());
    const splittedAgain = splitted.map((word) => word.split(' '));
    /*for (let c of splitted)
    {
      splittedAgain[] = c.split(' ').map((word) => word.toLowerCase());
    }*/
    for (let i = 0; i < inputArray.length; i++) {
        //console.log("input");
        for (let phrase of splittedAgain) {
            let failed = false;
            //console.log("phrase");
            if (phrase.length === 0) {
                //console.log("oof");
            }
            for (let wordCount = 0; wordCount < phrase.length; wordCount++) {
                //console.log(inputArray[i]);
                if (i + wordCount >= inputArray.length || phrase[wordCount] !== inputArray[i + wordCount]) {
                    //console.log("yeet");
                    failed = true;
                    break;
                }
            }
            if (!failed) {
                return true;
            }
        }
    }
    return false;
}
//# sourceMappingURL=text-parser.js.map