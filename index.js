const { getEntriesFromFile } = require('./lib/entries');
const { searchTokenInMessages, validateTokens } = require('./lib/tokens');
const { createJSONReport } = require('./lib/report');
const { TOKEN_REG_EXP } = require('./constants');

module.exports = {
  getEntriesFromFile,
  searchTokenInMessages,
  validateTokens,
  createJSONReport,
  TOKEN_REG_EXP
}