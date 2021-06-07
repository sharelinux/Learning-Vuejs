#!/bin/bash

trap "StopService" SIGHUP SIGINT SIGTERM


function start_backend_srv() {
    if [[ -d "$(pwd)/venv" ]];then
        echo 'start backend service'
        source venv/bin/activate

        python app.py &>/dev/null &
    else
        echo 'no venv'
    fi

}

function start_vue_srv() {
    echo 'start front-end service'
    cd my-project
    npm run dev
}

function StopService() {
    echo 'stop backend service...'

    pkill -f app.py
    # pgrep -f name
    # pkill -f name
    # pidof name

    echo 'stop front-end service...'
    pkill -f 'webpack-dev-server'

    echo 'Shop Done'
}

start_backend_srv
start_vue_srv
