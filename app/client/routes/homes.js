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
    this.render("homeAuthContainer", {
      data() {
        return {
          authorizedTemplate: "home"
        };
      }
    });
  },
  {
    name: "home"
  }
);

Router.route(
  "/home/:homeId/report",
  function() {
    this.render("homeAuthContainer", {
      data() {
        return {
          authorizedTemplate: "homeReport"
        };
      }
    });
  },
  {
    name: "homeReport"
  }
);
