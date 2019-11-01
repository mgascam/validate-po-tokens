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
    const expected = [["<[ hola ]>", "<[ hola ]>"], ["<[ otro ]>", "<[ otro ]>"]];

    expect(searchTokenInMessages(regexp, sample)).toStrictEqual(expected);
  });
});

describe('validateTokens', () => {
  test('it should exist', () => {
    expect(validateTokens).toBeInstanceOf(Function);
  });

  test('it does not return validation errors', () => {
    const sample = [["<[ hola ]>", "<[ hola ]>"], ["<[ otro ]>", "<[ otro ]>"]];
    const expected = [];

    expect(validateTokens(sample)).toStrictEqual(expected);
  });

  test('it does not return validation errors', () => {
    const sample = [['<[- currency ]>','<[- amount ]>','<[- currency ]>','<[- amount ]>' ]];
    const expected = [];

    expect(validateTokens(sample)).toStrictEqual(expected);
  });

  

  test('it does return validation errors', () => {
    const sample = [[ '<[ valid ]>', '<[ valid ]>' ], ["<[ valid ]>", "<[ valido ]>"]];
    const expected = [{ error: 'Tokens do not match', tokens: ["<[ valid ]>", "<[ valido ]>"]}];
  
    expect(validateTokens(sample)).toStrictEqual(expected);
  })
});