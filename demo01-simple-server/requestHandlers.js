/**
 * Created by zh on 2019/4/21.
 */
const querystring = require('querystring');
const formidable = require('formidable');
const fs = require('fs');

function start(res, req) {
  console.log("Request handler 'start' was called.");

  const body =
    '<html lang="zh-cn">' +
    '<head>' +
    '<title>Hello Form</title>' +
    '<meta http-equiv="Content-Type" content="text/html; ' +
    'charset=UTF-8" />' +
    '</head>' +
    '<body>' +
    '<form action="/upload" method="post" enctype="multipart/form-data">' +
    '<input type="file" name="upload" />' +
    '<input type="submit" value="Upload File" />' +
    '</form>' +
    '</body>' +
    '</html>';

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(body);
  res.end();
}

function upload(res, req) {
  console.log("Request handler 'upload' was called.");
  let form = new formidable.IncomingForm();
  console.log('about to parse');
  form.parse(req, (error, fields, files) => {
    console.log('parsing done');
    fs.renameSync(files.upload.path, './temp/test.jpg');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('received image: <br/>');
    res.write('<img src="/show"  />');
    res.end();
  });
}

function show(res, req) {
  console.log("Request handler 'show' was called.");
  fs.readFile('./temp/test.jpg', 'binary', (error, file) => {
    if (error) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.write(error + '\n');
      res.end();
    } else {
      res.writeHead(200, {'Content-Type': 'image/jpg'});
      res.write(file, 'binary');
      res.end();
    }
  });
}

module.exports = {
  start,
  upload,
  show
};
