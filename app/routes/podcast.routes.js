const middleware = require("../middlewares/token.middleware");
const podcastMiddleware = require("../middlewares/podcast.middleware");
const controller = require("../controllers/podcast.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/podcast", [
    middleware.verifyToken,
    podcastMiddleware.uploadFile
  ], controller.addPodcast
  );
  app.get("/api/podcasts", [
    middleware.verifyToken
  ], controller.getPodcastsByPopularity);
  app.get("/api/podcasts/search", controller.searchByName);
  app.delete("/api/podcast/:id", [
    middleware.verifyToken
  ], controller.deletePodcast);
};
