const mongoose = require("mongoose");

const Podcast = mongoose.model(
  "Podcast",
  new mongoose.Schema({
    podcast: String,
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
    thumbnail: String,
    tags: [String],
    additionalTags: [String],
    views: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'View'
    }],
    duration: Number,
  })
);

module.exports = Podcast;
