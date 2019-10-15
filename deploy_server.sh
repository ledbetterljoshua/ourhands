#! /bin/bash

yarn build:server
heroku container:push --app=peaceful-escarpment-19819 web
heroku container:release --app=peaceful-escarpment-19819 web

# # yarn build:server
# # docker build -t ledbetterjoshua/airbnb_clone:1.0.0 .
# # docker push ledbetterjoshua/airbnb_clone:1.0.0
# ssh root@157.245.248.171 "docker pull ledbetterjoshua/airbnb_clone:1.0.0 && docker tag ledbetterjoshua/airbnb_clone:1.0.0 dokku/airbnb_clone:latest && dokku tags:deploy airbnb_clone latest"