// const https = require("https");
const https = require("https");
const imgur = require("imgur");
const Curl = require("node-libcurl").Curl;
const cheerio = require("cheerio");

module.exports = {
  ReverseSearch
};

const GOOGLE_URL = "https://www.google.com/searchbyimage?site=search&sa=X&image_url="; // + imgur link
// tslint:disable-next-line:max-line-length
const USER_AGENT = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.85 Safari/537.36";

function ReverseSearch(data: string, onComplete: (data: string) => any) {
  UploadImgur(data, (link) => {
    QueryGoogle(link, (html) => {
      const $ = cheerio.load(html);
      const val = $("input[type=text]");

      onComplete(val.attr("value"));
    });
  });
}

function UploadImgur(data: string, onComplete: (link: string) => any) {
  imgur.setClientId("bffd36f5d4f8471"); // hardcoded lmao
  imgur.setAPIUrl("https://api.imgur.com/3/");

  imgur.uploadBase64(data).then((json) => { 
    onComplete(json.data.link);
    // const url = json.data.link;
    // const googleLink = GOOGLE_LINK + url;
  }).catch((err) => { console.error(err); });
}

function QueryGoogle(imageLink: string, callback): void {
  const googleLink = GOOGLE_URL + imageLink;

  const curl = new Curl();
  curl.setOpt("URL", googleLink);
  curl.setOpt("FOLLOWLOCATION", true);
  curl.setOpt("USERAGENT", USER_AGENT);

  curl.on("end", (status, body, headers) => {
    callback(body);
  });
  curl.on("error", curl.close.bind(curl));
  curl.perform();
}