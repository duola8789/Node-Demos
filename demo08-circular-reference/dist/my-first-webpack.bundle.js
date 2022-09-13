(() => {
  var o = {
      546: (o, n, e) => {
        console.log('a start'), (n.done = !1);
        const s = e(419);
        console.log('in a, b.done = %j', s.done), (n.done = !0), console.log('a done');
      },
      419: (o, n, e) => {
        console.log('b start'), (n.done = !1);
        const s = e(546);
        console.log('in b, a.done = %j', s.done), (n.done = !0), console.log('b done');
      }
    },
    n = {};
  function e(s) {
    var l = n[s];
    if (void 0 !== l) return l.exports;
    var t = (n[s] = {exports: {}});
    return o[s](t, t.exports, e), t.exports;
  }
  (() => {
    console.log('main start');
    const o = e(546),
      n = e(419);
    console.log('in main, a.done = %j, b.done = %j', o.done, n.done);
  })();
})();
