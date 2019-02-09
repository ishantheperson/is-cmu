const fs = require("fs");

module.exports = {
  ParseKeywords: ParseKeywords
};

function ParseKeywords(input: string): boolean
{
  let inputArray: string[] = input.split(' ').map((word) => word.toLowerCase());
  const keywords = fs.readFileSync("text-parser/isCmuKeywords.txt").toString();
  const splitted: string[] = keywords.split('\r\n').map((word) => word.toLowerCase());
  const splittedAgain: string[][] = splitted.map((word) => word.split(' '));

  for (let i = 0; i < inputArray.length; i++)
  {
    for (let phrase of splittedAgain)
    {
      let failed : boolean = false;
      for (let wordCount = 0; wordCount < phrase.length; wordCount++)
      {
        if(i + wordCount >= inputArray.length || phrase[wordCount] !== inputArray[i + wordCount])
        {
          failed = true;
          break;
        }
      }
      if(!failed)
      {
        return true;
      }
    }
  }
  return false;
}
