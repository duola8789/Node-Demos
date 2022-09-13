/**
 * Created by zh on 2021/11/25.
 */
console.log('a start');
exports.done = false;

const b = require('./b.js');
console.log('in a, b.done = %j', b.done);

exports.done = true;
console.log('a done');
