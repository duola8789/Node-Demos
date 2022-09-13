/**
 * Created by zh on 2021/11/25.
 */
import {foo} from './a.mjs';

console.log('b.mjs');
console.log(foo);

export const bar = 'bar';