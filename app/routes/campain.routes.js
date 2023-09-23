const controller = require("../controllers/campain.controller")
const { authJwt } = require("../middlewares");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/api/campain/:id?", controller.getCampainById);
    app.post("api/campain", [authJwt.verifyToken], controller.createCampain);
    app.get("api/campain/:spaceId", controller.getCampainsBySpaceId);
    app.get("api/campain/search/:q?", controller.searchCampain);
    app.get("api/task", controller.getTaskArray);
  };