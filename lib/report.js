const createJSONReport = (file, pattern, errors) => {
  return {
    pattern,
    file,
    errors
  };
};

module.exports = { createJSONReport };