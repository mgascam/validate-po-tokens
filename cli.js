#!/usr/bin/env node
const prettyjson = require('prettyjson');
const { getEntriesFromFile } = require('./lib/entries');
const { searchTokenInMessages, validateTokens } = require('./lib/tokens');
const { createJSONReport } = require('./lib/report');
const { TOKEN_REG_EXP } = require('./constants');

// Grab args
const [,, ...args] = process.argv;
const file = args[0];

getEntriesFromFile(file).then((data) => {
  TOKEN_REG_EXP.forEach(regexp => {
    const findTokens = searchTokenInMessages(regexp.exp, data);
    const errors = validateTokens(findTokens);
    if (errors.length > 0) {
      const reportData = createJSONReport(file, regexp.name, errors)
      console.log(prettyjson.render(reportData));
      console.log('\n');
    }
  });
});