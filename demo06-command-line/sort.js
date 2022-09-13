/**
 * Created by zh on 2019/9/15.
 */
const _quickSort = (arr, isAsc = true) => {
  if (arr.length < 1) {
    return arr;
  }
  const middleIndex = Math.floor(arr.length / 2);
  const middle = arr.splice(middleIndex, 1)[0];
  const left = [],
    right = [];
  for (let i = 0; i < arr.length; i++) {
    if (isAsc) {
      (middle > arr[i] ? left : right).push(arr[i]);
    } else {
      (middle > arr[i] ? right : left).push(arr[i]);
    }
  }
  return _quickSort(left, isAsc).concat(middle, _quickSort(right, isAsc));
};

const sortBy = (arr, isAsc = true) => {
  return _quickSort([...arr], isAsc);
};

module.exports = sortBy;
