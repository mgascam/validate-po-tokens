const searchTokenInMessages = (regExp, messages) => {
  const tokensFound = [];
  messages.forEach((msg) => {
    const match = msg.match(regExp);
    if (match) {
      tokensFound.push({
        msg: msg.split('\n'),
        match
      });
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

const isTranslated = (payload)  => {
  const msgStr = payload.msg[1];
  return msgStr.indexOf('msgstr ""') === -1;
}

const validateTokens = (matches) => {
  const result = [];
  matches.forEach((match) => {
    const countedTokens = countTokens(match.match);
    if (isTranslated(match) && !allTokensAreEven(countedTokens)) {
      result.push({
        error: 'Tokens do not match',
        tokens: match.match,
        context: match.msg,
      })
    }
  });
  return result;
}

module.exports = { searchTokenInMessages, validateTokens }