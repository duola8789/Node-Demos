/**
 * Created by zh on 2019/9/15.
 */
const assert = require('assert');
const sortBy = require('../sort');

function test(desc, callback) {
  try {
    callback();
    console.log(`${desc} -- 测试通过\n`);
  } catch (err) {
    console.log(`${desc} -- 测试未通过\n`, err.message, '\n');
  }
}

test('sortBy default', () => {
  const arr = [-5, 2, 45, 1];
  const result = sortBy(arr);
  const target = [-5, 1, 2, 45];
  assert.deepStrictEqual(result, target);
});

test('sortBy ascend', () => {
  const arr = [-5, 2, 45, 1];
  const result = sortBy(arr, true);
  const target = [-5, 1, 2, 45];
  assert.deepStrictEqual(result, target);
});

test('sortBy descend', () => {
  const arr = [-5, 2, 45, 1];
  const result = sortBy(arr, false);
  const target = [45, 2, 1, -5];
  assert.deepStrictEqual(result, target);
});

test("sortBy doesn't change origin", () => {
  const arr = [-5, 2, 45, 1];
  const result = sortBy(arr, false);
  const target = [-5, 2, 45, 1];
  assert.deepStrictEqual(arr, target);
});
