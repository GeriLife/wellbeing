 #!/bin/bash
export MONGO_URL="mongodb://localhost:27019/wellbeing-demo"
export GERILIFE_DEMO=true
mongo wellbeing-demo --port 27019 --eval "db.dropDatabase()"
meteor --port 9000