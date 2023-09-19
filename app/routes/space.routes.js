const controller = require("../controllers/space.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/api/space/:id?", controller.getSpaceById);
    app.post("api/space", [authJwt.verifyToken], controller.createSpace);
    app.get("api/space/", controller.getAllSpace);
    app.get("api/space/:page?&:limit?", controller.getSpaceLimit);
    app.get("api/space/search/:q?", controller.searchSpace);
  };