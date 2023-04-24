const lemmatizer = require('wink-lemmatizer');
const { removeStopwords } = require('stopwords');

exports.parseTags = (query) => {
  return removeStopwords(String(query).split(' '));
}