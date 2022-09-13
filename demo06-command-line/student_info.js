/**
 * Created by zh on 2019/9/15.
 */
const fs = require('fs');
const path = require('path');
const sortBy = require('./sort');

class Parser {
  constructor(filePath) {
    this.filePath = path.resolve(__dirname, filePath);
    this.textData = '';
    this.ages = [];
    this.schools = {};
    this.jsonData = {};
  }

  readFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  extractData() {
    this.textData.split('\n').forEach((item) => {
      const [name, age, school] = item.split(';');
      this.ages.push(Number(age));
      if (!this.schools[school]) {
        this.schools[school] = 0;
      }
      this.schools[school] += 1;
    });

    const asc_age_list = sortBy(this.ages);
    const desc_age_list = sortBy(this.ages, false);
    const total_count = Object.keys(this.schools);
    const jsonData = {
      school_info: {
        total_count: total_count,
        detail: this.schools
      },
      asc_age_list,
      desc_age_list
    };
    this.jsonData = JSON.stringify(jsonData, null, 4);
  }

  generateFile() {
    return new Promise((resolve, reject) => {
      const folderPath = path.resolve(__dirname, './output');
      const filePath = path.resolve(__dirname, folderPath, 'result.json');

      fs.mkdir(folderPath, (err) => {
        fs.writeFile(filePath, this.jsonData, (err) => {
          if (err) {
            reject(err);
          }
          resolve('文件生成成功');
        });
      });
    });
  }

  parseFile() {
    this.readFile()
      .then((textData) => {
        this.textData = textData;
        this.extractData();
        return this.generateFile();
      })
      .then((msg) => {
        console.log(msg);
      })
      .catch((v) => {
        console.log(v);
      });
  }
}

const parser = new Parser('./conf/student_info.txt');
parser.parseFile();
