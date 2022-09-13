/**
 * Created by zh on 2019/10/25.
 */
const KoaRouter = require('koa-router');
const {homeController} = require('../controllers/index');

const router = new KoaRouter();

router.get('/', homeController.home.index);

module.exports = router;
