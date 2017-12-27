Template.settingsLayout.rendered = function () {
  // Get reference to page body
  var body = $("body");

  // Make sure page fills viewport by triggering resize event
  body.trigger("resize");

  // Add skin-blue sidebar-mini classes to body
  body.addClass(function () {
    var bodyClasses = "skin-blue-light sidebar-mini";

    return bodyClasses;
  });
};
