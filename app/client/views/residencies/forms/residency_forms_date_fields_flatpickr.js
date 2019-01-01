/*
This file defines a common code path to render Flatpickr on all Residency form date fields.
 */

import {Finnish} from "flatpickr/dist/l10n/fi";
import flatpickr from "flatpickr";

Template.autoForm.onRendered(function () {
    const templateInstance = this;

    const formName = templateInstance.data.id;

    // Make sure a Residency form is being rendered
    if (
        formName === "addNewResidentAndResidency"
        || formName === "addResidencyForExistingResident"
        || formName === "editResidencyForm"
    ) {
        const userLocale = TAPi18n.getLanguage();

        // Locale used for calendar widget; undefined means English (default locale)
        let locale;

        if (userLocale === 'fi') {
            locale = Finnish;
        } else {
            locale = flatpickr.l10ns.default;
        }

        // Render cross-platform date picker on date field(s)
        flatpickr(".dateField", {
            maxDate: "today",
            locale,
        });
    }
});
