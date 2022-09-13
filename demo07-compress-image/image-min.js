/**
 * Created by zh on 2020/6/17.
 */
const imageMin = require('imagemin');
const imageMinJpg = require('imagemin-jpegtran');
const imageMinPng = require('imagemin-pngquant');

const fs = require('fs-extra');
const path = require('path');

fs.emptyDir(path.join(__dirname, 'dist')).then(() => {
  console.log('压缩中......');
  imageMin(['source/*.{jpg,png}'], {
    destination: 'dist',
    plugins: [
      imageMinJpg(),
      imageMinPng({
        quality: [0.5, 0.8]
      })
    ]
  }).then(() => {
    console.log('压缩完成');
  });
});
