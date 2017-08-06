Template.reportFiltersDateYear.helpers({
  years () {
    // Get oldest activity date from parent data context
    const oldestActivityDate = Template.currentData().oldestActivityDate;

    // Make sure oldest activity date was povided
    if (oldestActivityDate) {
      // Placeholder for list of years
      const years = [];

      // Get year of oldest activity
      const oldestActivityYear = oldestActivityDate.getFullYear();

      const currentYear = new Date().getFullYear();

      // construct an array of years
      // from current year down to year of oldest activity (reverse chronological)
      for (let year = currentYear; year >= oldestActivityYear; year--) {
        // add year to years array
        years.push(year);
      }

      return years;
    }
  }
})
