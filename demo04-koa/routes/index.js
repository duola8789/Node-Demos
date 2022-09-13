/**
 * Created by zh on 2019/10/25.
 */
const KoaRouter = require('koa-router');
const homeRouter = require('./home');
const apiRouter = require('./api');

const router = new KoaRouter();

router.use('/', homeRouter.routes());
router.use('/api', apiRouter.routes());

module.exports = router;
