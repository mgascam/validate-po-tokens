const { getEntriesFromFile } = require('./entries');

describe('getEntriesFromFile', () => {
  test('shouldExist', () => {
    expect(getEntriesFromFile).toBeInstanceOf(Function);
  });

  test('throws if no file provided', () => {
    return getEntriesFromFile().catch(e => expect(e).toMatch('No file provided!'));
  });

  test('file not found', () => {
    return getEntriesFromFile('nonexist.js').catch(e => {
      expect.assertions(1);
      expect(e.code).toMatch('ENOENT')
    });
  });

  test('returns an array of matches', async () => {
    const entries = await getEntriesFromFile('./lib/sample/sample.po');
    expect(entries).not.toBeUndefined();
  });

});