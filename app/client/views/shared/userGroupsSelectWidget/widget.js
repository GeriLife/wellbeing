import SlimSelect from "slim-select";
import "slim-select/dist/slimselect.min.css";

Template.userGroupsSelectWidget.onRendered(function() {
  const name = this.data.name || "editUserGroups";
  const placeholder = TAPi18n.__("userGroupsSelectWidget-placeholder");
  // Render multi-select widget on 'select residents' field
  new SlimSelect({
    select: "[name=" + name + "]",
    closeOnSelect: false,
    placeholder
  });
});
