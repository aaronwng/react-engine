var express = require("express");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack/webpack.base.js");

var app = express();
var compiler = webpack(webpackConfig);

app.use('',webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  },
  hot: true
}));

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)


// serve pure static assets
app.use('/static', express.static('./static'))

app.listen(3000, function () {
  console.log("Listening on port 3000!");
});