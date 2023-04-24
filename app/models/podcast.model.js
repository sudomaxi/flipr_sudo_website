const mongoose = require("mongoose");

const Podcast = mongoose.model(
  "Podcast",
  new mongoose.Schema({
    path: String,
    type: String,
    title: String,
    description: String,
    artist: String,
    uploaded: Date,
    popularity: Number,
    watchTime: Number,
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    tags: [String],
    views: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'View'
    }],
    duration: Number,
  })
);

module.exports = Podcast;
