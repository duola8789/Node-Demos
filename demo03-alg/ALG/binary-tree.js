/**
 * Created by zh on 2019/9/30.
 *
 * DFS（深度优先搜索）：Depth-First-Search
 * BFS（广度优先搜索）：Breadth-First-Search
 *
 * dlr（前序遍历）：根-左-右
 * ldr（中序遍历）：左-根-右
 * lrd（后序遍历）：左-右-根
 */

/*
 *        100
 *        / \
 *       5   2
 *      / \   \
 *     4   3   1
 *    / \   \
 *   6  7    8
 *     / \
 *   200 300
 */
const nodes = {
  node: 100,
  left: {
    node: 5,
    left: {
      node: 4,
      left: {
        node: 6
      },
      right: {
        node: 7,
        left: {
          node: 200
        },
        right: {
          node: 300
        }
      }
    },
    right: {
      node: 3,
      right: {
        node: 8
      }
    }
  },
  right: {
    node: 2,
    right: {
      node: 1
    }
  }
};

/* --------- 深度优先搜索/前序遍历----------- */
/**
 * 深度优先搜索 - 前序遍历 - 递归算法
 * 1. 如果二叉树为空，则遍历结束，否则
 * 2. 访问根节点
 * 3. 前序遍历根节点的左子树
 * 4. 前序遍历根节点的右子树
 */
function dfs_dlr_1(nodes, result = []) {
  if (nodes.node) {
    result.push(nodes.node);
    nodes.left && dfs_dlr_1(nodes.left, result);
    nodes.right && dfs_dlr_1(nodes.right, result);
  }
  return result;
}

console.log('深度优先搜索 - 前序遍历 - 递归算法', dfs_dlr_1(nodes));

/**
 * 深度优先搜索 - 前序遍历 - 非递归算法
 * 需要借助一个栈（后入先出），通过不断的压入和取出来实现，关键点是①使用栈而非队列②先push右子树再push左子树
 * 1. 初始化一个栈，将根节点压入栈中
 * 2. 档栈非空时，循环执行步骤3、4，否则结束
 * 3. 取出栈顶节点，节点值放入结果数组
 * 4. 如果该节点的右子树非空，则将右子树压入栈，如果该节点的左子树非空，则将左子树压入栈
 */
function dfs_dlr_2(nodes) {
  let result = [];
  let stack = [];
  stack.push(nodes);
  while (stack.length > 0) {
    const target = stack.pop();
    result.push(target.node);
    target.right && stack.push(target.right);
    target.left && stack.push(target.left);
  }
  return result;
}

console.log('深度优先搜索 - 前序遍历 - 非递归算法', dfs_dlr_2(nodes));

/* --------- 深度优先搜索/中序遍历----------- */

/**
 * 深度优先搜索 - 中序遍历 - 递归算法
 * 1. 如果二叉树为空，则遍历结束，否则
 * 2. 中序遍历访问根节点的左子树
 * 3. 访问根节点
 * 4. 中序遍历访问根节点的右子树
 */
function dfs_ldr_1(nodes, result = []) {
  if (nodes.node) {
    nodes.left && dfs_ldr_1(nodes.left, result);
    result.push(nodes.node);
    nodes.right && dfs_ldr_1(nodes.right, result);
  }
  return result;
}

console.log('深度优先搜索 - 中序遍历 - 递归算法', dfs_ldr_1(nodes));

/**
 * 深度优先搜索 - 中序遍历 - 递归算法
 * 1. 借助一个栈，当栈为空时结束遍历
 * 2. 进入遍历，判断当前节点的左子树是否存在，如果存在则将当前节点压入栈中，然后将当前节点替换为其左子树
 * 3. 当前节点不再存在左子树时，意味着找到了整棵树最左下角的节点，出栈一项，记录当前节点的值
 * 4. 将当前节点替换为出栈项的右子树，重复2
 */
function dfs_ldr_2(nodes) {
  let result = [],
    stack = [],
    root = nodes;

  while (true) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    if (stack.length === 0) {
      break;
    }
    const current = stack.pop();
    result.push(current.node);
    root = current.right;
  }
  return result;
}

console.log('深度优先搜索 - 中序遍历 - 递归算法', dfs_ldr_2(nodes));

/* --------- 深度优先搜索/后序遍历----------- */
/**
 * 深度优先搜索 - 后序遍历 - 递归算法
 * 1. 如果二叉树为空，则遍历结束，否则
 * 2. 访问根节点
 * 3. 前序遍历根节点的左子树
 * 4. 前序遍历根节点的右子树
 */
function dfs_lrd_1(nodes, result = []) {
  if (nodes.node) {
    nodes.left && dfs_lrd_1(nodes.left, result);
    nodes.right && dfs_lrd_1(nodes.right, result);
    result.push(nodes.node);
  }
  return result;
}

console.log('深度优先搜索 - 后序遍历 - 递归算法', dfs_lrd_1(nodes));

/**
 * 深度优先搜索 - 后序遍历 - 非递归算法
 * 可以调整前序遍历的算法，前序遍历计算的是『根-左-右』
 * 可以调整压入栈的顺序，将前序遍历中的先压入右子树调整为限压入左子树，调整后的顺序是『根-右-左』
 * 后续遍历的顺序是『左-右-根』 = 『根-右-左』.reverse();
 */
function dfs_lrd_2(nodes) {
  let result = [],
    stack = [nodes];

  while (stack.length > 0) {
    const current = stack.pop();
    result.push(current.node);
    current.left && stack.push(current.left);
    current.right && stack.push(current.right);
  }
  return result.reverse();
}

console.log('深度优先搜索 - 后序遍历 - 非递归算法', dfs_lrd_2(nodes));

/* --------- 广度优先搜索 ---------- */
/**
 * 广度优先搜索，没有尝试递归算法
 * 1. 通过一个队列实现（先入先出），将后续的左节点、右节点分别加入队列
 * 2. 一层一层向下进行
 */
function bfs_1(nodes) {
  let result = [];
  let queue = [nodes];
  while (queue.length > 0) {
    const current = queue.shift();
    result.push(current.node);
    current.left && queue.push(current.left);
    current.right && queue.push(current.right);
  }
  return result;
}

console.log('广度优先搜索', bfs_1(nodes));

/**
 * 找到二叉树的最大深度
 * 通过广度优先搜索实现，队列中构造了一个标志level，用来标识当前深度
 */
function getDepth(nodes) {
  let currentDepth = 0;
  let queue = [{value: nodes, depth: 1}];
  while (queue.length > 0) {
    const current = queue.shift();
    const currentNode = current.value;

    currentDepth = Math.max(currentDepth, current.depth);

    currentNode.left && queue.push({value: currentNode.left, depth: currentDepth + 1});
    currentNode.right && queue.push({value: currentNode.right, depth: currentDepth + 1});
  }
  return currentDepth;
}

console.log('二叉树最大深度', getDepth(nodes));
