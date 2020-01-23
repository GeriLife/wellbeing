 #!/bin/bash
export MONGO_URL="mongodb://localhost:27019/wellbeing-demo"
mongo wellbeing-demo --port 27019 --eval "db.dropDatabase()"
meteor --port 9000