/**
 * Created by zh on 2022/6/1.
 */
const fse = require('fs-extra');
const path = require('path');
const simpleParser = require('mailparser').simpleParser;
const tnef = require('node-tnef');
const iconvLite = require('iconv-lite');

const fileName = process.argv[2];
if (!fileName) {
  throw new Error('输入要解析的文件名')
}

function parseEml(filePath) {
  return fse.stat(filePath).then(() => {
    return fse.readFile(filePath).then((file) => {
      const charsetMatch = file.toString().match(/Content-Type:.+charset="(.+)"/i);
      const encoding = Array.isArray(charsetMatch) && charsetMatch[1] ? charsetMatch[1] : 'utf8';
      return simpleParser(file).then((parsedMail) => ({
        parsedMail,
        encoding
      }));
    });
  });
}

function handleDatAttachments(parsedMail, encoding) {
  const datAttach = parsedMail.attachments.find((v) => v.contentType === 'application/ms-tnef' && v.filename && v.filename.endsWith('dat'));
  return new Promise((resolve, reject) => {
    if (datAttach) {
      tnef.parseBuffer(datAttach.content, (err, content) => {
        if (err) {
          resolve('');
        } else if (content.BodyHTML) {
          const buffer = iconvLite.decode(Buffer.from(content.BodyHTML), encoding);
          const res = buffer.toString();
          resolve(res);
        } else {
          reject(new Error('handleDatAttachments error'))
        }
      });
    }
    return resolve('');
  });
}

function writeFile(fileName, data) {
  const filePath = path.join(__dirname, 'output', fileName);
  return fse.writeFile(filePath, data, 'utf8').then(() => {
    console.log('写入完成', filePath);
  });
}

parseEml(path.join(__dirname, 'cases', `${fileName}.eml`))
  .then(({encoding, parsedMail}) => {
    return writeFile('parsed.js', JSON.stringify(parsedMail)).then(() => {
      return handleDatAttachments(parsedMail, encoding).then((html) => {
        if (html) {
          parsedMail.html = encoding !== 'utf-8' ? html.replace(/charset=gb2312/i, / charset=utf-8/) : html;
        }
        return parsedMail;
      });
    });
  })
  .then((parsedMail) => writeFile('parsed.html', parsedMail.html))
