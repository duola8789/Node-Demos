/**
 * Created by zh on 2021/11/25.
 */
console.log('b start');
exports.done = false;

const a = require('./a.js');
console.log('in b, a.done = %j', a.done);

exports.done = true;
console.log('b done');
