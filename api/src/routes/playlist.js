const {
    Track
} = require('../models');
const Router = require('koa-router');
const io = require('../io');

const playlist = new Router();

playlist.get('/playlist', async ctx => {
    try {
        const playlist = await Track.find({
            isPlaying: false
        }).sort({
            likes: -1
        }).select('-isPlaying -fileUrl');
        ctx.response.body = playlist;
    } catch (e) {
        ctx.response.body = {
            error: 'Error',
            payload: e
        };
    }
});

playlist.get('/track/current', async ctx => {
    const track = await Track.findOne({
        isPlaying: true
    }).select('-fileUrl');
    if (!track) {
        ctx.response.status = 404;
    }
    ctx.response.body = track ? track : {
        message: 'There aren\'t playing tracks for now'
    };
});

playlist.post('/track', async ctx => {
    const {
        name,
        author,
        cover,
        file,
        loadedBy = 'Admin Admin'
    } = ctx.request.body;
    const track = await new Track({
        name,
        author,
        cover,
        file,
        loadedBy
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
        if (track.isPlaying) {
            io.broadcast('trackUpdated', track);
        }
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

playlist.get('/track/play', async ctx => {
    const previousTrack = await Track.findOneAndUpdate({
        isPlaying: true
    }, {
        $set: {
            likes: 0,
            isPlaying: false
        }
    });
    const track = await Track.findOne().sort({
        likes: -1,
        updatedAt: 1
    });
    if (track) {
        track.isPlaying = true;
        await track.save();
    }
    io.broadcast('currentTrackUpdated', track);
    io.broadcast('trackAdded', previousTrack);
    ctx.response.body = track;
});

module.exports = playlist;