const controller = require("../controllers/user.controller");
const middleware = require("../middlewares/token.middleware");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/auth/users", [
      middleware.verifyToken
    ], controller.getAllUsers
  );

  app.put(
    "/api/auth/user/:id", [
      middleware.verifyToken
    ], controller.updateUser
  );

  app.delete(
    "/api/auth/user/:id", [
      middleware.verifyToken
    ], controller.deleteUser
  )
};