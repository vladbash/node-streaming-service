const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const swagger = require('koa2-swagger-ui');
const db = require('./db');

db.connect();

const routes = require('./routes');

const app = new Koa();
app.use(bodyParser());
app.use(swagger({
    routePrefix: '/swagger',
    swaggerOptions: {
        url: 'http://localhost:3000/swagger.json',
    },
}));
app.use(routes.routes());

module.exports = app;