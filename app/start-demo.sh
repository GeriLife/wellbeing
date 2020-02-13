 #!/bin/bash

 #kill exisiting process
 kill -9 $(ps axf | grep meteor | grep -v grep | awk '{print $1}')

#start the new one
export GERILIFE_DEMO=true
/usr/local/bin/meteor --allow-superuser reset

/usr/local/bin/meteor --allow-superuser --port 9000