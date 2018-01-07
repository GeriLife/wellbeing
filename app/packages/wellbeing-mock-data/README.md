# wellbeing-mock-data
Meteor package for creating mock data for https://github.com/GeriLife/wellbeing
Usage:
```
Meteor.call("createMockData", 6, 0.25)
```
Where 6 is the months from today that we start adding the residencies (here its 6 months away) and 0.25 is the amount of residents that we move out of residence.
