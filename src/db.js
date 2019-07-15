const mongoose = require('mongoose');

const connect = () => mongoose.connect('mongodb://root:test@mongo:27017', { dbName: 'radio', useNewUrlParser: true });

module.exports = {
    connect
};