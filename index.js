require('default-debug')('circle:*', 'midibin-api');

var debug = require("debug")('midibin-api');
var circle = require("circle");
var submit = require("./lib/submit");
var io = require("./lib/io");

var api = circle({
  '/submit/:id': submitResource,
  '/read/:id': read
});

function submitResource (reply, match, post) {
  debug('Submitting an entry (%d).', post.entry.length);

  submit(post.entry, function (error, result) {
    if (error) return reply(error);

    reply(undefined, {
      id: result.id,
      saved: true
    });
  });
}

function read (reply, match) {
  io.get(match.params.id, function (error, entry) {
    if (error) return reply(error);
    reply(undefined, entry);
  });
}

api.start(8007);
