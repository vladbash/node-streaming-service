const Router = require('koa-router');

const playlist = require('./playlist');

const appRouter = new Router({
    prefix: '/api'
});

appRouter.use(playlist.routes());

module.exports = appRouter;