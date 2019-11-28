#!/usr/bin/env node
const process = require('process');
const argv = require('minimist')(process.argv.slice(2));
const prettyjson = require('prettyjson');
const { getEntriesFromFile } = require('./lib/entries');
const { searchTokenInMessages, validateTokens } = require('./lib/tokens');
const { createJSONReport } = require('./lib/report');
const { TOKEN_REG_EXP } = require('./constants');

const file = argv._[0];
const format = argv.format;

getEntriesFromFile(file).then((data) => {
  TOKEN_REG_EXP.forEach(regexp => {
    const findTokens = searchTokenInMessages(regexp.exp, data);
    const errors = validateTokens(findTokens);
    if (errors.length > 0) {
      const reportData = createJSONReport(file, regexp.name, errors)
      if (format === 'pretty') {
        console.error(prettyjson.render(reportData));
      } else {
        console.error(JSON.stringify(reportData));
      }
      console.log('\n');
      process.exit(1);
    }
  });
});