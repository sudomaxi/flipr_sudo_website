const db = require("../models/index");
const View = require("../models/view.model");
const User = require("../models/user.model");
const Podcast = require("../models/podcast.model");
const { parseTags } = require("../services/recommendation.services");

exports.getPodcastsViewedByUser = async (req, res) => {
  await View.find({
    user: req.params.id
  }).populate('podcast').then(podcasts => {
    return res.status(200).send({
      podcasts: podcasts
    });
  });
};

exports.markView = async (req, res) => {
  await View.findOne({
    user: req.body.user,
    podcast: req.body.podcast,
  }).then(async (result) => {
    console.log(result);
    if (!result) {
      await View.create({
        lastWatched: req.body.lastWatched,
        podcast: req.body.podcast,
        user: req.body.user,
      }).then(async (view) => {
        if (!view) {
          return res.status(500).send({
            result: "Error creating view",
          });
        }
        await Podcast.updateOne(
          {
            _id: Object(req.body.podcast),
          },
          {
            $push: { views: view },
          }
        ).then((rsp) => {
          if (!rsp) {
            return res.status(500).send({
              result: "Error adding view in podcast",
            });
          }
          return res.status(200).send({
            view: view
          });
        });
      });
    } else {
      await View.updateOne(
        { _id: result._id },
        { lastWatched: req.body.lastWatched }
      ).then(async (view) => {
        Podcast.updateOne(
          {
            _id: result.podcast,
            views: { $ne: result._id },
          },
          {
            $addToSet: { views: result._id },
          }
        ).exec((err, resp) => {
          if (err) {
            return res.status(500).send({
              result: "Something went wrong",
            });
          }
          return res.status(200).send({
            view: result,
          });
        });
      });
    }
  });
};

exports.addTagAndUserInterest = async (req, res) => {
  await User.updateOne(
    { _id: Object(req.body.user) },
    {$addToSet: {interests: {$each: parseTags(req.body.query)}}}
  ).then(async user => {
    await Podcast.updateOne(
      { _id: Object(req.body.podcast) },
      { $addToSet: { additionalTags: { $each: parseTags(req.body.query) } } }
    ).then(result => {
      return res.status(200).send({
        result: "Added user interest and podcast tag"
      });
    });
  });
}