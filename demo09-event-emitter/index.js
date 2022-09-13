/**
 * Created by zh on 2022/2/17.
 */
const events = require('events');
const emitter = new events.EventEmitter();

const fn = () => {
  console.log('foo called...');
};

emitter.on('foo', fn);

setTimeout(() => {
  console.log('remove...');
  emitter.removeListener('foo', fn);
}, 1000);

setTimeout(() => {
  console.log('add again ...');
  emitter.on('foo', fn);
}, 2000);

setTimeout(() => {
  console.log('emit...');
  emitter.emit('foo');
}, 3000);
