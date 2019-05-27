import SlimSelect from "slim-select";
import "slim-select/dist/slimselect.min.css";

Template.managersSelectWidget.onRendered(function() {
  const placeholder = TAPi18n.__("managersSelectWidget-placeholder");
  // Render multi-select widget --managersSelectWidget
  new SlimSelect({
    select: "[name=users]",
    closeOnSelect: false,
    placeholder
  });
});
