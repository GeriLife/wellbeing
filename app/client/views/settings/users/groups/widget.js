import SlimSelect from "slim-select";
import "slim-select/dist/slimselect.min.css";

Template.userGroupsSelectWidget.onRendered(function() {
  console.log("rendered");

  const placeholder = TAPi18n.__("userGroupsSelectWidget-placeholder");

  // Render multi-select widget on 'select residents' field
  new SlimSelect({
    select: "[name=editUserGroups]",
    closeOnSelect: false,
    placeholder
  });
});
