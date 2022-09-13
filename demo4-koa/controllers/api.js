/**
 * Created by zh on 2019/10/25.
 */
// /api
const index = async (ctx) => {
  ctx.body = {
    message: 'Hello API'
  };
  ctx.response.status = 200;
};

// /api/user/
const user = {
  // /api/user/
  async index(ctx) {
    ctx.body = {
      message: 'Hello User'
    };
    ctx.response.status = 200;
  },

  // /api/user/info
  async userInfo(ctx) {
    ctx.body = {
      name: 'Jay',
      age: '32'
    };
    ctx.response.status = 200;
  }
};

module.exports = {
  index,
  user
};
