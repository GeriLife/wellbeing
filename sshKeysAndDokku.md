#Steps to generate and use right ssh keys in Hetzner
1. each key can be used with only new server
2. user name is root.
3. Commands:
 a. Generate key wth a proper passphrase: ssh-keygen -t rsa -b 4096 -C "mehtashailee21@gmail.com"
 b. Login using ssh -i ~/.ssh/id_rsa_hetz.pub -o IdentitiesOnly=yes -vvv root@95.217.237.33


#Install dokku:
https://computingforgeeks.com/how-to-deploy-dokku-paas-on-ubuntu/
APP url: http://<app-name>.gerilife

#Deploy Dokku 
## Steps to perform on Hetzner:
sudo dokku plugin:install https://github.com/dokku/dokku-mongo.git mongo
dokku mongo:create mongod-gerilife


dokku apps:create meteor-gerilife
dokku mongo:link mongod-gerilife meteor-gerilife

dokku config meteor-gerilife

dokku config:set meteor-gerilife BUILDPACK_URL=https://github.com/AdmitHub/meteor-buildpack-horse.git ROOT_URL=http://95.217.237.33 METEOR_SETTINGS="{\"public\": {}}"

##Steps to perform locally
cat ~/.ssh/id_rsa.pub | ssh root@95.217.237.33 sshcommand acl-add dokku deploy
git remote add dokku dokku@95.217.237.33:meteor-gerilife
git push dokku master


https://medium.com/@ersel_aker/run-a-meteor-app-with-mongodb-on-digital-ocean-using-dokku-8878745d9540#:~:text=Deploying%20a%20Meteor%20app%20on%20Dokku&text=Dokku%20will%20switch%20over%20the,public%20key%20to%20authorized_keys%20list.&text=Running%20above%20command%20will%20take,ssh%2Fid_rsa. is the reference article. Also useful for restoring backup from other mongo instances

###Logging in There are multiple ssh keys defined on your system
ssh -i ~/.ssh/id_rsa_hetz.pub -o IdentitiesOnly=yes root@95.217.237.33