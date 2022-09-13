/**
 * Created By zh on 2019-05-05
 */
// 所有 Koa 的中间件具有以下特性：
// 1 有统一的上下文对象 context
// 2 执行顺序先进后出
// 3 通过 next 来控制先进后出的机制
// 4 有提前结束机制
// 可以使用 Promise 来做一个简单的实现

const http = require('http');

const compose = (middleware) => {
  if (!Array.isArray(middleware)) {
    throw new TypeError('Middleware stack must be an array');
  }
  for (const fn of middleware) {
    if (typeof fn !== 'function') {
      throw new TypeError('Middleware must be composed of functions');
    }
  }
  return function (context, next) {
    let index = -1;
    return dispatch(0);

    function dispatch(i) {
      // 理论上 i 会大于 index，因为每次执行一次都会把 i 递增，
      // 如果相等或者小于，则说明 next() 执行了多次
      if (i <= index) {
        return Promise.reject(new Error('next() called multiple times'));
      }
      index = i;
      // 取到当前的中间件
      let fn = middleware[i];
      if (i === middleware.length) {
        fn = next;
      }
      if (!fn) {
        return Promise.resolve();
      }
      try {
        return Promise.resolve(
          fn(context, function () {
            return dispatch(i + 1);
          })
        );
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
};

class MyKoa {
  constructor() {
    this.middlewares = [];
    this.context = {
      data: []
    };
  }

  use(middleware) {
    this.middlewares.push(middleware);
    return this;
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }

  callback() {
    const fn = compose(this.middlewares);

    return (req, res) => {
      return fn(this.context)
        .then((v) => console.log('end'))
        .catch((e) => console.error('something wrong-- ', e));
    };
  }
}

async function middleware1(ctx, next) {
  console.log('action 001');
  await next();
  console.log('action 006');
}

async function middleware2(ctx, next) {
  console.log('action 002');
  await next();
  console.log('action 005');
}

async function middleware3(ctx, next) {
  console.log('action 003');
  ctx.data.push(3);
  await next();
  console.log('action 004');
  ctx.data.push(4);
}

const app = new MyKoa();

app.use(middleware1);
app.use(middleware2);
app.use(middleware3);

app.listen(8080);
