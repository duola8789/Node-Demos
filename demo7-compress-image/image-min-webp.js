/**
 * Created by zh on 2020/6/17.
 */
const imageMin = require('imagemin');
const imageMinWebp = require('imagemin-webp');

const fs = require('fs-extra');
const path = require('path');

fs.emptyDir(path.join(__dirname, 'dist')).then(() => {
  console.log('压缩中......');
  imageMin(['source/*.{jpg,png}'], {
    destination: 'dist',
    plugins: [imageMinWebp({quality: 75})]
  }).then(() => {
    console.log('Images optimized');
  });
});
