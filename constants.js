module.exports.TOKEN_REG_EXP = [ 
  { name: "<[...]>", exp: /<\[.*?\]>/gm },
  { name: "{...}", exp: /\{[^{}]+\}/gm }, 
  { name: "${...}", exp: /\$\{.*?\}/gm }, 
  { name: "{{...}}", exp: /{{[^{]+}}/gm }, 
  { name: "%(...)", exp: /\%\(.*?\)/gm },
];