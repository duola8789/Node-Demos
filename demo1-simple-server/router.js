/**
 * Created by zh on 2019/4/21.
 */
function route(handle, pathname, res, req) {
  console.log('About to route a request for' + pathname);

  const handler = handle[pathname];
  if (typeof handler === 'function') {
    handler(res, req);
  } else {
    console.log('No request handler found for ' + pathname);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Not Found');
    res.end();
  }
}

exports.route = route;
