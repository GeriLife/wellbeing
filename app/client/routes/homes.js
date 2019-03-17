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
    this.render("home");
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

Router.onBeforeAction(currentUserCanAccessHome, {
  only: ["home", "homeReport"]
});

function currentUserCanAccessHome() {
  if (Meteor.user()) {
    const currentUserId = Meteor.user()._id;

    const userGroups = ["test"];

    const homeGroup = "test";

    const userIsInSameGroup = userGroups.includes(homeGroup);

    const userIsAdmin = Roles.userIsInRole(currentUserId, ["admin"]);

    if (userIsInSameGroup || userIsAdmin) {
      this.next();
    }
  }
  this.render("NotAuthorized");
}
