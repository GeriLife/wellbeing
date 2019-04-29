# Contributing
To get started with this project, do the following:

1. install Meteor from https://meteor.com
2. clone the project
3. cd into `project_folder/app`
4. run
> "npm install"

or

> "meteor npm install"
5. run `meteor`

Once the project is running:
1. open the file `project_folder/app/lib/accounts.js` and 
2. change `forbidClientAccountCreation: true`, to `forbidClientAccountCreation: false`,
3. refresh the app in the browser 
4. register a testing user
5. open another terminal,
6. change into the `project_folder/app` directory 
7. run the command "meteor shell"

Once in the Meteor shell, run this command:
> "Meteor.call("createMockData");"
