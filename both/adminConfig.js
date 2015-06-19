AdminConfig = {
  name: "Juhani Wellbeing",
  adminEmails: ['test@test.com'],
  collections:
  {
    Residents: {
      icon: "users",
      color: "red",
      tableColumns: [
        {label: "First name", name: "firstName"}
      ]
    },
    Homes: {
      icon: "home",
      color: "yellow",
      tableColumns: [
        {label: "Name", name: "name"}
      ]
    }
  }
}
