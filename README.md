# GeriLife wellbeing
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)
Welbeing activity log and visualization tool.

# Features
## Activities
### Record activities
![Add activity form](https://rawgit.com/GeriLife/wellbeing/develop/docs/screenshots/AddActivity.png)

## Emotions
![Emotions screenshot](https://rawgit.com/GeriLife/wellbeing/develop/docs/screenshots/Emotions.png)

### Record emotion for individual
![Add emotion screenshot](https://rawgit.com/GeriLife/wellbeing/develop/docs/screenshots/Emotions-addEmotion.png)

## Homes
![Single home screenshot](https://rawgit.com/GeriLife/wellbeing/develop/docs/screenshots/Home-withMockData.png)

### Home residents (with activity level)
![Home residents with activity level](https://rawgit.com/GeriLife/wellbeing/develop/docs/screenshots/Home-withMockData-residentsList.png)

### Home activity counts by resident and type (with filtering)
![Home activity counts by resident and type screenshot](https://rawgit.com/GeriLife/wellbeing/develop/docs/screenshots/Home-withMockData-activityCountsByResidentAndType.png)

![Home activity counts by resident and type with filtering](https://rawgit.com/GeriLife/wellbeing/develop/docs/screenshots/Home-withMockData-activityCountsByResidentAndType-filtered.png)

### Home activity trends
![Home residents and activity trends](https://rawgit.com/GeriLife/wellbeing/develop/docs/screenshots/Home-withMockData-activityLevelTrends.png)

## Home Groups
![Multiple home resident activity level](https://rawgit.com/GeriLife/wellbeing/develop/docs/screenshots/Homes-withMockData.png)

### Single group of homes (with percentage of residents by activity level)
![Single home group with percentage of residents by activity level](https://rawgit.com/GeriLife/wellbeing/develop/docs/screenshots/Homes-withMockData-singleGroup.png)

## Residents
### Resident profile
![Single resident page](https://raw.githubusercontent.com/GeriLife/wellbeing/develop/docs/screenshots/Resident-withMockData.png)

### Resident activity trend
![Activity graph with trend line](https://raw.githubusercontent.com/GeriLife/wellbeing/develop/docs/screenshots/Resident-withMockData-activityTrend.png)

### Resident activity calendar heatmap
![Activity heatmap](https://raw.githubusercontent.com/GeriLife/wellbeing/develop/docs/screenshots/Resident-withMockData-activityCalendarHeatmap.png)

### Resident activity type counts
![Resident activity type counts](https://rawgit.com/GeriLife/wellbeing/develop/docs/screenshots/Resident-withMockData-activityTypeCounts.png)

### Resident activity facilitator role counts
![Resident activity facilitator role counts](https://raw.githubusercontent.com/GeriLife/wellbeing/develop/docs/screenshots/Resident-withMockData-activityFacilitatorRoleCounts.png)

### Resident activity table
![Resident activity table](https://cdn.rawgit.com/GeriLife/wellbeing/master/docs/screenshots/activity-table.png)


## System settings
![Manage settings](https://cdn.rawgit.com/GeriLife/wellbeing/master/docs/screenshots/settings.png)

# User Stories
```
As a volunteer,
I want to know what activities residents enjoy
so that I can spend quality time with the residents
```

```
As a family member
I want to know that my relative is active
so that I know they are living an enjoyable life
```


#Integration with vue

## Upgrade meteor version
rm -rf nodemodules and package lock
npm i

meteor update
meteor update --all-packages

 ~/.meteor/packages/meteor-tool/1.8.1/mt-os.linux.x86_64/dev_bundle/mongodb/bin/mongod  --dbpath .meteor/local/db --repair

if necessary meteor reset(
WARNING!!! 
meteor reset will delete the mock database
)

 meteor

# Running tests
## Command to run
`npm run test`

This command will start a server on port 8000. It is better to run `npm i` if the tests are run for the first time.
Server code must be tested on server using `Meteor.isServer` flag. Code running in the `if` constructs of `Meteor.isServer` will show results on the console. For the others, `Meteor.isClient` must be used and they can be evaluated in the browser on `http://localhost:8000`.

## Coverage 
Coverage can be found at `http://localhost:8000/coverage`. This will show the coverage for server files. To get the coverage for client,
1. Open the developer-tools console at `http://localhost:8000` in your preferred browser.
2. Run this command `Meteor.sendCoverage(function(stats,nbErr) {console.log(stats,nbErr);});`
3. Now if `http://localhost:8000/coverage` is reloaded the coverage for client is visible.

Please note that the server for tests is started in watch mode so that client tests can be evaluated on the browser. These tests take 2 runs to get the correct results due to some issues with the underlying babel nyc module. Here's what can be done:
1. start the server.
2. Once the process logs this messages `listening on localhost:8000`, change any file and save it.
3. This triggers the watch and tests are rerun correctly.

## Steps to start the demo app
1. Make sh file executable. Run `sudo chmod +x start-demo.sh`
2. Make current user owner of meteor file by running `sudo chown -Rh shailee .meteor/local`
3. The start-demo.sh file starts the app in demo mode (Make sure to not start it on the same server as the production server or else the mongo database will be overwritten).
4. To start the demo as a cron job run 
  1. `sudo crontab -e`
  2. This will open a cronjob editor. On the last line of the editor add `0 0 * * * cd /path/to/sh-file && /bin/sh start-demo.sh >> cron.log 2>&1`.
  3. Save and exit. This will restart and reset the app everyday at midnight.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/shailee-m"><img src="https://avatars0.githubusercontent.com/u/10625985?v=4" width="100px;" alt="Shailee Mehta"/><br /><sub><b>Shailee Mehta</b></sub></a><br /><a href="https://github.com/GeriLife/wellbeing/commits?author=shailee-m" title="Code">💻</a></td><td align="center"><a href="https://github.com/PayalChoksey17"><img src="https://avatars0.githubusercontent.com/u/41734649?v=4" width="100px;" alt="PayalChoksey17"/><br /><sub><b>PayalChoksey17</b></sub></a><br /><a href="https://github.com/GeriLife/wellbeing/issues?q=author%3APayalChoksey17" title="Bug reports">🐛</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!