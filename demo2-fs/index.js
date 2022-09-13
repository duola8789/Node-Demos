/**
 * Created By zh on 2019-04-29
 */
const fs = require('fs');
const fse = require('fs-extra');

// 读取文件
// fs.readFile('./test.txt', 'utf-8', (error, file) => {
//   console.log('before:', file);
// });

// 同步读取文件
// const file = fs.readFileSync('./test.txt');
//
// console.log(file.toString());
// console.log('finish');

// 附写文件
// fs.appendFile('./test.txt', '你随河流而来, ', 'utf-8', (error) => {
//   fs.readFile('./test.txt', 'utf-8', (error, file) => {
//     console.log('after:', file);
//     fs.open('./test.txt', 'r',  (error, fs) => {
//       console.log(fs);
//     })
//   });
// });

// 监视文件
// fs.watchFile('./test.txt', (curr, prev) => {
//   console.log('current', curr);
//   console.log('previous', prev);
// });

// 判断文件状态
// fs.stat('./test.txt', (err, stat) => {
//   if (stat && stat.isFile()) {
//     console.log(stat);
//   } else {
//     console.log('file does not exist');
//   }
// });

// 创建文件目录
// fs.mkdir('./hello', '0777', err => console.log(err));

// 读取文件目录
// const list = (path) => {
//   fs.readdir(path, (err, files) => {
//     console.log(files);
//     files.forEach(file => {
//       fs.stat(file, (error, stat) => {
//         if(stat && stat.isDirectory()) {
//           list(file)
//         }
//       })
//     })
//   })
// };
//
// list(process.cwd());

// 读取大型文件
// const func = data => {
//   console.log('Line: ' + data);
// };
//
// const readLines = (input, func) => {
//   let remaining = '';
//
//   input.on('data', data => {
//     remaining += data;
//     let index = remaining.indexOf('\n');
//     let last = 0;
//     while(index > -1) {
//       let line = remaining.substring(last, index);
//       last = index + 1;
//       func(line);
//       index = remaining.indexOf('\n', last);
//     }
//
//     remaining = remaining.substring(last);
//   });
//
//   input.on('end', () => {
//     if(remaining.length > 0) {
//       func(remaining)
//     }
//   })
// };
//
// const input = fs.createReadStream('./test.txt');
//
// readLines(input, func);

// 大型文件拷贝
// const fileCopy = (filename1, filename2, done) => {
//   const input = fs.createReadStream(filename1);
//   const output = fs.createWriteStream(filename2);
//
//   input.on('data', data => {
//     output.write(data);
//   });
//
//   input.on('error', err => {
//     console.log(err);
//   });
//
//   input.on('end', () => {
//     output.end();
//     if (done) {
//       done()
//     }
//   })
// };
//
// fileCopy('./test.txt', './hello.text', () => {
//   console.log('copy finish');
// });

// 删除文件
// fs.unlink('./hello.text', (err) => {
//   console.log('deleted');
// });

// 删除文件夹
// fs.rmdir('./world/inside', (err) => {
//   console.log(err, 'deleted');
// });

// 重命名
// fs.rename('./hello', './world', err => {
//   console.log(err);
// });

// fs-extra
// 读取文件
// fse.readFile('./test.txt', 'utf-8').then(res => console.log(res));

// 拷贝文件
// 回调函数
// fse.copy('./test.txt', './world/test.txt', err => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('success!');
// });
//
// // Promise
// fse.copy('./test.txt', './world/test.txt').then(() => {
//   console.log('success');
// }).catch(e => {
//   console.error(e);
// });
//
// // Async/Await
// const copyFile = async () => {
//   try {
//     await fse.copy('./test.txt', './world/test.txt');
//     console.log('success');
//   } catch (e) {
//     console.error(e);
//   }
// };
// copyFile().then(v => console.log(v));

// 确保目录为空
// fse.emptyDir('./hello').then(v => console.log('success'));

// 确保文件存在
// fse.ensureFile('./world/test.txt').then(v => console.log('success'));

// 确保路径存在
// fse.ensureDir('./hello2').then(v => console.log('success'));

// 确保链接存在
// fse.ensureLink('./world/test2.txt', './hello/test2.txt').then(v => console.log('success'));

// 移动文件或者目录
// fse.move('./world/hello2.txt', './hello1232.txt').then(v => console.log('success'));

// 输出/读取JSON文件
// fse.outputJSON('./world/ok.json', {name: 'jay'})
//   .then(v => fse.readJson(('./world/ok.json')))
//   .then(v => console.log(v));

// 检查目录是否存在
// fse.pathExists('./world/ok2.json').then(v => console.log('isExist: ', v));

fse.remove('./hello1232.txt').then((v) => console.log('success'));
