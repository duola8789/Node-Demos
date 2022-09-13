/**
 * Created by zh on 2019/8/8.
 */
// 贪婪算法求解背包问题近似解
const knapsackProblem = () => {
  const bagSize = 4;
  const items = [
    {name: 'sound', size: 4, value: 3000},
    {name: 'laptop', size: 3, value: 2000},
    {name: 'guitar', size: 1, value: 1500},
    {name: 'iphone', size: 1, value: 2000}
  ];

  let value = 0;
  let names = [];
  let remainSize = bagSize;

  // 从价值最大的开始装，能装多少算多少
  items
    .sort((a, b) => b.value - a.value)
    .forEach((v) => {
      if (v.size <= remainSize) {
        value += v.value;
        names.push(v.name);
        remainSize = remainSize - v.size;
      }
    });

  return {
    value,
    names
  };
};

// 贪婪算法求解旅行问题近似解
const travelProblem = () => {
  const allDays = 2;
  const spots = [
    {name: '长城', days: 0.5, value: 7},
    {name: '颐和园', days: 0.5, value: 6},
    {name: '故宫', days: 1, value: 9},
    {name: '八达岭长城', days: 2, value: 9},
    {name: '鸟巢', days: 0.5, value: 8}
  ];

  let value = 0;
  let names = [];
  let remainDays = allDays;

  // 从价值最大的开始装，能装多少算多少
  spots
    .sort((a, b) => b.value - a.value)
    .forEach((v) => {
      if (v.days <= remainDays) {
        value += v.value;
        names.push(v.name);
        remainDays = remainDays - v.days;
      }
    });

  return {
    value,
    names
  };
};

module.exports = {
  knapsackProblem,
  travelProblem
};
