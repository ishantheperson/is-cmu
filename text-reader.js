'use strict';

const request = require('request');

// Replace <Subscription Key> with your valid subscription key.
const subscriptionKey = '79df29925ed14d3786b8f272b72324c8';

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase =
    'https://eastus.api.cognitive.microsoft.com/vision/v2.0/ocr?language=en&detectOrientation=true';

const imageUrl =
    'https://i.stack.imgur.com/t35y7.png';

// Request parameters.
const params = {
    'visualFeatures': 'Categories,Description,Color',
    'details': '',
    'language': 'en'
};

const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};
request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }

  var obj = JSON.parse(body);
  //console.log(typeof(obj));
  //console.log(obj);
  console.log(obj.regions);
  let blah = obj.regions;

  console.log(blah.boundingBox);

  /*let braceCount = 0;
  let isWord = false;
  let output = "";
  let word = "";
  let i;

  for (i = 0; i < body.length; i++) {
      console.log(word);
      if (braceCount < 4) {
          if (body[i] === "{") {
              braceCount++;
          }
          continue;
      } else {
          if (i <= 8) {   // index safety check
              continue;
          }
          let index = i;
          let subS = body.substr(index - 7, index);
          console.log(subS.length);
          if (body.substr(i - 7, i) === "\"text\":\"") {
              isWord = true;
              console.log("text");
              continue;
          }
          if (isWord) {
              if (body[i] === "\"") {
                  isWord = false;
                  output = output + word;
              }
              word = word + body [i];

          }

      }
  }

  console.log(output);


  let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');

  //console.log(typeof jsonResponse);
  
  //console.log('JSON Response\n');
  //console.log(jsonResponse);
  let ind = 18;
  let a = "a\"text\":\"";
  console.log(a.substr(8-7, 8));
  a = "1234567890a\"text\":\"";
  console.log(a.substr(ind-7, ind));*/


});
