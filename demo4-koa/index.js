/**
 * Created By zh on 2019-04-30
 */
const Koa = require('koa');
const logger = require('./utils/simple-logger');
const routers = require('./routes/index');
const cors = require('@koa/cors');

// KOA
const app = new Koa();

// 跨域，注意跨域中间件要在路由前面加载
app.use(cors());

// 加载路由
app.use(routers.routes());

// 时间打点
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const time = Date.now() - start + 'ms';
  ctx.set('X-ResponseTime', time);
});

// 控制台输出
app.use(logger());

app.use((ctx) => {
  ctx.body = 'Hello Koa';
});

app.listen(8888, () => {
  console.log('Koa is listening 8888...');
});
