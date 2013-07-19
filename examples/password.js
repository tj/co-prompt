
var co = require('co');
var prompt = require('..');
var password = prompt.password;

co(function *(){
  var user = yield prompt('username: ');
  var pass = yield password('password: ');
  //var pass = yield password('password: ', '-');
  console.log('user: %s', user);
  console.log('pass: %s', pass);
  process.stdin.pause();
});