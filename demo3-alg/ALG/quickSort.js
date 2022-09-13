/**
 * Created by zh on 2019/6/18.
 */
const quickSort = (arr) => {
  if (arr.length < 1) {
    return arr;
  }
  const middleIndex = Math.floor(arr.length / 2);
  const middle = arr.splice(middleIndex, 1)[0];
  const left = [],
    right = [];
  for (let i = 0; i < arr.length; i++) {
    (middle > arr[i] ? left : right).push(arr[i]);
  }
  return quickSort(left).concat(middle, quickSort(right));
};

module.exports = quickSort;
