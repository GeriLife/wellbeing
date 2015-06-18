AdminConfig = {
  name: "Juhani Wellbeing",
  adminEmails: ['test@test.com'],
  collections:
  {
    Residents: {
      icon: "users",
      color: "green",
      tableColumns: [
        {label: "First name", name: "firstName"}
      ]
    },
    Homes: {
      icon: "home",
      color: "blue",
      tableColumns: [
        {label: "Name", name: "name"}
      ]
    }
  }
}
