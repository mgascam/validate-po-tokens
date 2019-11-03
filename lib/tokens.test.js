const {
  searchTokenInMessages,
  validateTokens
} = require('./tokens');

describe('searchTokenInMessages', () => {
  test('it should exist', () => {
    expect(searchTokenInMessages).toBeInstanceOf(Function);
  });

  test('it should return an empty array if not matches found', () => {
    const regexp = /<\[.*?\]>/gm;
    const sample = ['msgid "Unknown system error"\nmsgstr "Error desconegut del sistema"',
      'msgid "Another error"\nmsgstr "Unaltre error"'
    ];

    expect(searchTokenInMessages(regexp, sample)).toStrictEqual([]);
  });

  test('it should return an array of matches found', () => {
    const regexp = /<\[.*?\]>/gm;
    const sample = ['msgid "Unknown system error<[ hola ]>"\nmsgstr "Error desconegut del sistema <[ hola ]>"',
      'msgid "Another error <[ otro ]>"\nmsgstr "Unaltre error <[ otro ]>"'
    ];
    const expected = [
      {
        msg: [
          'msgid "Unknown system error<[ hola ]>\"',
          'msgstr "Error desconegut del sistema <[ hola ]>\"',
        ],
        match: [ '<[ hola ]>', '<[ hola ]>' ]
      },
      {
        msg: [
          'msgid "Another error <[ otro ]>\"',
          'msgstr "Unaltre error <[ otro ]>\"'
        ],
        match: [ '<[ otro ]>', '<[ otro ]>' ]
      }
    ];
    expect(searchTokenInMessages(regexp, sample)).toStrictEqual(expected);
  });
});

describe('validateTokens', () => {
  test('it should exist', () => {
    expect(validateTokens).toBeInstanceOf(Function);
  });

  test('it does not return validation errors', () => {
    const sample = [
      {
        msg: [
          'msgid "Unknown system error<[ hola ]>\"',
          'msgstr "Error desconegut del sistema <[ hola ]>\"',
        ],
        match: [ '<[ hola ]>', '<[ hola ]>' ]
      },
      {
        msg: [
          'msgid "Unknown system error<[ hola ]>\"',
          'msgstr "Error desconegut del sistema <[ hola ]>\"',
        ],
        match: [ '<[ otro ]>', '<[ otro ]>' ]
      }
    ];
    const expected = [];

    expect(validateTokens(sample)).toStrictEqual(expected);
  });

  test('it does not return validation errors', () => {
    const sample = [
      {
        msg: [
          'msgid "Unknown system error<[ hola ]>\"',
          'msgstr "Error desconegut del sistema <[ hola ]>\"',
        ],
        match: [ '<[- currency ]>','<[- amount ]>', '<[- currency ]>','<[- amount ]>' ]
      }
    ];
    const expected = [];

    expect(validateTokens(sample)).toStrictEqual(expected);
  });



  test('it does return validation errors', () => {
    const sample = [
      {
        msg: [
          'msgid "Unknown system error<[ currency ]><[ amount ]>\"',
          'msgstr "Error desconegut del sistema <[ moneda ]><[ cantidad ]>\"',
        ],
        match: [ '<[- currency ]>','<[- amount ]>', '<[- moneda ]>', '<[- cantidad ]>' ]
      }
    ];

    const expected = [
      {
        error: 'Tokens do not match',
        context: [
          'msgid "Unknown system error<[ currency ]><[ amount ]>\"',
          'msgstr "Error desconegut del sistema <[ moneda ]><[ cantidad ]>\"',
        ],
        tokens: ['<[- currency ]>', '<[- amount ]>', '<[- moneda ]>', '<[- cantidad ]>']
      }
    ];

    expect(validateTokens(sample)).toEqual(expected);
  });

  test('it does not return validation errors if string is not translated', () => {
    const sample = [
      {
        msg: [
          'msgid "Unknown system error<[ currency ]><[ amount ]>\"',
          'msgstr ""',
        ],
        match: [ '<[- currency ]>','<[- amount ]>' ]
      }
    ];

    const expected = [];

    expect(validateTokens(sample)).toEqual(expected);
  });
});