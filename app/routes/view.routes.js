const tokenMiddleware = require("../middlewares/token.middleware");
const controller = require("../controllers/view.controller");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/view", controller.markView);
  app.get("/api/views/user/:id", controller.getPodcastsViewedByUser);
};
