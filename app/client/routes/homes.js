/*
  Homes routes
*/
Router.route(
  "/homes",
  function() {
    this.render("homes");
  },
  {
    name: "homes"
  }
);

Router.route(
  "/home/:homeId",
  function() {
    this.render("homeAuthContainer");
  },
  {
    name: "home"
  }
);

Router.route(
  "/home/:homeId/report",
  function() {
    this.render("homeReport");
  },
  {
    name: "homeReport"
  }
);
