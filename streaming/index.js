var Libshout = require('libshout-js');
var fs = require('fs');
var axios = require('axios');
const Writable = require('stream').Writable;

var ls = new Libshout('/usr/lib/x86_64-linux-gnu/libshout.so.3');
ls.setHost('icecast');
ls.setPort(8000);
ls.setUser('icecast');
ls.setPassword('icecast');

ls.setMount('/radio');

ls.setFormat(Libshout.CONST.FORMATS.SHOUT_FORMAT_MP3);
ls.setAudioInfo({
    bitrate: '192',
    samplerate: '44100',
    channels: '2',
});

try {
    ls.open();
    playSong();
} catch (err) {
    console.warn(err);
    process.exit(1);
}

function playSong() {
    axios.default.get('http://api:3000/api/track/play').then(response => {
        console.log(response.data);
        const writeStream = new Writable({
            write(data, encoding, cb) {
                ls.send(data, data.length)
                const delay = ls.getDelay()
                setTimeout(() => {
                    cb();
                }, delay)
            },
        });
        const fileStream = new fs.createReadStream('./tracks/' + response.data.file);
        fileStream.pipe(writeStream);

        writeStream.on('finish', () => {
            playSong();
        });
    });
}

process.on('uncaughtException', e => {
    console.log('uncaughtException: ', e);
    process.exit(1);
});

process.on('unhandledRejection', () => {
    console.log('uncaughtException: ', e);
    process.exit(1);
});