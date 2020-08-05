# Our Hands.

This is a mono-repo using yarn workspaces and Lerna.

## Backend - server and database

`cd packages/server`
Add a `.env` file with the following items:

```
TS_NODE_FILES=true
USER_SESSION_SECRET=whateverThing
FRONTEND_HOST=http://192.168.99.102:3000
NODE_ENV=development
```

Run `yarn install`

Set up a postgresql database, one for dev and another for testing. These can be configured in `/ormconfig.json`, but to get them running, set up your dev database name to be `ourhands` on port `4321`, and your test database name to be `testing`, also on port `4321`.

Install Redis and run `redis-server` in your terminal.

After this, you should be able to run `yarn test`.

You can also run `yarn start`, and view the graphql playground on `http://192.168.99.102:4000/graphql`

## The landing Page

![landing][landing]

## First Mock-up for the web app view

![app-view1][app-view1]
![app-view2][app-view2]

[landing]: resources/ourhands-landing.png?raw=true "Our Hands Landing"
[app-view1]: resources/ourhands-app-view1.png?raw=true "Our Hands App View"
[app-view2]: resources/ourhands-app-view2.png?raw=true "Our Hands App View"
