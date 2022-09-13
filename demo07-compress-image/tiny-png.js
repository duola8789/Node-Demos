/**
 * Created by zh on 2020/6/17.
 */
const fs = require('fs-extra');
const path = require('path');

// https://tinypng.com/developers/reference/nodejs
const tinify = require('tinify');

tinify.key = 'Q4tJMrzH9NmTJZnwGNrfYK3pFbdxfvXl';

const sourcePath = path.join(__dirname, 'source');
const resultPath = path.join(__dirname, 'dist');

fs.emptyDir(resultPath).then(() => {
  fs.readdir(sourcePath).then((files) => {
    files
      .filter((file) => /^.+\.(png|jpg)$/.test(file))
      .forEach((file) => {
        const fileName = path.join(sourcePath, file);
        const resultName = path.join(resultPath, file);
        const source = tinify.fromFile(fileName);
        source
          .toFile(resultName)
          .then(() => {
            console.log(file, '压缩成功，API本月剩余调用次数： ', 500 - +tinify.compressionCount);
          })
          .catch((e) => console.log(file, '压缩失败', e));
      });
  });
});
