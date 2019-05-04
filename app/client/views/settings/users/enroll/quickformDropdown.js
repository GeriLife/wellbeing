import SlimSelect from "slim-select";
import "slim-select/dist/slimselect.min.css";

Template.quickForm_dropdown.onRendered(function() {
  console.log("rendered");

  const placeholder = TAPi18n.__("userGroupsSelectWidget-placeholder");

  // Render multi-select widget on 'select residents' field
  new SlimSelect({
    select: "[name=groups]",
    closeOnSelect: false,
    placeholder
  });
});
