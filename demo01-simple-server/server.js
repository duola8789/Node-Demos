/**
 * Created By zh on 2019-04-19
 */
const http = require('http');

module.exports = {
  start(route, handle) {
    const onRequest = (req, res) => {
      const pathname = req.url;
      if (~pathname.indexOf('/favicon')) {
        return;
      }

      console.log('\nRequest for ' + pathname + ' received.', '---------------------' + new Date().toLocaleString());

      route(handle, pathname, res, req);
    };

    http.createServer(onRequest).listen(8081, 'localhost');

    console.log('Listening 8081...');
  }
};
