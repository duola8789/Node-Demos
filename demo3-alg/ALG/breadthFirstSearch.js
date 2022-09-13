/**
 * Created by zh on 2019/7/9.
 */
// 广度优先搜索 BFS
module.exports = function (root, target) {
  let queue = [...root.children];
  let temp = {};

  for (let i = 0; i < queue.length; i++) {
    const current = queue[i];
    if (!temp[current]) {
      temp[current] = true;
      if (current === target) {
        return target;
      } else {
        queue.push(...current.children);
      }
    }
  }
  return false;
};
