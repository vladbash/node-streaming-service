const mongoose = require('mongoose');
const {
    SchemaTypes,
    Schema
} = mongoose;

const Track = mongoose.model('Track', new Schema({
    name: SchemaTypes.String,
    author: SchemaTypes.String,
    likes: {
        type: SchemaTypes.Number,
        default: 0
    },
    file: SchemaTypes.String,
    cover: SchemaTypes.String,
    loadedBy: SchemaTypes.String,
    isPlaying: {
        type: SchemaTypes.Boolean,
        default: false
    },
    comments: {
        type: SchemaTypes.Array,
        default: []
    }
}, {
    timestamps: true
}));

module.exports = Track;