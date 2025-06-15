const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: String, default: 'Melkamu Wako' },
    description: { type: String },
    imageUrl: { type: String },
    tags: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('BlogPost', blogPostSchema);
