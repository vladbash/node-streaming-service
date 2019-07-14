const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const routes = require('./routes');

const app = new Koa();
app.use(bodyParser());
app.use(routes.routes());

module.exports = app;