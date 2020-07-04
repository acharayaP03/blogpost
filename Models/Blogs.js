const mongoose = require('mongoose');

const BlogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        default: 'general',
        enum: ['general', 'news', 'media', 'funny']
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    tags: {
        type: String,
        default: 'none'
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,  // this will let connect to the user model
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Blogs', BlogsSchema);

