const mongoose = require('mongoose');

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Podcast"
      }
    ],
    views: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "View"
      }
    ]
  })
);

module.exports = User;