/**
 * Created by zh on 2019/9/15.
 */
const USAGE = `
Usage of main.js:
    --input: specify file path
    
Examples: 
    1. print usage:
       node main.js --help
    2. specify input file: conf/student_info.txt
       node main.js --input="conf/student_info.txt"
`;

class Option {
  constructor() {
    this.usageHint = USAGE;
  }

  showUsage() {
    console.log(this.usageHint);
  }

  verifyArgv() {
    const inputObj = this.getArgv();

    if (!inputObj) {
      this.showUsage();
      return Promise.reject('缺少参数');
    }

    if (inputObj.input) {
      return Promise.resolve(inputObj.input);
    }

    if (inputObj.help) {
      this.showUsage();
      return Promise.reject('帮助信息');
    }

    this.showUsage();
    return Promise.reject('缺少参数');
  }

  getArgv() {
    // Node获取命令行参数：https://www.jianshu.com/p/6c44798ae8d9
    const argvArr = process.argv.slice(2);
    if (argvArr.length < 0) {
      return null;
    }

    // 非捕获组：https://www.jianshu.com/p/2547f0e3e809
    // 非贪婪模式：https://www.jianshu.com/p/974dee8953e6
    const reg = /--([^=]*)(?:=(.+))?/;

    return argvArr.reduce((total, current) => {
      const matchRes = current.match(reg);
      if (matchRes) {
        total[matchRes[1]] = matchRes[2] || true;
      }
      return total;
    }, {});
  }
}

module.exports = Option;
