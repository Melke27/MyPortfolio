const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: 'https://via.placeholder.com/400x250/8BC34A/ffffff?text=Blog+Post'
    },
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        default: 'Melkamu Wako'
    },
    views: {
        type: Number,
        default: 0
    },
    commentsCount: {
        type: Number,
        default: 0
    },
    tags: [{
        type: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
        imageUrl: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            required: true
        }
    },
    tags: [{
        type: String
    }],
    views: {
        type: Number,
        default: 0
    },
    commentsCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('BlogPost', blogPostSchema); 