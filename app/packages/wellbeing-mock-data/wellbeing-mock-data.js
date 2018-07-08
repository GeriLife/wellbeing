import moment from 'moment';

//TODO: Change these for actual group names

var groups = ['Onnela', 'Tammela','Puistola'];
var activities = ['Ulkoilu', 'Retki', 'Tapahtuma (esim. konsertti)',
            'Musiikki','Taide', 'Lukeminen'];

var facilitatorRoles = ['Henkiökunta', 'Vapaaehtoinen', 'Perhe', 'Itse'];

/*
Default values used in create mock createMockResidency
  - starting point is a date
  - percent moved out is an integer between 0 and 100
*/
const defaultStartingPoint = moment().subtract(1, 'years').toDate();
const defaultPercentMovedOut = 90;

function randomDate(startDate, endDate) {
  // Get start/end timestamps in unix epoch
  const startTime= startDate.getTime();
  const endTime = endDate.getTime();

  // Get difference between end and start timestamps
  const timeDelta = endTime - startTime;

  // Get a random fraction of the
  // time difference between start and end
  const randomEndTime = Math.random() * timeDelta;

  // Get the actual date string by adding delta to start time (unix epoch)
  const randomDate = startTime + randomEndTime

  // Return a date object from the unix timestamp
  return new Date(randomDate);
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

//Get list of homeIds that do not equal the currentHomeId
function getRandomHomeButExcludeCurrent (currentHomeId) {
  const homeIds = Homes.find({'_id': {$ne : currentHomeId}}).map(function (e) { return e._id; });
  return _.sample(homeIds)
}

/*

  Get random date from the range of today - startingpoint
  @param start = months from today
  creates two dates one of them being today
  and second one being today minus months set in parameters
*/
function getRandomMoveInDate (startDate) {
  const now = new Date();

  moveInDate = randomDate(startDate, now);

  return moveInDate;
}

function createMockGroups () {
  console.log('Creating mock groups');

  for (var i = 0; i < groups.length; i++) {
    var groupName = groups[i];

    Groups.insert({'name': groupName});
  }
}

function createMockRoles() {
  console.log('Creating mock roles');

  for (var i = 0; i < facilitatorRoles.length; i++) {
    var roleName = facilitatorRoles[i];

    Roles.createRole(roleName);
  }
}

function createMockHomes() {
  console.log('Creating mock homes');
  var amount = 3;
  var address = function() {return faker.address.city();};

  for (var i = 0; i < groups.length; i++) {
    var groupName = groups[i];

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


function getRandomHomeButExcludeCurrent(currentHomeId) {
  var homeIds = Homes.find({'_id': {'$ne' : 'currentHomeId'}}).map(function (e) { return e._id; });

  return _.sample(homeIds)
}

  /*
    This function assumes residents are already added.
    then adds residency for every resident
    Depending on the percentMovedOut some residents will have multiple residencies

  */
function createMockResidency(startingPoint = defaultStartingPoint, percentMovedOut = defaultPercentMovedOut) {
  //console.log(startingPoint)
  console.log("Creating Mock Residencies")
  //get all residents
  const residents = Residents.find().fetch();


  /*  this is the number from where residents are moved out. So if the percentMovedout is 0.25
      this index will be at the 75% percent point of the resident list
      when the loop reaches this index it will move the residents randomly either to another home or just move them out completely
  */
  const indexWhereMovedOut = residents.length - Math.round(residents.length * percentMovedOut)
  residents.forEach(function(resident, index) {
    let moveInDate = getRandomMoveInDate(startingPoint);

    console.log(moveInDate);

    var args = { "residentId": resident._id, 'homeId': resident.homeId, 'moveIn': moveInDate }
    if (index >= indexWhereMovedOut) {
      let moveOutDate = randomDate(moveInDate, new Date());
      args['moveOut'] = moveOutDate;
      // some residents moved out permanently and some to another house >0.5 moved out permanently < 0.5 new house
      let MovedOutPermanently = Math.random()
      if (MovedOutPermanently < 0.5) {
        let randomHome = getRandomHomeButExcludeCurrent(resident.homeId);
        //move them into new house day after they left their old one( adding two days since the UTC 0:0:0 time)
        let newMoveInDate = new Date(moveOutDate.getFullYear(), moveOutDate.getMonth(), moveOutDate.getDate() + 2);
        let newArgs = { "residentId": resident._id, 'homeId': randomHome, 'moveIn': newMoveInDate };
        Residencies.insert(newArgs)
      }
    }
  Residencies.insert(args);
  });
}


Meteor.methods({
  'createMockData': function (start, percentMovedOut) {
    createMockGroups();
    createMockRoles();
    createMockHomes();
    createMockResidents();
    createMockActivityTypes();
    createMockActivities();
    createMockResidency(start, percentMovedOut);
  },
  'createMockGroups': function () {
    createMockGroups();
  },
  'createMockRoles': function () {
    createMockRoles();
  },
  'createMockHomes': function () {
    createMockHomes();
    createMockHomes();
  },
  'createMockActivities': function () {
    createMockActivities();
  },
  'createMockResidency': function (start, percentMovedOut) {
    createMockResidency(start, percentMovedOut);
  },
});
