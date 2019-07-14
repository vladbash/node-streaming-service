const { Song } = require('../models');
const Router = require('koa-router');

const playlist = new Router();

playlist.get('/playlist', async ctx => {
    console.log(ctx);
    ctx.body = 123;
});


module.exports = playlist;