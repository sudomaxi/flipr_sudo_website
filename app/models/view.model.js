const mongoose = require("mongoose");

const View = mongoose.model("View", new mongoose.Schema({
  duration: Number,
  lastWatched: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  podcast: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Podcast'
  }
}));

module.exports = View;
