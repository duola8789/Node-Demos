/**
 * Created by zh on 2019/9/15.
 */
const Option = require('./option');
const option = new Option();

option
  .verifyArgv()
  .then((filePath) => {
    console.log(filePath);
  })
  .catch((e) => {
    console.log(e);
  });
