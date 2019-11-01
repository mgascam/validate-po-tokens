const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const entriesRegex = /msgid ".*"\nmsgstr ".*"/gm;

const matchEntries = (buffer) => {
  return buffer.match(entriesRegex)
}

const getEntriesFromFile = (file) => {
  if (!file) return Promise.reject('No file provided!');
  return readFile(path.join(process.cwd(), file), 'utf8')
    .then((data) => {
      return Promise.resolve(matchEntries(data));
    });
}

module.exports = { getEntriesFromFile }