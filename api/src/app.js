const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const swagger = require('koa2-swagger-ui');

const db = require('./db');
const io = require('./io');

db.connect();

const routes = require('./routes');

const app = new Koa();
app.use(bodyParser());
app.use(swagger({
    routePrefix: '/swagger',
    swaggerOptions: {
        url: 'http://192.168.9.101:3000/swagger.json',
    },
}));
io.attach(app);
app.use(routes.routes());

module.exports = app;