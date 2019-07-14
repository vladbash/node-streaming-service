const mongoose = require('mongoose');
const {
    SchemaTypes,
    Schema
} = mongoose;

const Song = mongoose.model('Song', new Schema({
    name: SchemaTypes.String,
    author: SchemaTypes.String,
    likes: SchemaTypes.Number,
    fileUrl: SchemaTypes.String,
    albumPic: SchemaTypes.String,
    loadedBy: SchemaTypes.String
}, {
    timestamps: true
}));

module.exports = Song;