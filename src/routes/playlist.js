const {
    Track
} = require('../models');
const Router = require('koa-router');
const {
    drop
} = require('ramda');

const playlist = new Router();

playlist.get('/playlist', async ctx => {
    const playlist = await Track.find({
        isPlaying: false
    }).sort({
        likes: -1
    }).select('-isPlaying -fileUrl');
    ctx.response.body = playlist;
});

playlist.post('/track', async ctx => {
    const {
        name,
        author,
        cover
    } = ctx.request.body;
    const track = await new Track({
        name,
        author,
        cover
    }).save();
    ctx.response.body = track;
});

playlist.post('/track/like', async ctx => {
    const {
        id
    } = ctx.request.body;
    const track = await Track.findById(id);
    if (track) {
        track.likes++;
        await track.save();
        ctx.response.body = {
            status: 200
        };
    } else {
        ctx.response.status = 404;
        ctx.response.body = {
            error: "No such track"
        };
    }
});

playlist.post('/track/comment', async ctx => {
    const {
        id,
        comment
    } = ctx.request.body;
    const track = await Track.findById(id);
    if (track) {
        track.comments = {
            comment,
            addedAt: new Date()
        };
        await track.save();
        ctx.response.body = {
            status: 200
        };
    } else {
        ctx.response.status = 404;
        ctx.response.body = {
            error: "No such track"
        };
    }
});

module.exports = playlist;