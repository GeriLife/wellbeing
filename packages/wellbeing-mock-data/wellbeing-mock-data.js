//TODO: Change these for actual group names

var groups = ['Onnela', 'Tammela','Puistola'];
var activities = ['Ulkoilu', 'Retki', 'Tapahtuma (esim. konsertti)',
            'Musiikki','Taide', 'Lukeminen'];

var facilitatorRoles = ['Henkiökunta', 'Vapaaehtoinen', 'Perhe', 'Itse'];

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function insert(collection, args, amount, insertFunctionOutcome) {
  //make copy of the object so we can get different faker data every time
  var argsWithValues;
  for (var i = 0; i < amount; i++) {
     argsWithValues = Object.assign({},args);

    for (var key in args) {
      if (insertFunctionOutcome) {
        if (typeof args[key] === 'function') {
          var func = args[key];
          argsWithValues[key] = func();
        }
      }
    }
    collection.insert(argsWithValues, {validate: false});

  }
}
function createMockGroups () {
  console.log('Creating mock groups');

  for (var i = 0; i < groups.length; i++) {
    var groupName = groups[i];
    console.log(groupName);
    Groups.insert({'name': groupName});
  }
}

function createMockRoles() {
  console.log('Creating mock roles');

  for (var i = 0; i < facilitatorRoles.length; i++) {
    var roleName = facilitatorRoles[i];
    console.log(roleName);
    Roles.createRole(roleName);
  }
}

function createMockHomes() {
  console.log('Creating mock homes');
  var amount = 3;
  var address = function() {return faker.address.city();};

  for (var i = 0; i < groups.length; i++) {
    var groupName = groups[i];
    console.log(groupName);
    var Group = Groups.findOne({'name': groupName});
    var args = {'name': address,'groupId': Group._id};
    insert(Homes, args, amount, true);
  }

}

function createMockResidents() {
  console.log('Creating mock residents');
  var amount = 6;
  var homes = Homes.find().fetch();
  var firstName = function() {return faker.name.firstName();};
  var lastInitial =  function() {return faker.name.lastName().charAt(0);};
  for (var i = 0; i < homes.length; i++) {
    var args = {'firstName': firstName, 'lastInitial': lastInitial, 'homeId': homes[i]._id};
    insert(Residents, args, amount,true);
  }

}
function createMockActivityTypes() {
  console.log('Creating mock activiity types');
  for (var i = 0; i < activities.length; i++) {
    ActivityTypes.insert({'name': activities[i]});
  }
}

function createMockActivities() {
  console.log('Creating mock activies');
  // Number of activities to create per resident
  var amount =  25;

  // Number, in days, for the earliest activity date
  var earliestActivityDate = 30;

  // Get list of residents
  var residents = Residents.find().fetch();

  // Get list of activity types
  var activityTypes = ActivityTypes.find().fetch();

  // Get a list of all roles, without admin role
  var roles = Meteor.roles.find({name: { $ne: 'admin' } }).fetch();

  // Select a random facilitator role (ID)
  var roleId = function () {
    console.log(roles[Math.floor(Math.random() * roles.length)].name);
    return roles[Math.floor(Math.random() * roles.length)]._id;
  }

  // Get a random activity type (ID)
  var activityType = function() {
    return activityTypes[Math.floor(Math.random() * activityTypes.length)]._id;
  };

  // Get random activity date
  var date = function() {
    var endDate = new Date();
    var startDate = new Date();
    startDate.setDate(endDate.getDate() - earliestActivityDate);
    return randomDate(endDate, startDate);
  };

  // Set random activity duration
  var duration = function() {
    return Math.floor((Math.random() * 60) + 1);
  };

  for (var i = 0; i < residents.length; i++) {
    var residentId = residents[i]._id;
    var args = {'activityTypeId': activityType, 'activityDate': date,'facilitatorRoleId': roleId,'duration': duration,'residentIds': [residentId]};
    insert(Activities, args, amount, true);
  }
}

Meteor.methods({
  'createMockData': function() {
    createMockGroups();
    createMockRoles();
    createMockHomes();
    createMockResidents();
    createMockActivityTypes();
    createMockActivities();
  },
  'removeAllData': function() {
    Groups._dropCollection();
    Homes._dropCollection();
    Residents._dropCollection();
    ActivityTypes._dropCollection();
    Activities._dropCollection();
  },
});
