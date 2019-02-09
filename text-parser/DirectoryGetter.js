const https = require('https');

module.exports = {
  andrewidLookup: andrewidLookup
};

function andrewidLookup(input)
{
  https.get(`https://apis.scottylabs.org/directory/v1/andrewID/${input}`, (resp) => {
  let data = '';

  
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
  console.log("here");
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data));
  });

  }).on("error", (err) => {
  console.log("Error: " + err.message);
  });
}

andrewidLookup("poop");