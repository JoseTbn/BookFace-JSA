const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: false },



});

module.exports = mongoose.model('Thing', thingSchema);

// BACKEND FILE FOR MY DATABASES QUERIES
// EXPORTS