 #!/bin/bash

 #kill exisiting process
 kill -9 $(ps axf | grep meteor | grep -v grep | awk '{print $1}')

#start the new one
export GERILIFE_DEMO=true
/usr/local/bin/meteor --allow-superuser reset

/usr/local/bin/meteor --allow-superuser --port 9000

# Steps to start cron job
## Make sh file executable
## sudo chmod +x start-demo.sh
## Make current user owner of meteor file
## sudo chown -Rh shailee .meteor/local
# Run cron job
## 0 0 * * * cd /path/to/sh-file && /bin/sh start-demo.sh >> cron.log 2>&1