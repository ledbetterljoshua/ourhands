#! /bin/bash

yarn build:server
docker build -t ledbetterjoshua/ourhands:1.0.0 .
docker run --net="host" -it -p 3001:4000 ledbetterjoshua/ourhands:1.0.0