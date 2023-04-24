const middleware = require('../middlewares/auth.middleware');
const tokenMiddleware = require('../middlewares/token.middleware');
const controller = require("../controllers/auth.controller");

module.exports = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/auth/signup",
    [
      middleware.checkDuplicateUsernameOrEmail,
      middleware.checkRolesExisted
    ],
    controller.signup
  );
  app.post("/api/auth/refreshtoken", controller.refreshToken);
  app.post("/api/auth/signin", controller.signin);
  app.put("/api/auth/changePassword/:id", [
    tokenMiddleware.verifyToken
  ], controller.changePassword);
};