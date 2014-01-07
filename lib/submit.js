var io = require("./io");

module.exports = submit;

function submit (content, callback) {
  if (!content) return callback(new Error('Entry needed'));

  var id = generateId();

  var doc = {
    id: id,
    content: content,
    ts: Date.now()
  };

  io.set(doc, function (error) {
    if (error) return callback(error);
    callback(undefined, doc);
  });
}

function generateId () {
  return Math.floor(Math.random()*9999999999).toString(36);
}
