all:
    git fetch origin master
    git reset --hard FETCH_HEAD
    git clean -df
    export NODE_ENV="dev"
    npm install
    bower install
    grunt build
    export NODE_ENV="production"
    export PORT=9000
    node dist/server/app.js