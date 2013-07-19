
var co = require('co');
var prompt = require('..');
var multiline = prompt.multiline;

co(function *(){
  var first = yield prompt('first name: ');
  var last = yield prompt('last name: ');
  console.log('hello %s %s\n', first, last);

  var desc = yield multiline('description:');
  console.log('you describe yourself as:');
  console.log(desc);

  process.stdin.pause();
});