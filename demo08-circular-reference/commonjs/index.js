/**
 * Created by zh on 2021/11/25.
 */
console.log('main start');

const a = require('./a.js');
const b = require('./b.js');

console.log('in main, a.done = %j, b.done = %j', a.done, b.done);
