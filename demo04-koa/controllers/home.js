/**
 * Created by zh on 2019/10/25.
 */
const home = {
  async index(ctx) {
    ctx.body = {
      message: 'Hello Koa'
    };
    ctx.response.status = 200;
  }
};

module.exports = {
  home
};
