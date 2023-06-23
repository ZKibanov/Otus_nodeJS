const fs = require('fs');
const { countWords, filterText, getObjValuesSortedByKeys } = require('./index_util');
const readline = require('readline');

const [, , path] = process.argv;
(async () => {
  if (path) {
    const readStream = fs.createReadStream(__dirname + '/' + path, { encoding: 'utf8' });
    const writeStream = fs.createWriteStream(__dirname + '/' + path + '_index')
    
    const rl = readline.createInterface({
      input: readStream
    });

    const resultObj = {};
    for await (const chunk of rl) {
      countWords(filterText(chunk), resultObj)
    }

    const sortedValues = getObjValuesSortedByKeys(resultObj)

    writeStream.write(JSON.stringify(sortedValues));
    writeStream.end();
  }
})()