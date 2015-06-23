AdminConfig = {
  name: "Juhani Wellbeing",
  adminEmails: ['test@test.com'],
  collections:
  {
    Residents: {
      icon: "users",
      color: "red",
      auxCollections: ['Homes'],
      tableColumns: [
        {label: "First name", name: "firstName"},
        {label: "Home", name: "homeName()"}
      ],
      extraFields: ['homeId']
    },
    Homes: {
      icon: "home",
      color: "yellow",
      tableColumns: [
        {label: "Name", name: "name"}
      ]
    },
    'Meteor.roles': {
      label: 'Roles',
      color: 'green',
      icon: 'briefcase',
      tableColumns: [
        {label: 'Name', name: 'name'}
      ]
    },
    ActivityTypes: {
      icon: "home",
      color: "yellow",
      tableColumns: [
        {label: "Name", name: "name"}
      ]
    }
  }
}
