const fs = require("fs");

module.exports = {
  ParseKeywords: ParseKeywords
};

function ParseKeywords(input: string): boolean
{
  const keywords = fs.readFileSync("text-parser/isCmuKeywords.txt").toString();
  const splitted: string[] = keywords.split('\r\n').map((word) => word.toLowerCase());
  

  if (splitted.indexOf(input.toLowerCase().trim()) !== -1)
  {
    return true;
  }
  return false;
}
