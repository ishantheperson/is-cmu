const fs = require("fs");
module.exports = {
    ParseKeywords
};
function ParseKeywords(input) {
    const inputArray = input.split(' ').map((word) => word.toLowerCase());
    const keywords = fs.readFileSync("text-parser/isCmuKeywords.txt").toString();
    const splitted = keywords.split(/\r\n|\r|\n/).map((word) => word.toLowerCase());
    const splittedAgain = splitted.map((word) => word.split(' '));
    let len = inputArray.length;
    if (inputArray[len-1].substring(inputArray[len-1].length-1) == ".")
        {
            inputArray[len-1] = inputArray[len-1].substring(0, inputArray[len-1].length-1);
        }
    let notCount = 0;
    for (let i = 0; i < len; i++)
    {
        if (inputArray[i] == "not")
        {
            notCount++;
        }
        for (const phrase of splittedAgain)
        {
            let failed = false;
            for (let wordCount = 0; wordCount < phrase.length; wordCount++)
            {
                if (i + wordCount >= len || phrase[wordCount] !== inputArray[i + wordCount])
                {
                    failed = true;
                    break;
                }
            }
            if (!failed && notCount % 2 == 0)
            {
                return phrase;
            }
        }
    }
    return false;
}

//# sourceMappingURL=text-parser.js.map