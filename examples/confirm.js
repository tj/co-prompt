
var co = require('co');
var prompt = require('..');
var confirm = prompt.confirm;

co(function *(){
  var ok = yield confirm('are you sure? ');
  console.log('answer: %s', ok);
  process.stdin.pause();
});