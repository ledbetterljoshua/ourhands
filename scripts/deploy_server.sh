#! /bin/bash

# yarn build:server
# docker build -t ledbetterjoshua/ourhands:1.0.0 .
# docker run --net="host" -it -p 3001:4000 ledbetterjoshua/ourhands:1.0.0

yarn build:server
docker build -t ledbetterjoshua/ourhands:1.0.0 .
docker push ledbetterjoshua/ourhands:1.0.0
ssh root@167.71.119.40 "docker pull ledbetterjoshua/ourhands:1.0.0 && docker tag ledbetterjoshua/ourhands:1.0.0 dokku/ourhands:latest && dokku tags:deploy ourhands latest"