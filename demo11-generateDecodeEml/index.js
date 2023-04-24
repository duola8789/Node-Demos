/**
 * Created by zh on 2023/4/24.
 */
const iconv = require('iconv-lite');
const fse = require('fs-extra');
const path = require('path');

const DEFAULT_ENCODING = ['GB2312', 'Big5', 'UTF-8', 'ISO-8859-1', 'EUC-JP', 'Shift_JIS'];
const NOT_SUPPORT_ENCODING = [
  {
    encoding: 'ISO-2022-KR',
    content:
      'GyQpQw5saWwjXzJeTGdpVz92UngiTnpkKA8KPGJyPgo8YnI+CjEyMzQ1Njc4OTAKPGJyPgo8YnI+Ck9uZSBUb3cgVGhyZWUgRm91ciBGaXZlIFNpeCBTZXZlbiBFaWdodCBOaW5lIFRlbgo8YnI+Cjxicj4KGyQpQw5saWwjXzJeTGdpIzoPPHNwYW4gc3R5bGU9ImNvbG9yOiByZ2IoMjI0LCA2MiwgNDUpOyIgZGF0YS1tY2Utc3R5bGU9ImNvbG9yOiAjZTAzZTJkOyI+PHN0cm9uZz4gDlc/dlJ4Ik56ZCgPPC9zdHJvbmc+PC9zcGFuPgo='
  }
];

const genEml = async (encoding) => {
  if (!iconv.encodingExists(encoding)) {
    return {
      success: false,
      reason: 'Wrong Encoding'
    };
  }

  const header = `Date: Wed, 19 Apr 2023 08:00:06 +0800
From: =?utf-8?B?572R5piT54G154qA5Yqe5YWs?= <notice@qiye.163.com>
To: taoye <taoye@citicpetroleum.com>, jianght <jianght@citicpetroleum.com>,
 muyina <muyina@citicpetroleum.com>
Subject: ${encoding}
MIME-Version: 1.0
Content-Type: text/html; charset="utf-8"
Content-Transfer-Encoding: base64

`;

  const inputPath = path.join(__dirname, 'input.txt');
  const outputPath = path.join(__dirname, 'output', `${encoding}.eml`);

  const content = await fse.readFile(inputPath);

  const str = iconv.decode(content, 'utf-8');
  const encodedBase64Str = iconv.encode(str, encoding).toString('base64');
  const fullStr = header + encodedBase64Str;

  try {
    await fse.writeFile(outputPath, fullStr);
    return {
      success: true
    };
  } catch (e) {
    return {
      success: false,
      reason: e
    };
  }
};

const commandEncodings = process.argv.slice(2);
const encodings = commandEncodings && commandEncodings.length > 0 ? commandEncodings : DEFAULT_ENCODING;

fse.emptyDir(path.join(__dirname, 'output')).then(() => {
  encodings.forEach(async (encoding) => {
    const {success, reason} = await genEml(encoding);
    if (success) {
      console.log(`${encoding} generate success`);
    } else {
      console.error(`${encoding} generate fail because ${reason}`);
    }
  });

  NOT_SUPPORT_ENCODING.forEach(async ({encoding, content}) => {
    const header = `Date: Wed, 19 Apr 2023 08:00:06 +0800
From: =?utf-8?B?572R5piT54G154qA5Yqe5YWs?= <notice@qiye.163.com>
To: taoye <taoye@citicpetroleum.com>, jianght <jianght@citicpetroleum.com>,
 muyina <muyina@citicpetroleum.com>
Subject: ${encoding}
MIME-Version: 1.0
Content-Type: text/html; charset="utf-8"
Content-Transfer-Encoding: base64

`;
    const fullStr = header + content;
    const outputPath = path.join(__dirname, 'output', `${encoding}.eml`);
    await fse.writeFile(outputPath, fullStr);
    console.log(`Iconv Not Support ${encoding} generate success`);
  });
});
