const searchTokenInMessages = (regExp, messages) => {
  const tokensFound = [];
  messages.forEach((msg) => {
    const found = msg.match(regExp);
    if (found) {
      tokensFound.push(found);
    }
  });
  return tokensFound;
};

const countTokens = (tokens) => {
  const matches = {};
  tokens.forEach(element => {
    matches[element] ? matches[element] += 1 : matches[element] = 1;
  });
  return matches;
};

const allTokensAreEven = (tokens) => {
  return Object.keys(tokens).every((key) => {
    return tokens[key] % 2 === 0;
  });
};

const validateTokens = (collection) => {
  const result = [];
  collection.forEach((tokens) => {
    const countedTokens = countTokens(tokens);
    if (!allTokensAreEven(countedTokens)) {
      result.push({
        error: 'Tokens do not match',
        tokens
      })
    }
  });
  
  return result;
}

module.exports = { searchTokenInMessages, validateTokens }