const app = require('./src/app');

app.use(require('koa-static')('.'));

app.listen(3000);
