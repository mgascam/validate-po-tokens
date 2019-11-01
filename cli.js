#!/usr/bin/env node

const { getEntriesFromFile } = require('./lib/entries');
const { searchTokenInMessages, validateTokens } = require('./lib/tokens');

// const file = './lib/sample/locale/es/LC_MESSAGES/django.po';
const regExps = [/<\[.*?\]>/gm, /\{[^{}]+\}/gm, /\$\{.*?\}/gm, /{{[^{]+}}/gm, /\%\(.*?\)/gm, /\[.*?\]/gm];

// Grab args
const [,, ...args] = process.argv;
const file = args[0];

getEntriesFromFile(file).then((data) => {
  regExps.forEach(regexp => {
    console.log(` REGEXP ${regexp}`);
    const findTokens = searchTokenInMessages(regexp, data);
    console.dir(validateTokens(findTokens));
  });
});