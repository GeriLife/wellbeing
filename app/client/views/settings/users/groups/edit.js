import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.min.css';

Template.editUserGroups.onRendered(function () {
    const placeholder = "Select one or more groups";

    // Render multi-select widget on 'select residents' field
    new SlimSelect({
        select: '[name=editUserGroups]',
        closeOnSelect: false,
        placeholder,
      });
})
