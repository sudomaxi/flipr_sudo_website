const db = require("../models");
const Podcast = require("../models/podcast.model");
const User = require("../models/user.model");

exports.addPodcast = async (req, res) => {
  console.log(req.body);
  const podcast = new Podcast({
    title: req.body.title,
    description: req.body.description,
    artist: req.body.artist,
    popularity: 0.75,
    watchTime: 0,
    likes: [],
    views: [],
    tags: ["all", ...String(req.body.tags).split(",")],
    uploaded: Date.now(),
    duration: parseInt(req.body.duration),
    podcast: req.body.podcast,
    thumbnail: req.body.thumbnail,
  });
  await podcast.save().then((podcast, err) => {
    if (err) {
      return res.status(500).send({
        result: err,
      });
    }
    return res.status(200).send({
      id: podcast.id,
      path: podcast.path,
      podcast: podcast.toJSON(),
    });
  });
};

exports.getPodcast = async (req, res) => {
  await Podcast.findById(req.params.id).populate({
    
  }).then();
}

exports.toggleLike = async (req, res) => {
  await Podcast.findById(req.body.podcast).then(async (podcast) => {
    if (!podcast) {
      return res.status(400).send({
        result: "Podcast not found",
      });
    }
    if (!podcast.likes.includes(req.body.user)) {
      await Podcast.updateOne(
        { _id: Object(req.body.podcast) },
        { $push: { likes: Object(req.body.user) } }
      ).then((result) => {
        return res.status(200).send({
          result: "success",
        });
      });
    } else {
      await Podcast.updateOne(
        { _id: Object(req.body.podcast) },
        { $pull: { likes: Object(req.body.user) } }
      ).then((result) => {
        return res.status(200).send({
          result: "success",
        });
      });
    }
  });
};

exports.getLikedPodcastsOfUser = async (req, res) => {
  await Podcast.find({
    likes: {
      $in: [req.params.id]
    }
  }).then(podcasts => {
    return res.status(200).send({
      result: podcasts
    });
  });
}

exports.searchByNameOrTag = async (req, res) => {
  await Podcast.find({
    title: {
      $regex: `.*${req.body.title}.*`,
    },
    tags: {
      $in: [...String(req.body.tags).split(",")],
    },
  })
    .populate({
      path: "views",
      match: {
        user: req.body.user,
      },
    })
    .then((podacasts) => {
      return res.status(200).send({
        podcasts: podacasts,
      });
    });
};

exports.getPodcasts = async (req, res) => {
  await db.podcast
    .find({})
    .then((result, err) => {
      if (err) {
        return res.status(500).send({ result: "Something went wrong" });
      }
      console.log(result);
      res.status(200).send({ podcasts: result });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: err.message, result: err.name });
    });
};

exports.getPodcastsByPopularity = async (req, res) => {
  await db.podcast
    .find({})
    .sort({ popularity: -1 })
    .exec((err, result) => {
      if (err) {
        return res.status(500).send({ result: "Something went wrong" });
      }
      console.log(result);
      res.status(200).send({ podcasts: result });
    });
};

exports.deletePodcast = async (req, res) => {
  id = req.params.id;
  await db.podcast
    .findByIdAndDelete({ _id: Object(id) })
    .then(async (result) => {
      if (!result) {
        return res.status(404).send({ result: "No valid Podcast found" });
      }
      return res.status(200).send({
        result: "Podast removed successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({ result: err.name, message: err.message });
    });
};
