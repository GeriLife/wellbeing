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
dokku mongo:create gerilife-mongo
```

## Create GeriLife app
```
dokku apps:create gerilife-meteor
```

## Link GeriLife to MongoDB
```
dokku mongo:link gerilife-mongo gerilife-meteor
```

## Configure GeriLife with Buildpack
Check the current GeriLife configuration:
```
dokku config:show gerilife-meteor
```

Set Buildpack configuration. Make sure to update your `ROOT_URL`.
```
dokku config:set gerilife-meteor BUILDPACK_URL=https://github.com/AdmitHub/meteor-buildpack-horse.git ROOT_URL=http://123.456.789.000 METEOR_SETTINGS="{\"public\": {}}"
```

Tell Dokku to use the `main` branch for deployment (instead of `master').

```
dokku git:set gerilife-meteor deploy-branch main
```

### Set Dokku port map
In the case where we are hosting the frontend and backend on the same server, the backend should be accessible at a port other than 80 or 443. For example, the backend can be made available on port 5000. By default, Dokku sets up a port mapping to 80, so we will first remove the default mapping.

```
dokku proxy:ports-clear gerilife-meteor
```

Then, we configure Dokku to map the desired port to the container port 5000.

```
dokku proxy:ports-set gerilife-meteor http:5000:5000
```

## Local configuration
Configure your public key on the remote Dokku instance, to allow deploying from local computer. Make sure to replace the server IP in the following command. Replace `<server-address>` with the server domain name or IP.

```
cat ~/.ssh/id_rsa.pub | ssh root@<server-address> sshcommand acl-add dokku deploy
```

## Set up remote Dokku repository
From within your local GeriLife repository, run the following command to set up a Dokku remote. Be sure to use the correct IP address below.

```
git remote add dokku dokku@123.456.789.000:gerilife-meteor
```

### Push changes to remote Dokku repository
```
git push dokku main
```

# References
- [Run a Meteor App with MongoDB on Digital Ocean using Dokku](https://medium.com/@ersel_aker/run-a-meteor-app-with-mongodb-on-digital-ocean-using-dokku-8878745d9540) - Also useful for restoring backup from other mongo instances
