AdminConfig = {
  name: "Juhani Wellbeing",
  adminEmails: ['test@test.com'],
  skin: "blue-light",
  collections:
  {
    ActivityTypes: {
      icon: "heart-o",
      label: "Activity Types",
      color: "green",
      tableColumns: [
        {label: "Name", name: "name"}
      ]
    },
    Groups: {
      icon: "cubes",
      label: "Groups",
      color: "purple",
      tableColumns: [
        {label: "Name", name: "name"}
      ]
    },
    'Meteor.roles': {
      label: 'Roles',
      color: 'blue',
      icon: 'user-md',
      tableColumns: [
        {label: 'Name', name: 'name'}
      ]
    }
  }
}
