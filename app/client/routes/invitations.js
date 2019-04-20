Router.route(
  "/invitation/:invitationId",
  function() {
    this.render("invitation");
  },
  {
    name: "Invitation"
  }
);
