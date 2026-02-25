const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    issuer: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String
    },
    date: {
        type: Date
    },
    url: {
        type: String
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Certification', certificationSchema);
