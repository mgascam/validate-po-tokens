const { getEntriesFromFile } = require('./lib/entries');
const { searchTokenInMessages, validateTokens } = require('./lib/tokens');

const file = './lib/sample/locale/pt/LC_MESSAGES/django.po';
const regExps = [/<\[.*?\]>/gm, /\{[^{}]+\}/gm, /\$\{.*?\}/gm, /{{[^{]+}}/gm, /\%\(.*?\)/gm, /\[.*?\]/gm];

getEntriesFromFile(file).then((data) => {
  regExps.forEach(regexp => {
    console.log(` REGEXP ${regexp}`);
    const findTokens = searchTokenInMessages(regexp, data);
    console.log(validateTokens(findTokens));
  });
});