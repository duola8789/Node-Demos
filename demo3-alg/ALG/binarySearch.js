/**
 * Created by zh on 2019/6/18.
 */
// 二分法查找
// 时间复杂度O(logN)
const binarySearch = (list, target) => {
  let min = 0;
  let max = list.length - 1;
  while (min <= max) {
    const middle = Math.floor((min + max) / 2);
    if (list[middle] > target) {
      max = middle - 1;
    } else if (list[middle] < target) {
      min = middle + 1;
    } else {
      return middle;
    }
  }
  return -1;
};

// 利用递归实现二分查找
const binarySearchRecursion = (list, target, min = 0, max = list.length - 1) => {
  if (min > max) {
    return -1;
  }
  const middle = Math.floor((min + max) / 2);
  if (list[middle] > target) {
    return binarySearchRecursion(list, target, min, middle - 1);
  } else if (list[middle] < target) {
    return binarySearchRecursion(list, target, middle + 1, max);
  } else {
    return middle;
  }
};

module.exports = {
  binarySearch,
  binarySearchRecursion
};
