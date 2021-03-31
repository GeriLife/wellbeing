# Configure new server with SSH key
Each key can be added to a new server.

In the *example* below, the username is `root` and the server IP is `123.456.789.000`.

You will need to generate key wth a proper passphrase: 
```
ssh-keygen -t rsa -b 4096 -C "user@email.com"
```

You can now login using 
```
ssh root@123.456.789.000
```

## Logging in There are multiple ssh keys defined on your system
```
ssh -i ~/.ssh/id_rsa_hetz.pub -o IdentitiesOnly=yes root@95.217.237.33
```

# Install dokku on server
https://dokku.com/docs/getting-started/installation/
APP url: http://<app-name>.gerilife

# Deploy GeriLife 
## Enable MongoDB
```
sudo dokku plugin:install https://github.com/dokku/dokku-mongo.git mongo
```

```
dokku mongo:create mongod-gerilife
```

## Create GeriLife app
```
dokku apps:create meteor-gerilife
```

## Link GeriLife to MongoDB
```
dokku mongo:link mongod-gerilife meteor-gerilife
```

## Configure GeriLife with Buildpack
Check the current GeriLife configuration:
```
dokku config:show meteor-gerilife
```

Set Buildpack configuration. Make sure to update your `ROOT_URL`.
```
dokku config:set meteor-gerilife BUILDPACK_URL=https://github.com/AdmitHub/meteor-buildpack-horse.git ROOT_URL=http://123.456.789.000 METEOR_SETTINGS="{\"public\": {}}"
```

## Local configuration
Configure your public key on the remote Dokku instance, to allow deploying from local computer. Make sure to replace the server IP in the following command.

```
cat ~/.ssh/id_rsa.pub | ssh root@123.456.789.000 sshcommand acl-add dokku deploy
```

## Set up remote Dokku repository
From within your local GeriLife repository, run the following command to set up a Dokku remote.

```
git remote add dokku dokku@95.217.237.33:meteor-gerilife
```

### Push changes to remote Dokku repository
```
git push dokku master
```

# References
- [Run a Meteor App with MongoDB on Digital Ocean using Dokku](https://medium.com/@ersel_aker/run-a-meteor-app-with-mongodb-on-digital-ocean-using-dokku-8878745d9540) - Also useful for restoring backup from other mongo instances
