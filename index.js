
/**
 * Module dependencies.
 */

var keypress = require('keypress');

/**
 * Expose `prompt`.
 */

exports = module.exports = prompt;

/**
 * Prompt for user input.
 */

function prompt(msg){
  return function(done){
    process.stdout.write(msg);
    process.stdin.setEncoding('utf8');
    process.stdin.once('data', function(val){
      done(null, val.trim());
    }).resume();
  }
}

/**
 * Prompt for multi-line user input.
 */

exports.multiline = function(msg){
  return function(done){
    var buf = [];
    console.log(msg);
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function(val){
      if ('\n' == val || '\r\n' == val) {
        process.stdin.removeAllListeners('data');
        done(null, buf.join('\n'));
      } else {
        buf.push(val.trimRight());
      }
    }).resume();
  }
};

/**
 * Prompt for confirmation.
 */

exports.confirm = function(msg){
  return function(done){
    prompt(msg)(function(err, val){
      if (err) return done(err);
      done(null, bool(val));
    });
  }
};

/**
 * Prompt for password with optional mask.
 */

exports.password = function(msg, mask){
  mask = null == mask ? '*' : mask;
  return function(done){
    var buf = '';

    keypress(process.stdin);
    process.stdin.setRawMode(true);
    process.stdout.write(msg);

    process.stdin.on('keypress', function(c, key){
      if (key && 'return' == key.name) {
        console.log();
        process.stdin.pause();
        process.stdin.removeAllListeners('keypress');
        process.stdin.setRawMode(false);
        if (!buf.trim().length) return exports.password(msg, mask)(done);
        done(null, buf);
        return;
      }

      if (key && key.ctrl && 'c' == key.name) {
        console.log('%s', buf);
        process.exit();
      }

      process.stdout.write(mask);
      buf += c;
    }).resume();
  }
};

/**
 * Parse a boolean `str`.
 *
 * @param {String} str
 * @return {Boolean}
 * @api private
 */

function bool(str) {
  return /^y|yes|ok|true$/i.test(str);
}