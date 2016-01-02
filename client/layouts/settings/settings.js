Template.settingsLayout.rendered = function () {
  // Add skin-blue sidebar-mini classes to body
  var body = $("body");

  body.addClass(function () {
    var bodyClasses = "skin-blue-light sidebar-mini";

    return bodyClasses;
  });
};
