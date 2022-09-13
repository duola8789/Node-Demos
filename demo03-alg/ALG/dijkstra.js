/**
 * Created by zh on 2019/7/28.
 */

// 找到开销最小的，并且没有遍历过的节点
const findLowestCostNode = (costs, processed) => {
  // 筛选出没有遍历过的节点
  const unProcessed = Object.keys(costs).filter((key) => !processed[key]);
  // 如果存在没有遍历过的节点
  if (unProcessed && unProcessed.length > 0) {
    // 找出开销最小的节点
    return unProcessed.sort((a, b) => costs[a] - costs[b])[0];
  }
  // 不存在没有遍历过的节点时
  return null;
};

// 生成加权图中的最短路径
const getFullPath = (parents) => {
  let key = 'end';
  let path = [];
  while (key !== 'start') {
    path.unshift(key);
    key = parents[key];
  }
  path.unshift('start');
  return path.join('→');
};

// 迪科特斯拉算法
const dijkstra = (graph, costs, parents) => {
  // 记录所有遍历过的节点
  let processed = {};
  // 找到开销最小的，并且没有遍历过的节点
  let node = findLowestCostNode(costs, processed);
  // while 循环在所有节点都遍历过后结束
  while (node) {
    // 找到当前节点的所有相邻节点
    let neighbors = graph[node];
    // 找到到达当前节点的开销
    let cost = costs[node];
    // 对所有相邻节点进行遍历
    for (const neighborNode in neighbors) {
      // for...in 的安全性检查
      if (neighbors.hasOwnProperty(neighborNode)) {
        // 找出新的到达相邻节点的开销
        const newCost = cost + neighbors[neighborNode];
        // 如果计算出的新的开销小于已记录的开销，则进行更新
        if (newCost < costs[neighborNode]) {
          // 更新开销
          costs[neighborNode] = newCost;
          // 更新父节点
          parents[neighborNode] = node;
        }
      }
    }
    // 将当前节点标记为已经处理过
    processed[node] = true;
    // 找出接下来要处理的节点，并循环，直到所有节点都被处理过
    node = findLowestCostNode(costs, processed);
  }
  // 返回最终的开销和路径
  return {
    cost: costs['end'],
    path: getFullPath(parents)
  };
};

module.exports = dijkstra;
