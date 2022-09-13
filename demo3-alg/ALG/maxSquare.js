/**
 * Created by zh on 2019/6/19.
 */
// 找到一个矩形可以均匀的划分的最大的小方块的尺寸
const getMaxSquare = (length, width) => {
  if (width > length) {
    [width, length] = [length, width];
  }
  if (length % width === 0) {
    return width;
  }
  if (length === width) {
    return length;
  }
  return getMaxSquare(width, length - width);
};

module.exports = getMaxSquare;
