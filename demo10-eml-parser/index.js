/**
 * Created by zh on 2022/6/1.
 */
const fse = require('fs-extra');
const path = require('path');
const simpleParser = require('mailparser').simpleParser;
const tnef = require('node-tnef');
const iconvLite = require('iconv-lite');

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
  console.log(parsedMail, 123123);
  const datAttach = parsedMail.attachments.find((v) => v.contentType === 'application/ms-tnef' && v.filename && v.filename.endsWith('dat'));
  return new Promise((resolve) => {
    if (datAttach) {
      tnef.parseBuffer(datAttach.content, (err, content) => {
        if (err) {
          resolve('');
        } else {
          const buffer = iconvLite.decode(Buffer.from(content.BodyHTML), encoding);
          const res = buffer.toString();
          resolve(res);
        }
      });
    }
    return resolve('');
  });
}

function writeFile(fileName, data) {
  const filePath = path.join(__dirname, 'cases', fileName);
  return fse.writeFile(filePath, data, 'utf8').then(() => {
    console.log('写入完成', fileName);
  });
}

console.time('parse time');
parseEml(path.join(__dirname, 'cases', 'test4.eml'))
  .then(({encoding, parsedMail}) => {
    console.timeEnd('parse time');
    return writeFile('parsed.js', JSON.stringify(parsedMail)).then(() => {
      return handleDatAttachments(parsedMail, encoding).then((html) => {
        if (html) {
          parsedMail.html = encoding !== 'utf-8' ? html.replace(/charset=gb2312/i, / charset=utf-8/) : html;
        }
        return parsedMail;
      });
    });
  })
  .then((parsedMail) => writeFile('parsed.html', parsedMail.html));
