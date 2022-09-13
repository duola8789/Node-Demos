/**
 * @file: restful api 子路由
 * Created by zh on 2019/10/25.
 */
const KoaRouter = require('koa-router');
const {apiController} = require('../controllers/index');

const router = new KoaRouter();

router.get('/', apiController.index);
router.get('/user', apiController.user.index);
router.get('/user/info', apiController.user.userInfo);

module.exports = router;
