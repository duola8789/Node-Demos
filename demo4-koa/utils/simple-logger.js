/**
 * Created By zh on 2019-04-30
 */
function log(ctx) {
  console.log(ctx.method, ctx.header.host + ctx.url);
}

module.exports = function () {
  return async function f(ctx, next) {
    // 执行中间件的操作
    log(ctx);

    if (next) {
      await next();
    }
  };
};
